import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Headphones, Menu, Search, ShoppingBag, X } from "lucide-react";
import Logo from "../../brand/Logo";
import { useCartContext } from "../../../context/ShopContext";
import { getAllCategories } from "../../../services/sections";
const navLinkClass = ({ isActive }) => `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${isActive ? "text-brand-700" : "text-ink hover:text-brand-700"}`;
export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [megaOpen, setMegaOpen] = useState(false);
    const [query, setQuery] = useState("");
    const { cartCount } = useCartContext();
    const navigate = useNavigate();
    const location = useLocation();
    const megaRef = useRef(null);
    const categories = getAllCategories();
    useEffect(() => {
        setMobileOpen(false);
        setMegaOpen(false);
    }, [location.pathname, location.search]);
    useEffect(() => {
        if (!megaOpen)
            return;
        const onKeyDown = (event) => {
            if (event.key === "Escape")
                setMegaOpen(false);
        };
        const onClick = (event) => {
            if (megaRef.current && !megaRef.current.contains(event.target)) {
                setMegaOpen(false);
            }
        };
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("mousedown", onClick);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("mousedown", onClick);
        };
    }, [megaOpen]);
    const submitSearch = (event) => {
        event.preventDefault();
        const trimmed = query.trim();
        navigate(trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : "/products");
    };
    return (_jsxs("header", { className: "sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85", children: [_jsxs("div", { className: "container-page", children: [_jsxs("div", { className: "flex h-16 items-center gap-3 lg:h-[4.5rem] lg:gap-6", children: [_jsx("button", { type: "button", className: "-ml-2 rounded-lg p-2 text-ink transition-colors hover:bg-brand-50 lg:hidden", "aria-expanded": mobileOpen, "aria-controls": "mobile-navigation", "aria-label": mobileOpen ? "Close menu" : "Open menu", onClick: () => setMobileOpen((open) => !open), children: mobileOpen ? (_jsx(X, { className: "h-5 w-5", "aria-hidden": "true" })) : (_jsx(Menu, { className: "h-5 w-5", "aria-hidden": "true" })) }), _jsx(Logo, { size: 38, className: "shrink-0" }), _jsxs("form", { role: "search", onSubmit: submitSearch, className: "hidden flex-1 md:block", children: [_jsx("label", { htmlFor: "site-search", className: "sr-only", children: "Search products" }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted", "aria-hidden": "true" }), _jsx("input", { id: "site-search", type: "search", value: query, onChange: (event) => setQuery(event.target.value), placeholder: "Search sofas, appliances, electronics\u2026", className: "h-11 w-full rounded-full border border-line bg-canvas pl-11 pr-4 text-sm text-ink placeholder:text-muted/80 transition-colors focus:border-brand-400 focus:bg-surface" })] })] }), _jsxs("div", { className: "ml-auto flex items-center gap-1 sm:gap-2", children: [_jsxs(Link, { to: "/support", className: "hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-50 hover:text-brand-700 md:flex", children: [_jsx(Headphones, { className: "h-4 w-4", "aria-hidden": "true" }), _jsx("span", { className: "hidden lg:inline", children: "Help & Support" }), _jsx("span", { className: "lg:hidden", children: "Support" })] }), _jsxs(Link, { to: "/cart", className: "relative rounded-full p-2.5 text-ink transition-colors hover:bg-brand-50 hover:text-brand-700", "aria-label": `Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`, children: [_jsx(ShoppingBag, { className: "h-5 w-5", "aria-hidden": "true" }), cartCount > 0 && (_jsx("span", { className: "absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent-500 px-1 text-[0.65rem] font-bold text-white ring-2 ring-surface", children: cartCount > 99 ? "99+" : cartCount }))] })] })] }), _jsx("nav", { "aria-label": "Product categories", className: "hidden border-t border-line lg:block", children: _jsxs("div", { className: "flex items-center gap-1 py-2", children: [_jsxs("div", { ref: megaRef, className: "relative", children: [_jsxs("button", { type: "button", onClick: () => setMegaOpen((open) => !open), onMouseEnter: () => setMegaOpen(true), "aria-expanded": megaOpen, "aria-haspopup": "true", "aria-controls": "category-menu", className: "flex items-center gap-1.5 rounded-full bg-brand-50 px-4 py-2 text-sm font-bold text-brand-800 transition-colors hover:bg-brand-100", children: ["All categories", _jsx(ChevronDown, { className: `h-4 w-4 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`, "aria-hidden": "true" })] }), megaOpen && (_jsx("div", { id: "category-menu", className: "absolute left-0 top-full z-50 w-[min(46rem,calc(100vw-3rem))] animate-slide-down rounded-xl2 border border-line bg-surface p-5 shadow-overlay", children: _jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: categories.map((category) => (_jsxs(Link, { to: `/category/${category.slug}`, className: "group flex items-center gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-line hover:bg-brand-50/60", children: [_jsx("img", { src: category.image, alt: "", loading: "lazy", className: "h-12 w-12 rounded-lg object-cover" }), _jsxs("span", { className: "min-w-0", children: [_jsx("span", { className: "block truncate text-sm font-semibold text-ink group-hover:text-brand-700", children: category.label }), _jsxs("span", { className: "block text-xs text-muted", children: [category.count, " items"] })] })] }, category.slug))) }) }))] }), _jsx(NavLink, { to: "/products", className: navLinkClass, children: "All products" }), _jsx(NavLink, { to: "/products?sort=newest", className: navLinkClass, children: "Latest arrivals" }), _jsx(NavLink, { to: "/products?sort=popularity", className: navLinkClass, children: "Best selling" }), _jsx(NavLink, { to: "/category/furniture", className: navLinkClass, children: "Furniture" }), _jsx(NavLink, { to: "/category/kitchen", className: navLinkClass, children: "Kitchen & Appliances" }), _jsx(NavLink, { to: "/category/electronics", className: navLinkClass, children: "Electronics" })] }) })] }), mobileOpen && (_jsx("div", { id: "mobile-navigation", className: "animate-slide-down border-t border-line bg-surface lg:hidden", children: _jsxs("div", { className: "container-page space-y-4 py-4", children: [_jsxs("form", { role: "search", onSubmit: submitSearch, children: [_jsx("label", { htmlFor: "mobile-search", className: "sr-only", children: "Search products" }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted", "aria-hidden": "true" }), _jsx("input", { id: "mobile-search", type: "search", value: query, onChange: (event) => setQuery(event.target.value), placeholder: "Search products\u2026", className: "h-11 w-full rounded-full border border-line bg-canvas pl-11 pr-4 text-sm" })] })] }), _jsxs("div", { children: [_jsx("p", { className: "mb-2 text-xs font-bold uppercase tracking-[0.16em] text-muted", children: "Categories" }), _jsx("ul", { className: "grid grid-cols-2 gap-2", children: categories.map((category) => (_jsx("li", { children: _jsxs(Link, { to: `/category/${category.slug}`, className: "flex items-center gap-2 rounded-xl border border-line p-2 text-sm font-semibold text-ink", children: [_jsx("img", { src: category.image, alt: "", loading: "lazy", className: "h-9 w-9 rounded-lg object-cover" }), _jsx("span", { className: "min-w-0 truncate", children: category.label })] }) }, category.slug))) })] }), _jsxs("div", { className: "flex flex-col gap-1 border-t border-line pt-3", children: [_jsx(NavLink, { to: "/products", className: navLinkClass, children: "All products" }), _jsx(NavLink, { to: "/products?sort=newest", className: navLinkClass, children: "Latest arrivals" }), _jsx(NavLink, { to: "/support", className: navLinkClass, children: "Help & Support" })] })] }) }))] }));
}
