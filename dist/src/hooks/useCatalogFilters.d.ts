import type { FilterState, SortKey } from "../types";
/** Read the filter state out of the URL. */
export declare const parseFilters: (params: URLSearchParams, defaults?: Partial<FilterState>) => FilterState;
/** Serialise the filter state back into the URL. */
export declare const buildParams: (filters: FilterState, extra?: Record<string, string>) => URLSearchParams;
/**
 * Keeps the shared filter context and the URL in sync so catalogue pages are
 * shareable and the browser back button behaves as expected.
 */
export declare function useCatalogFilters(defaults?: Partial<FilterState>): {
    filters: FilterState;
    update: (patch: Partial<FilterState>) => void;
    reset: () => void;
    sort: SortKey;
    setSort: (value: SortKey) => void;
    page: number;
    setPage: (value: number) => void;
    searchParams: URLSearchParams;
};
export default useCatalogFilters;
