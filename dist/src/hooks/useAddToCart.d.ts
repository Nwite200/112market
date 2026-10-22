import type { Product } from "../types";
/**
 * Add-to-cart behaviour shared by product cards and the product detail page.
 *
 * The hook reports the last added line so the UI can confirm the action
 * without navigating away from the current page.
 */
export declare function useAddToCart(): {
    addToCart: (product: Product, quantity?: number, variantId?: string) => void;
    isAdded: (product: Product, variantId?: string) => boolean;
    lastAdded: string | null;
    cart: import("../types").CartItem[];
    removeItem: (productId: string, variantId?: string) => void;
    updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
    clearCart: () => void;
};
export default useAddToCart;
