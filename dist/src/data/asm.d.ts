import type { Product, Shipment } from "../types";
/**
 * The full 112 Market catalogue.
 *
 * This is the single source of truth for the storefront: every count, filter
 * option and price shown in the UI is derived from this array. Swap this
 * module for an API-backed repository and the rest of the app keeps working.
 */
export declare const PRODUCTS: Product[];
/** Live container shipments currently moving from the UK to Nigeria. */
export declare const SHIPMENTS: Shipment[];
/** Short label used in the announcement bar. */
export declare const NEXT_CONTAINER_ETA: {
    containerNumber: string;
    etaShort: string;
    estimatedArrival: string;
};
