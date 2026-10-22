import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import Logo from "../brand/Logo";
import { BUSINESS, BUSINESS_ADDRESS_LINES } from "../../data/business";
import { getAllCategories } from "../../services/sections";
export default function Footer() {
    const categories = getAllCategories();
    const year = new Date().getFullYear();
    const supportLinks = [
        { to: "/support", label: "Help & Support" },
        { to: "/delivery-returns", label: "Delivery & Returns" },
        { to: "/products", label: "All products" },
        { to: "/products?sort=newest", label: "Latest arrivals" },
    ];
    const companyLinks = [
        { to: "/about", label: "About 112 Market" },
        { to: "/privacy", label: "Privacy policy" },
        { to: "/terms", label: "Terms of sale" },
    ];
    return (_jsxs("footer", { className: "mt-auto border-t border-line bg-white", children: [_jsx("div", { className: "container-page py-14", children: _jsxs("div", { className: "grid gap-10 md:grid-cols-2 lg:grid-cols-4", children: [_jsxs("div", { className: "lg:col-span-1", children: [_jsx(Logo, { size: 38, showTagline: true }), _jsxs("p", { className: "mt-4 max-w-xs text-sm leading-relaxed text-muted", children: [BUSINESS.tagline, " Every item is graded, described and tested before it reaches our Lagos depot."] }), _jsx("address", { className: "mt-5 not-italic", children: _jsxs("p", { className: "flex items-start gap-2 text-sm text-muted", children: [_jsx(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-brand-700", "aria-hidden": "true" }), _jsx("span", { children: BUSINESS_ADDRESS_LINES.map((line) => (_jsx("span", { className: "block", children: line }, line))) })] }) })] }), _jsxs("nav", { "aria-labelledby": "footer-shop", children: [_jsx("h2", { id: "footer-shop", className: "text-sm font-bold text-ink", children: "Shop" }), _jsx("ul", { className: "mt-4 space-y-2.5", children: categories.map((category) => (_jsx("li", { children: _jsx(Link, { to: `/category/${category.slug}`, className: "text-sm text-muted transition-colors hover:text-brand-700", children: category.label }) }, category.slug))) })] }), _jsxs("nav", { "aria-labelledby": "footer-support", children: [_jsx("h2", { id: "footer-support", className: "text-sm font-bold text-ink", children: "Customer support" }), _jsx("ul", { className: "mt-4 space-y-2.5", children: supportLinks.map((link) => (_jsx("li", { children: _jsx(Link, { to: link.to, className: "text-sm text-muted transition-colors hover:text-brand-700", children: link.label }) }, link.to + link.label))) })] }), _jsxs("nav", { "aria-labelledby": "footer-company", children: [_jsx("h2", { id: "footer-company", className: "text-sm font-bold text-ink", children: "Company" }), _jsx("ul", { className: "mt-4 space-y-2.5", children: companyLinks.map((link) => (_jsx("li", { children: _jsx(Link, { to: link.to, className: "text-sm text-muted transition-colors hover:text-brand-700", children: link.label }) }, link.to))) })] })] }) }), _jsx("div", { className: "border-t border-line", children: _jsxs("div", { className: "container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted sm:flex-row", children: [_jsxs("p", { children: ["\u00A9 ", year, " ", BUSINESS.name, ". UK-sourced fairly used household items."] }), _jsxs("p", { children: ["Prices shown in Nigerian Naira (NGN). ", BUSINESS.address.city, ", ", BUSINESS.address.state, "."] })] }) })] }));
}
export { Footer };
