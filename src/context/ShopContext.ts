import { createContext, useContext, ReactContext, useState, useEffect } from "react"
import type { Product, CartItem, ConditionGrade, FulfillmentType } from "../types"

// ... rest of the existing context code

// Cart state
interface CartItem {
  productId: string
  quantity: number
  fulfillmentType: FulfillmentType
  variantId?: string
  variantSku?: string
  variantName?: string
  unitPrice?: number
}

interface CartState {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, variantId?: string) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

// Initialize cart from localStorage if available
const storedCart = typeof window !== "undefined" 
  ? JSON.parse(localStorage.getItem("cart") || "[]") 
  : []

const initialCart: CartItem[] = storedCart.map((item: any) => ({
  productId: item.productId,
  quantity: item.quantity || 1,
  fulfillmentType: item.fulfillmentType || "in_stock",
  variantId: item.variantId,
  variantSku: item.variantSku,
  variantName: item.variantName,
  unitPrice: item.unitPrice,
}))

interface CartContextValue {
  cart: CartItem[]
  addItem: (product: Product, quantity?: number, variantId?: string) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  cartCount: number
}

const CartContext = createContext<CartContextValue>({
  cart: initialCart,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  get cartCount() {
    return this.cart.reduce((total, item) => total + (item.quantity || 0), 0)
  },
}

export const useCartContext = () => useContext(CartContext)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(initialCart)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addItem = (product: Product, quantity = 1, variantId?: string) => {
    const existingIndex = cart.findIndex(
      (item) => item.productId === product.id && item.variantId === variantId
    )

    if (existingIndex >= 0) {
      const updated = cart.map((item, idx) => {
        if (idx === existingIndex) {
          return { ...item, quantity: (item.quantity || 0) + quantity }
        }
        return item
      })
      setCart(updated)
    } else {
      const newItem: CartItem = {
        productId: product.id,
        quantity,
        fulfillmentType: product.fulfillmentType,
        variantId,
        variantSku: product.variants?.[0]?.sku,
        variantName: product.variants?.[0]?.name,
        unitPrice: product.price,
      }
      setCart([...cart, newItem])
    }
  }

  const removeItem = (productId: string) => {
    setCart(cart.filter((item) => item.productId !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setCart(
      cart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem("cart")
  }

  return (
    <CartContext.Provider
      value={
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        get cartCount() {
          return cart.reduce((total, item) => total + (item.quantity || 0), 0)
        }
      }
    >
      {children}
    </CartContext.Provider>
  )
}
