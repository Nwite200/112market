import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { CartItem, FilterState, Product, Shipment } from "../types"
import { productRepository } from "../services/catalogImpl"

/* ------------------------------------------------------------------ *
 * Products
 * ------------------------------------------------------------------ */

export interface ProductContextValue {
  products: Product[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

const ProductContext = createContext<ProductContextValue>({
  products: [],
  loading: false,
  error: null,
  refresh: async () => {},
})

export const useProductContext = () => useContext(ProductContext)

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await productRepository.listProducts()
      setProducts(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load the catalogue.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const value = useMemo<ProductContextValue>(
    () => ({ products, loading, error, refresh }),
    [products, loading, error, refresh]
  )

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

/* ------------------------------------------------------------------ *
 * Filters
 * ------------------------------------------------------------------ */

export const DEFAULT_FILTERS: FilterState = {
  query: "",
  category: "all",
  grades: [],
  locations: [],
  brands: [],
  specs: [],
  coverages: [],
  minPrice: 0,
  maxPrice: 0,
  tab: "all",
}

export interface FilterContextValue {
  filters: FilterState
  setFilters: (patch: Partial<FilterState>) => void
  replaceFilters: (filters: FilterState) => void
  resetFilters: () => void
}

const FilterContext = createContext<FilterContextValue>({
  filters: DEFAULT_FILTERS,
  setFilters: () => {},
  replaceFilters: () => {},
  resetFilters: () => {},
})

export const useFilterContext = () => useContext(FilterContext)

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFiltersState] = useState<FilterState>(DEFAULT_FILTERS)

  const setFilters = useCallback((patch: Partial<FilterState>) => {
    setFiltersState((current) => ({ ...current, ...patch }))
  }, [])

  const replaceFilters = useCallback((next: FilterState) => {
    setFiltersState(next)
  }, [])

  const resetFilters = useCallback(() => setFiltersState(DEFAULT_FILTERS), [])

  const value = useMemo<FilterContextValue>(
    () => ({ filters, setFilters, replaceFilters, resetFilters }),
    [filters, setFilters, replaceFilters, resetFilters]
  )

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

/* ------------------------------------------------------------------ *
 * Shipments
 * ------------------------------------------------------------------ */

export interface ShippingContextValue {
  shipments: Shipment[]
  loading: boolean
  error: string | null
}

const ShippingContext = createContext<ShippingContextValue>({
  shipments: [],
  loading: false,
  error: null,
})

export const useShippingContext = () => useContext(ShippingContext)

export const ShippingProvider = ({ children }: { children: ReactNode }) => {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    productRepository
      .listShipments()
      .then((result) => {
        if (active) setShipments(result)
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : "Unable to load shipments.")
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const value = useMemo<ShippingContextValue>(
    () => ({ shipments, loading, error }),
    [shipments, loading, error]
  )

  return <ShippingContext.Provider value={value}>{children}</ShippingContext.Provider>
}

/* ------------------------------------------------------------------ *
 * Cart
 * ------------------------------------------------------------------ */

export interface CartContextValue {
  cart: CartItem[]
  addItem: (product: Product, quantity?: number, variantId?: string) => void
  removeItem: (productId: string, variantId?: string) => void
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number
}

const CART_STORAGE_KEY = "112-market-cart"

const emptyCart: CartItem[] = []

/** Read the persisted cart, tolerating corrupt or missing storage. */
const readStoredCart = (): CartItem[] => {
  if (typeof window === "undefined") return emptyCart
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return emptyCart
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return emptyCart
    return parsed as CartItem[]
  } catch {
    return emptyCart
  }
}

const CartContext = createContext<CartContextValue>({
  cart: emptyCart,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartCount: 0,
  cartTotal: 0,
})

export const useCartContext = () => useContext(CartContext)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(readStoredCart)

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // Storage unavailable (private mode / quota) — the cart still works in memory.
    }
  }, [cart])

  const addItem = useCallback((product: Product, quantity = 1, variantId?: string) => {
    const variant = variantId
      ? product.variants?.find((v) => v.id === variantId)
      : undefined

    setCart((current) => {
      const index = current.findIndex(
        (item) => item.productId === product.id && item.variantId === variantId
      )

      if (index >= 0) {
        const existing = current[index]
        const max = product.stockQuantity || existing.maxQuantity || 99
        const nextQuantity = Math.min((existing.quantity || 0) + quantity, max)
        const updated = [...current]
        updated[index] = { ...existing, quantity: nextQuantity }
        return updated
      }

      const newItem: CartItem = {
        productId: product.id,
        quantity,
        fulfillmentType: variant?.fulfillmentType ?? product.fulfillmentType,
        variantId,
        variantSku: variant?.sku,
        variantName: variant?.name,
        unitPrice: variant?.price ?? product.price,
        name: product.name,
        slug: product.slug,
        image: variant?.images?.[0] ?? product.images?.[0],
        conditionGrade: product.conditionGrade,
        maxQuantity: product.stockQuantity || undefined,
      }
      return [...current, newItem]
    })
  }, [])

  const removeItem = useCallback((productId: string, variantId?: string) => {
    setCart((current) =>
      current.filter(
        (item) => !(item.productId === productId && (variantId === undefined || item.variantId === variantId))
      )
    )
  }, [])

  const updateQuantity = useCallback(
    (productId: string, quantity: number, variantId?: string) => {
      if (quantity <= 0) {
        removeItem(productId, variantId)
        return
      }
      setCart((current) =>
        current.map((item) => {
          if (
            !(item.productId === productId &&
              (variantId === undefined || item.variantId === variantId))
          ) {
            return item
          }
          const max = item.maxQuantity ?? 99
          return { ...item, quantity: Math.min(Math.max(quantity, 1), max) }
        })
      )
    },
    [removeItem]
  )

  const clearCart = useCallback(() => {
    setCart(emptyCart)
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(CART_STORAGE_KEY)
      } catch {
        // Ignore storage failures.
      }
    }
  }, [])

  const value = useMemo<CartContextValue>(() => {
    const cartCount = cart.reduce((total, item) => total + (item.quantity || 0), 0)
    const cartTotal = cart.reduce(
      (total, item) => total + (item.unitPrice || 0) * (item.quantity || 0),
      0
    )
    return { cart, addItem, removeItem, updateQuantity, clearCart, cartCount, cartTotal }
  }, [cart, addItem, removeItem, updateQuantity, clearCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/* ------------------------------------------------------------------ *
 * Composition
 * ------------------------------------------------------------------ */

export const ShopProvider = ({ children }: { children: ReactNode }) => (
  <CartProvider>
    <FilterProvider>
      <ShippingProvider>
        <ProductProvider>{children}</ProductProvider>
      </ShippingProvider>
    </FilterProvider>
  </CartProvider>
)
