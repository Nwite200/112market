import { PRODUCTS, SHIPMENTS } from "../data";
export const PAGE_SIZE = 12;
/** Spec filters resolve to a predicate over the product record. */
const SPEC_MATCHERS = {
    plug: (p) => p.specifications.some((s) => /type g/i.test(s)),
    voltage: (p) => p.specifications.some((s) => /220|240/i.test(s)),
    energy: (p) => p.specifications.some((s) => /energy rating/i.test(s)),
    dimensions: (p) => p.specifications.some((s) => /\d+\s*(cm|inch)/i.test(s)),
    manual: (p) => p.accessories.some((a) => /manual/i.test(a)),
    tested: (p) => (p.meta ?? []).some((m) => /test/i.test(m)),
};
/** Coverage filters resolve against the warranty recorded on the product. */
const COVERAGE_MATCHERS = {
    "30day": (p) => p.warrantyDays >= 30,
    "90day": (p) => p.warrantyDays >= 90,
};
/** Dispatch location bucket for a product. */
export const locationOf = (product) => product.dispatchLocation.toLowerCase().includes("depot") ? "depot" : "sea";
/** True when the product matches every active filter. */
export const matchesFilters = (product, filters) => {
    if (filters.category && filters.category !== "all") {
        if (product.categorySlug !== filters.category)
            return false;
    }
    if (filters.grades?.length) {
        if (!filters.grades.includes(product.conditionGrade))
            return false;
    }
    if (filters.brands?.length) {
        if (!filters.brands.includes(product.brand))
            return false;
    }
    if (filters.minPrice > 0 && product.price < filters.minPrice)
        return false;
    if (filters.maxPrice > 0 && product.price > filters.maxPrice)
        return false;
    if (filters.tab === "instock" && product.fulfillmentType !== "in_stock")
        return false;
    if (filters.tab === "preorder" && product.fulfillmentType !== "preorder")
        return false;
    if (filters.locations?.length) {
        if (!filters.locations.includes(locationOf(product)))
            return false;
    }
    if (filters.specs?.length) {
        const matched = filters.specs.some((id) => SPEC_MATCHERS[id]?.(product));
        if (!matched)
            return false;
    }
    if (filters.coverages?.length) {
        const matched = filters.coverages.some((id) => COVERAGE_MATCHERS[id]?.(product));
        if (!matched)
            return false;
    }
    if (filters.query) {
        const q = filters.query.trim().toLowerCase();
        if (q) {
            const haystack = [
                product.name,
                product.brand,
                product.category,
                product.description,
                ...product.specifications,
            ]
                .join(" ")
                .toLowerCase();
            if (!haystack.includes(q))
                return false;
        }
    }
    return true;
};
/** Filter products based on the provided FilterState */
export const applyFilters = (products, filters) => products.filter((product) => matchesFilters(product, filters));
const GRADE_ORDER = { A: 0, B: 1, C: 2 };
/** Sort products by the requested catalogue sort key. */
export const sortProducts = (products, sort) => {
    const sorted = [...products];
    switch (sort) {
        case "price-asc":
            return sorted.sort((a, b) => a.price - b.price);
        case "price-desc":
            return sorted.sort((a, b) => b.price - a.price);
        case "popularity":
            return sorted.sort((a, b) => b.popularity - a.popularity);
        case "grade":
            return sorted.sort((a, b) => GRADE_ORDER[a.conditionGrade] - GRADE_ORDER[b.conditionGrade] || b.price - a.price);
        case "recent":
        case "newest":
        default:
            return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
};
/** Slice a list into a page, clamping the requested page into range. */
export const paginate = (items, page, pageSize = PAGE_SIZE) => {
    const total = items.length;
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    const current = Math.min(Math.max(1, page), pageCount);
    const start = (current - 1) * pageSize;
    return {
        items: items.slice(start, start + pageSize),
        page: current,
        pageCount,
        total,
        hasPrevious: current > 1,
        hasNext: current < pageCount,
    };
};
/** Get shipments data for announcement bar */
export const getShipments = () => SHIPMENTS;
/** The catalogue products, exposed for the repository layer. */
export const getCatalogue = () => PRODUCTS;
