/** Presentation helpers shared across the storefront. */
import type { Category, FilterOption, Product } from "../types";
import { GRADE_LABEL, GRADE_SHORT } from "../types";
export { GRADE_LABEL, GRADE_SHORT };
/**
 * Format an amount in the catalogue currency.
 * All 112 Market pricing is stored in NGN and rendered as Nigerian Naira.
 */
export declare const formatPrice: (value: number, currency?: string) => string;
/** Percentage saved against the original price, when one is recorded. */
export declare const getDiscountPercent: (product: Product) => number | null;
export type AvailabilityTone = "in-stock" | "low-stock" | "out-of-stock" | "preorder";
export interface Availability {
    tone: AvailabilityTone;
    label: string;
    /** Short note shown under the label, e.g. the dispatch estimate. */
    detail?: string;
}
/** Availability derived from real stock and fulfilment data. */
export declare const getAvailability: (product: Product) => Availability;
/** Legacy helper: a short stock warning, or null when stock is healthy. */
export declare const getStockWarning: (product: Product) => string | null;
/** Human label for a condition grade. */
export declare const getConditionGradeLabel: (grade: string) => string;
/** Compact label for a condition grade. */
export declare const getConditionGradeShort: (grade: string) => string;
export interface CategorySummary extends Category {
    count: number;
}
/** Categories that actually contain products, with live counts. */
export declare const getAllCategories: () => CategorySummary[];
/** Look up a single category by slug. */
export declare const getCategoryBySlug: (slug: string) => CategorySummary | undefined;
/** Brands present in the catalogue. */
export declare const getAllBrands: () => string[];
/** Specification filter options. */
export declare const getSpecOptionsList: () => FilterOption[];
/** Coverage filter options. */
export declare const getCoverageOptionsList: () => FilterOption[];
/** Products flagged as featured for the homepage rail. */
export declare const selectFeatured: (products: Product[]) => Product[];
/** Sort a product list by newest `createdAt` first. */
export declare const sortByNewest: (products: Product[]) => Product[];
/** Products flagged as featured for the homepage rail. */
export declare const getFeaturedProducts: () => Product[];
/** Products ordered by newest first, using the catalogue `createdAt` field. */
export declare const getLatestProducts: (limit?: number) => Product[];
/** Products with a genuine markdown against their original price. */
export declare const getPromotionalProducts: () => Product[];
/** Format a date for display, e.g. "12 Oct 2026". */
export declare const formatDate: (value: string) => string;
