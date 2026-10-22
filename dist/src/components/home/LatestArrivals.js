import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useProductContext } from "../../context/ShopContext";
import { sortByNewest } from "../../services/sections";
import ProductGrid from "../products/ProductGrid";
import SectionHeading from "../ui/SectionHeading";
/**
 * Homepage rail of the newest catalogue additions.
 * Ordered by the product `createdAt` field, newest first.
 */
export default function LatestArrivals() {
    const { products, loading } = useProductContext();
    const latest = sortByNewest(products).slice(0, 12);
    if (!loading && !latest.length)
        return null;
    return (_jsx("section", { className: "section bg-brand-50", children: _jsxs("div", { className: "container-page", children: [_jsx(SectionHeading, { eyebrow: "Latest arrivals", title: "Fresh in from the UK", description: "Newly graded items added to the catalogue, most recent first.", action: { label: "View all new stock", to: "/products?sort=newest" } }), _jsx("div", { className: "mt-10", children: _jsx(ProductGrid, { products: latest, loading: loading, skeletonCount: 10 }) })] }) }));
}
