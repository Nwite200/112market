import type { Category, FilterOption } from "../types";
/**
 * Browsing taxonomy for 112 Market.
 *
 * Every category here is backed by at least one product in the catalogue
 * (`src/data/asm.ts`). Counts are computed from the catalogue at runtime by
 * `getAllCategories()` — the `count` field below is only a seed value.
 */
export declare const CATEGORIES: Category[];
/** Brands that actually appear in the catalogue. */
export declare const BRANDS: string[];
/** Specification filters. Each id maps to a matcher in `services/catalog.ts`. */
export declare const SPEC_OPTIONS: FilterOption[];
/** Coverage options. Each id maps to a matcher in `services/catalog.ts`. */
export declare const COVERAGE_OPTIONS: FilterOption[];
