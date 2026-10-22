import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { useProductContext } from "../../context/ShopContext";
import { applyFilters, paginate, sortProducts } from "../../services/catalog";
import { useCatalogFilters } from "../../hooks/useCatalogFilters";
import ProductGrid from "./ProductGrid";
import FilterPanel from "./FilterPanel";
import SortSelect from "./SortSelect";
import Pagination from "./Pagination";
import EmptyState from "../ui/EmptyState";
import Breadcrumbs from "../ui/Breadcrumbs";
/**
 * Shared catalogue listing used by the all-products page and every category
 * page. Filtering, sorting and pagination all run against the real catalogue.
 */
export default function CatalogueView({ title, description, breadcrumbs, categorySlug, showCategories = false, searchPlaceholder = "Search products…", }) {
    const { products, loading, error } = useProductContext();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const defaults = useMemo(() => (categorySlug ? { category: categorySlug } : {}), [categorySlug]);
    const { filters, update, reset, sort, setSort, page, setPage } = useCatalogFilters(defaults);
    // Reset to the first page whenever the filter set changes.
    useEffect(() => {
        if (page !== 1)
            setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.grades, filters.brands, filters.specs, filters.coverages, filters.locations, filters.minPrice, filters.maxPrice, filters.tab, filters.query]);
    useEffect(() => {
        document.body.style.overflow = drawerOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [drawerOpen]);
    const results = useMemo(() => {
        const filtered = applyFilters(products, filters);
        return sortProducts(filtered, sort);
    }, [products, filters, sort]);
    const paged = useMemo(() => paginate(results, page), [results, page]);
    const activeFilterCount = filters.grades.length +
        filters.brands.length +
        filters.specs.length +
        filters.coverages.length +
        filters.locations.length +
        (filters.minPrice > 0 ? 1 : 0) +
        (filters.maxPrice > 0 ? 1 : 0) +
        (filters.tab !== "all" ? 1 : 0);
    return (_jsxs("div", { className: "container-page py-8 lg:py-12", children: [_jsx(Breadcrumbs, { items: breadcrumbs }), _jsxs("header", { className: "max-w-2xl", children: [_jsx("h1", { className: "text-display-sm font-extrabold text-ink", children: title }), description ? (_jsx("p", { className: "mt-3 text-base leading-relaxed text-muted", children: description })) : null] }), error ? (_jsxs("div", { className: "mt-8 rounded-xl2 border border-danger/30 bg-danger/5 p-6", children: [_jsx("h2", { className: "text-base font-bold text-danger", children: "We could not load the catalogue" }), _jsx("p", { className: "mt-1 text-sm text-muted", children: error })] })) : null, _jsxs("div", { className: "mt-8 grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-10", children: [_jsx("aside", { className: "hidden lg:block", children: _jsx("div", { className: "sticky top-28 rounded-xl2 border border-line bg-white p-5", children: _jsx(FilterPanel, { filters: filters, onChange: update, onReset: reset, showCategories: showCategories }) }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4", children: [_jsx("p", { className: "text-sm text-muted", "aria-live": "polite", children: loading ? ("Loading products…") : (_jsxs(_Fragment, { children: [_jsx("span", { className: "font-semibold text-ink", children: paged.total }), " ", paged.total === 1 ? "product" : "products", filters.query ? ` for “${filters.query}”` : ""] })) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("button", { type: "button", onClick: () => setDrawerOpen(true), className: "btn-secondary btn-sm lg:hidden", "aria-expanded": drawerOpen, "aria-controls": "filter-drawer", children: [_jsx(SlidersHorizontal, { className: "h-4 w-4", "aria-hidden": "true" }), "Filters", activeFilterCount > 0 && (_jsx("span", { className: "ml-1 rounded-full bg-brand-700 px-1.5 text-[0.65rem] font-bold text-white", children: activeFilterCount }))] }), _jsx(SortSelect, { value: sort, onChange: (value) => setSort(value) })] })] }), activeFilterCount > 0 && (_jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-2", children: [_jsx("span", { className: "text-xs font-semibold uppercase tracking-wide text-muted", children: "Active filters" }), _jsx("button", { type: "button", onClick: reset, className: "rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800 transition-colors hover:bg-brand-100", children: "Clear all" })] })), _jsx("div", { className: "mt-6", children: loading ? (_jsx(ProductGrid, { products: [], loading: true, skeletonCount: 12 })) : paged.items.length === 0 ? (_jsx(EmptyState, { title: "No products match these filters", description: "Try removing a filter or clearing the search to see more of the catalogue.", action: _jsx("button", { type: "button", onClick: reset, className: "btn-primary btn-sm", children: "Clear all filters" }) })) : (_jsx(ProductGrid, { products: paged.items })) }), _jsx(Pagination, { page: paged.page, pageCount: paged.pageCount, onChange: setPage })] })] }), drawerOpen && (_jsxs("div", { className: "fixed inset-0 z-[80] lg:hidden", role: "dialog", "aria-modal": "true", "aria-label": "Filters", children: [_jsx("button", { type: "button", "aria-label": "Close filters", onClick: () => setDrawerOpen(false), className: "absolute inset-0 bg-ink/40" }), _jsxs("div", { className: "absolute inset-y-0 left-0 flex w-[min(22rem,90vw)] flex-col bg-canvas shadow-overlay", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-line px-4 py-3", children: [_jsx("h2", { className: "text-sm font-bold text-ink", children: "Filters" }), _jsx("button", { type: "button", onClick: () => setDrawerOpen(false), className: "rounded-lg p-2 text-muted transition-colors hover:bg-brand-50 hover:text-ink", "aria-label": "Close filters", children: _jsx(X, { className: "h-4 w-4", "aria-hidden": "true" }) })] }), _jsx("div", { className: "flex-1 overflow-y-auto px-4 py-4", children: _jsx(FilterPanel, { filters: filters, onChange: update, onReset: reset, showCategories: showCategories }) }), _jsx("div", { className: "border-t border-line p-4", children: _jsxs("button", { type: "button", onClick: () => setDrawerOpen(false), className: "btn-primary w-full", children: ["Show ", paged.total, " result", paged.total === 1 ? "" : "s"] }) })] })] }))] }));
}
