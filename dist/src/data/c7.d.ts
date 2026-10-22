import type { Product } from "../types";
export declare const img: (id: string) => string;
/** Product P25 - Used furniture item */
export declare const P25: Product;
/** Demo notice */
export declare const DEMO_NOTICE = "Demonstration inventory \u2014 connect Supabase or your backend to serve live stock for 112 Market UK-to-Nigeria fairly used household items.";
/** Categories */
export declare const CATEGORIES: {
    slug: string;
    label: string;
    count: number;
}[];
/** Brands */
export declare const BRANDS: string[];
/** Specification options */
export declare const SPEC_OPTIONS: {
    id: string;
    label: string;
}[];
/** Coverage options */
export declare const COVERAGE_OPTIONS: {
    id: string;
    label: string;
}[];
