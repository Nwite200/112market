import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { getAllCategories } from "../services/sections";
export default function NotFound() {
    useDocumentMeta({
        title: "Page not found",
        description: "The page you are looking for could not be found.",
    });
    const categories = getAllCategories();
    return (_jsxs("div", { className: "container-page flex flex-col items-center py-20 text-center", children: [_jsx("span", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700", children: _jsx(Compass, { className: "h-6 w-6", "aria-hidden": "true" }) }), _jsx("h1", { className: "mt-6 text-display-sm font-extrabold text-ink", children: "We could not find that page" }), _jsx("p", { className: "mt-3 max-w-md text-base text-muted", children: "The link may be out of date, or the item may have sold. Try the catalogue or one of the categories below." }), _jsxs("div", { className: "mt-8 flex flex-wrap justify-center gap-3", children: [_jsx(Link, { to: "/", className: "btn-primary", children: "Back to home" }), _jsx(Link, { to: "/products", className: "btn-secondary", children: "Browse all products" })] }), _jsx("ul", { className: "mt-10 flex flex-wrap justify-center gap-2", children: categories.map((category) => (_jsx("li", { children: _jsx(Link, { to: `/category/${category.slug}`, className: "inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand-300 hover:text-brand-700", children: category.label }) }, category.slug))) })] }));
}
