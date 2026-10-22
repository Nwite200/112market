import { type ReactNode } from "react";
import type { CartItem, FilterState, Product, Shipment } from "../types";
export interface ProductContextValue {
    products: Product[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}
export declare const useProductContext: () => ProductContextValue;
export declare const ProductProvider: ({ children }: {
    children: ReactNode;
}) => import("react").JSX.Element;
export declare const DEFAULT_FILTERS: FilterState;
export interface FilterContextValue {
    filters: FilterState;
    setFilters: (patch: Partial<FilterState>) => void;
    replaceFilters: (filters: FilterState) => void;
    resetFilters: () => void;
}
export declare const useFilterContext: () => FilterContextValue;
export declare const FilterProvider: ({ children }: {
    children: ReactNode;
}) => import("react").JSX.Element;
export interface ShippingContextValue {
    shipments: Shipment[];
    loading: boolean;
    error: string | null;
}
export declare const useShippingContext: () => ShippingContextValue;
export declare const ShippingProvider: ({ children }: {
    children: ReactNode;
}) => import("react").JSX.Element;
export interface CartContextValue {
    cart: CartItem[];
    addItem: (product: Product, quantity?: number, variantId?: string) => void;
    removeItem: (productId: string, variantId?: string) => void;
    updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
}
export declare const useCartContext: () => CartContextValue;
export declare const CartProvider: ({ children }: {
    children: ReactNode;
}) => import("react").JSX.Element;
export declare const ShopProvider: ({ children }: {
    children: ReactNode;
}) => import("react").JSX.Element;
