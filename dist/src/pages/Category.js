import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useParams } from "react-router-dom";
import CatalogueView from "../components/products/CatalogueView";
import EmptyState from "../components/ui/EmptyState";
import { getAllCategories, getCategoryBySlug } from "../services/sections";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
export default function Category() {
    const { slug = "" } = useParams();
    const category = getCategoryBySlug(slug);
    useDocumentMeta({
        title: category ? category.label : "Category not found",
        description: category?.description,
        canonical: `/category/${slug}`,
    });
    if (!category) {
        return (_jsxs("div", { className: "container-page py-16", children: [_jsx(EmptyState, { title: "We could not find that category", description: "The category you are looking for is not part of the current catalogue.", action: _jsx(Link, { to: "/products", className: "btn-primary btn-sm", children: "Browse all products" }) }), _jsxs("div", { className: "mt-10", children: [_jsx("h2", { className: "text-sm font-bold text-ink", children: "Available categories" }), _jsx("ul", { className: "mt-3 flex flex-wrap gap-2", children: getAllCategories().map((item) => (_jsx("li", { children: _jsx(Link, { to: `/category/${item.slug}`, className: "inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand-300 hover:text-brand-700", children: item.label }) }, item.slug))) })] })] }));
    }
    return (_jsx(CatalogueView, { title: category.label, description: category.description, breadcrumbs: [{ label: "Home", to: "/" }, { label: "All products", to: "/products" }, { label: category.label }], categorySlug: category.slug }));
}
