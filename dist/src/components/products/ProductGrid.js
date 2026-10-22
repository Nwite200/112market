import { jsx as _jsx } from "react/jsx-runtime";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
/**
 * Responsive product grid.
 *
 * Two columns on mobile, three on tablets, four on laptops and five on wide
 * desktop screens. Every grid in the store uses this component so the column
 * rhythm stays consistent.
 */
export default function ProductGrid({ products, loading = false, skeletonCount = 8, className = "", }) {
    if (loading) {
        return (_jsx("div", { className: `grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${className}`, "aria-busy": "true", "aria-live": "polite", children: Array.from({ length: skeletonCount }).map((_, index) => (_jsx(ProductCardSkeleton, {}, index))) }));
    }
    return (_jsx("div", { className: `grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${className}`, children: products.map((product, index) => (_jsx(ProductCard, { product: product, priority: index < 5 }, product.id))) }));
}
