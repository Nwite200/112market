import { useCallback, useEffect, useRef, useState } from "react";
import { useCartContext } from "../context/ShopContext";
/**
 * Add-to-cart behaviour shared by product cards and the product detail page.
 *
 * The hook reports the last added line so the UI can confirm the action
 * without navigating away from the current page.
 */
export function useAddToCart() {
    const { addItem, removeItem, updateQuantity, clearCart, cart } = useCartContext();
    const [lastAdded, setLastAdded] = useState(null);
    const timer = useRef(null);
    useEffect(() => () => {
        if (timer.current !== null)
            window.clearTimeout(timer.current);
    }, []);
    const addToCart = useCallback((product, quantity = 1, variantId) => {
        addItem(product, quantity, variantId);
        const key = `${product.id}:${variantId ?? ""}`;
        setLastAdded(key);
        if (timer.current !== null)
            window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setLastAdded(null), 2200);
    }, [addItem]);
    /** True when the given product/variant is the most recently added line. */
    const isAdded = useCallback((product, variantId) => lastAdded === `${product.id}:${variantId ?? ""}`, [lastAdded]);
    return { addToCart, isAdded, lastAdded, cart, removeItem, updateQuantity, clearCart };
}
export default useAddToCart;
