import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, } from "react";
import { productRepository } from "../services/catalogImpl";
const ProductContext = createContext({
    products: [],
    loading: false,
    error: null,
    refresh: async () => { },
});
export const useProductContext = () => useContext(ProductContext);
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const refresh = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await productRepository.listProducts();
            setProducts(result);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Unable to load the catalogue.");
        }
        finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        void refresh();
    }, [refresh]);
    const value = useMemo(() => ({ products, loading, error, refresh }), [products, loading, error, refresh]);
    return _jsx(ProductContext.Provider, { value: value, children: children });
};
/* ------------------------------------------------------------------ *
 * Filters
 * ------------------------------------------------------------------ */
export const DEFAULT_FILTERS = {
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
};
const FilterContext = createContext({
    filters: DEFAULT_FILTERS,
    setFilters: () => { },
    replaceFilters: () => { },
    resetFilters: () => { },
});
export const useFilterContext = () => useContext(FilterContext);
export const FilterProvider = ({ children }) => {
    const [filters, setFiltersState] = useState(DEFAULT_FILTERS);
    const setFilters = useCallback((patch) => {
        setFiltersState((current) => ({ ...current, ...patch }));
    }, []);
    const replaceFilters = useCallback((next) => {
        setFiltersState(next);
    }, []);
    const resetFilters = useCallback(() => setFiltersState(DEFAULT_FILTERS), []);
    const value = useMemo(() => ({ filters, setFilters, replaceFilters, resetFilters }), [filters, setFilters, replaceFilters, resetFilters]);
    return _jsx(FilterContext.Provider, { value: value, children: children });
};
const ShippingContext = createContext({
    shipments: [],
    loading: false,
    error: null,
});
export const useShippingContext = () => useContext(ShippingContext);
export const ShippingProvider = ({ children }) => {
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        let active = true;
        productRepository
            .listShipments()
            .then((result) => {
            if (active)
                setShipments(result);
        })
            .catch((err) => {
            if (active)
                setError(err instanceof Error ? err.message : "Unable to load shipments.");
        })
            .finally(() => {
            if (active)
                setLoading(false);
        });
        return () => {
            active = false;
        };
    }, []);
    const value = useMemo(() => ({ shipments, loading, error }), [shipments, loading, error]);
    return _jsx(ShippingContext.Provider, { value: value, children: children });
};
const CART_STORAGE_KEY = "112-market-cart";
const emptyCart = [];
/** Read the persisted cart, tolerating corrupt or missing storage. */
const readStoredCart = () => {
    if (typeof window === "undefined")
        return emptyCart;
    try {
        const raw = window.localStorage.getItem(CART_STORAGE_KEY);
        if (!raw)
            return emptyCart;
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed))
            return emptyCart;
        return parsed;
    }
    catch {
        return emptyCart;
    }
};
const CartContext = createContext({
    cart: emptyCart,
    addItem: () => { },
    removeItem: () => { },
    updateQuantity: () => { },
    clearCart: () => { },
    cartCount: 0,
    cartTotal: 0,
});
export const useCartContext = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(readStoredCart);
    useEffect(() => {
        if (typeof window === "undefined")
            return;
        try {
            window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        }
        catch {
            // Storage unavailable (private mode / quota) — the cart still works in memory.
        }
    }, [cart]);
    const addItem = useCallback((product, quantity = 1, variantId) => {
        const variant = variantId
            ? product.variants?.find((v) => v.id === variantId)
            : undefined;
        setCart((current) => {
            const index = current.findIndex((item) => item.productId === product.id && item.variantId === variantId);
            if (index >= 0) {
                const existing = current[index];
                const max = product.stockQuantity || existing.maxQuantity || 99;
                const nextQuantity = Math.min((existing.quantity || 0) + quantity, max);
                const updated = [...current];
                updated[index] = { ...existing, quantity: nextQuantity };
                return updated;
            }
            const newItem = {
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
            };
            return [...current, newItem];
        });
    }, []);
    const removeItem = useCallback((productId, variantId) => {
        setCart((current) => current.filter((item) => !(item.productId === productId && (variantId === undefined || item.variantId === variantId))));
    }, []);
    const updateQuantity = useCallback((productId, quantity, variantId) => {
        if (quantity <= 0) {
            removeItem(productId, variantId);
            return;
        }
        setCart((current) => current.map((item) => {
            if (!(item.productId === productId &&
                (variantId === undefined || item.variantId === variantId))) {
                return item;
            }
            const max = item.maxQuantity ?? 99;
            return { ...item, quantity: Math.min(Math.max(quantity, 1), max) };
        }));
    }, [removeItem]);
    const clearCart = useCallback(() => {
        setCart(emptyCart);
        if (typeof window !== "undefined") {
            try {
                window.localStorage.removeItem(CART_STORAGE_KEY);
            }
            catch {
                // Ignore storage failures.
            }
        }
    }, []);
    const value = useMemo(() => {
        const cartCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);
        const cartTotal = cart.reduce((total, item) => total + (item.unitPrice || 0) * (item.quantity || 0), 0);
        return { cart, addItem, removeItem, updateQuantity, clearCart, cartCount, cartTotal };
    }, [cart, addItem, removeItem, updateQuantity, clearCart]);
    return _jsx(CartContext.Provider, { value: value, children: children });
};
/* ------------------------------------------------------------------ *
 * Composition
 * ------------------------------------------------------------------ */
export const ShopProvider = ({ children }) => (_jsx(CartProvider, { children: _jsx(FilterProvider, { children: _jsx(ShippingProvider, { children: _jsx(ProductProvider, { children: children }) }) }) }));
