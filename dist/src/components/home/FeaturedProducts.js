import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useProductContext } from "../../context/ShopContext";
import { selectFeatured } from "../../services/sections";
import ProductGrid from "../products/ProductGrid";
import SectionHeading from "../ui/SectionHeading";
/**
 * Homepage rail for products flagged as featured in the catalogue.
 * Reads from the product context so it shows loading skeletons while the
 * catalogue is being fetched.
 */
export default function FeaturedProducts() {
    const { products, loading } = useProductContext();
    const featured = selectFeatured(products);
    if (!loading && !featured.length)
        return null;
    return (_jsx("section", { className: "section bg-brand-50", children: _jsxs("div", { className: "container-page", children: [_jsx(SectionHeading, { eyebrow: "Featured this week", title: "Hand-picked stock from our depot", description: "Items our team has inspected and photographed recently. Stock counts shown are live.", action: { label: "Browse all products", to: "/products" } }), _jsx("div", { className: "mt-10", children: _jsx(ProductGrid, { products: featured.slice(0, 10), loading: loading, skeletonCount: 5 }) }), _jsx("div", { className: "mt-8 flex justify-center", children: _jsxs(Link, { to: "/products", className: "btn-secondary", children: ["See the full catalogue", _jsx(ArrowRight, { className: "h-4 w-4", "aria-hidden": "true" })] }) })] }) }));
}
