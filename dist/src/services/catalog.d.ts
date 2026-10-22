/** Catalogue utility functions for product filtering, sorting and shipment data. */
import type { FilterState, Product, SortKey } from "../types";
export declare const PAGE_SIZE = 12;
/** Dispatch location bucket for a product. */
export declare const locationOf: (product: Product) => "depot" | "sea";
/** True when the product matches every active filter. */
export declare const matchesFilters: (product: Product, filters: FilterState) => boolean;
/** Filter products based on the provided FilterState */
export declare const applyFilters: (products: Product[], filters: FilterState) => Product[];
/** Sort products by the requested catalogue sort key. */
export declare const sortProducts: (products: Product[], sort: SortKey) => Product[];
export interface Page<T> {
    items: T[];
    page: number;
    pageCount: number;
    total: number;
    hasPrevious: boolean;
    hasNext: boolean;
}
/** Slice a list into a page, clamping the requested page into range. */
export declare const paginate: <T>(items: T[], page: number, pageSize?: number) => Page<T>;
/** Get shipments data for announcement bar */
export declare const getShipments: () => import("../types").Shipment[];
/** The catalogue products, exposed for the repository layer. */
export declare const getCatalogue: () => Product[];
