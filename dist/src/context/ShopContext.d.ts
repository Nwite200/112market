import { ReactContext } from "react";
import type { Product } from "../types";
interface ProductContextState {
    products: Product[];
    loading: boolean;
    error: string | null;
    loadProducts: (filters?: any) => Promise<void>;
    refreshProducts: () => Promise<void>;
}
interface FilterContextState {
    filters: FilterState;
    setFilters: (updates: Partial<FilterState>) => void;
    resetFilters: () => void;
}
interface ShippingContextState {
    shipments: Shipment[];
    loading: boolean;
    error: string | null;
    refreshShipments: () => Promise<void>;
}
declare const ProductContext: ReactContext<ProductContextState>;
declare const FilterContext: ReactContext<FilterContextState>;
declare const ShippingContext: ReactContext<ShippingContextState>;
export declare const ProductProvider: ({ children }: {
    children: React.ReactNode;
}) => ProductContext.Provider;
export declare const FilterProvider: ({ children }: {
    children: React.ReactNode;
}) => FilterContext.Provider;
export declare const ShippingProvider: ({ children }: {
    children: React.ReactNode;
}) => ShippingContext.Provider;
export declare const useProductContext: () => ProductContextState;
export declare const useFilterContext: () => FilterContextState;
export declare const useShippingContext: () => ShippingContextState;
export { ProductContext, FilterContext, ShippingContext };
