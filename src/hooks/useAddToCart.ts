import { useCallback, useEffect, useRef, useState } from "react"
import type { Product } from "../types"
import { useCartContext } from "../context/ShopContext"

/**
 * Add-to-cart behaviour shared by product cards and the product detail page.
 *
 * The hook reports the last added line so the UI can confirm the action
 * without navigating away from the current page.
 */
export function useAddToCart() {
  const { addItem, removeItem, updateQuantity, clearCart, cart } = useCartContext()
  const [lastAdded, setLastAdded] = useState<string | null>(null)
  const timer = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
    },
    []
  )

  const addToCart = useCallback(
    (product: Product, quantity = 1, variantId?: string) => {
      addItem(product, quantity, variantId)
      const key = `${product.id}:${variantId ?? ""}`
      setLastAdded(key)
      if (timer.current !== null) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setLastAdded(null), 2200)
    },
    [addItem]
  )

  /** True when the given product/variant is the most recently added line. */
  const isAdded = useCallback(
    (product: Product, variantId?: string) =>
      lastAdded === `${product.id}:${variantId ?? ""}`,
    [lastAdded]
  )

  return { addToCart, isAdded, lastAdded, cart, removeItem, updateQuantity, clearCart }
}

export default useAddToCart
