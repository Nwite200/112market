import { BRANDS, CATEGORIES, COVERAGE_OPTIONS, PRODUCTS, SPEC_OPTIONS } from "../data";
import { GRADE_LABEL, GRADE_SHORT } from "../types";
export { GRADE_LABEL, GRADE_SHORT };
/**
 * Format an amount in the catalogue currency.
 * All 112 Market pricing is stored in NGN and rendered as Nigerian Naira.
 */
export const formatPrice = (value, currency = "NGN") => {
    const amount = Number.isFinite(value) ? value : 0;
    try {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency,
            maximumFractionDigits: 0,
        }).format(amount);
    }
    catch {
        return `${currency} ${amount.toLocaleString("en-NG")}`;
    }
};
/** Percentage saved against the original price, when one is recorded. */
export const getDiscountPercent = (product) => {
    if (!product.originalPrice || product.originalPrice <= product.price)
        return null;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
};
/** Availability derived from real stock and fulfilment data. */
export const getAvailability = (product) => {
    if (product.fulfillmentType === "preorder") {
        return {
            tone: "preorder",
            label: "Pre-order",
            detail: product.estimatedArrival ?? product.dispatchEta,
        };
    }
    if (product.stockQuantity <= 0) {
        return { tone: "out-of-stock", label: "Out of stock" };
    }
    if (product.stockQuantity <= 2) {
        return {
            tone: "low-stock",
            label: `Only ${product.stockQuantity} left`,
            detail: product.dispatchEta,
        };
    }
    return { tone: "in-stock", label: "In stock", detail: product.dispatchEta };
};
/** Legacy helper: a short stock warning, or null when stock is healthy. */
export const getStockWarning = (product) => {
    const availability = getAvailability(product);
    if (availability.tone === "out-of-stock")
        return "Out of stock";
    if (availability.tone === "low-stock")
        return availability.label;
    if (availability.tone === "preorder")
        return availability.detail ?? "Pre-order";
    return null;
};
/** Human label for a condition grade. */
export const getConditionGradeLabel = (grade) => GRADE_LABEL[grade] ?? grade;
/** Compact label for a condition grade. */
export const getConditionGradeShort = (grade) => GRADE_SHORT[grade] ?? grade;
/** Categories that actually contain products, with live counts. */
export const getAllCategories = () => CATEGORIES.map((category) => ({
    ...category,
    count: PRODUCTS.filter((p) => p.categorySlug === category.slug).length,
})).filter((category) => category.count > 0);
/** Look up a single category by slug. */
export const getCategoryBySlug = (slug) => getAllCategories().find((category) => category.slug === slug);
/** Brands present in the catalogue. */
export const getAllBrands = () => BRANDS.filter((brand) => PRODUCTS.some((p) => p.brand === brand));
/** Specification filter options. */
export const getSpecOptionsList = () => SPEC_OPTIONS;
/** Coverage filter options. */
export const getCoverageOptionsList = () => COVERAGE_OPTIONS;
/** Products flagged as featured for the homepage rail. */
export const selectFeatured = (products) => products.filter((p) => p.isFeatured);
/** Sort a product list by newest `createdAt` first. */
export const sortByNewest = (products) => [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
/** Products flagged as featured for the homepage rail. */
export const getFeaturedProducts = () => selectFeatured(PRODUCTS);
/** Products ordered by newest first, using the catalogue `createdAt` field. */
export const getLatestProducts = (limit) => {
    const sorted = sortByNewest(PRODUCTS);
    return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
};
/** Products with a genuine markdown against their original price. */
export const getPromotionalProducts = () => PRODUCTS.filter((p) => getDiscountPercent(p) !== null);
/** Format a date for display, e.g. "12 Oct 2026". */
export const formatDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime()))
        return value;
    return date.toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};
