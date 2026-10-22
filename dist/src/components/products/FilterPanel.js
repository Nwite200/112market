import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LOCATION_OPTIONS } from "../../types";
import { getAllBrands, getAllCategories, getCoverageOptionsList, getSpecOptionsList, } from "../../services/sections";
const GRADES = ["A", "B", "C"];
function toggle(list, value) {
    return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}
function Checkbox({ checked, onChange, label, hint, }) {
    return (_jsxs("label", { className: "flex cursor-pointer items-start gap-2.5 py-1 text-sm text-ink transition-colors hover:text-brand-700", children: [_jsx("input", { type: "checkbox", checked: checked, onChange: onChange, className: "mt-0.5 h-4 w-4 shrink-0 rounded border-line text-brand-700 focus:ring-brand-600" }), _jsxs("span", { children: [label, hint ? _jsx("span", { className: "block text-xs text-muted", children: hint }) : null] })] }));
}
function Group({ title, children }) {
    return (_jsxs("fieldset", { className: "border-t border-line pt-5", children: [_jsx("legend", { className: "mb-2 text-xs font-bold uppercase tracking-[0.14em] text-ink", children: title }), _jsx("div", { className: "space-y-0.5", children: children })] }));
}
/** Catalogue filter sidebar. Rendered inline on desktop and inside the mobile drawer. */
export default function FilterPanel({ filters, onChange, onReset, showCategories = false, className = "", }) {
    const categories = getAllCategories();
    const brands = getAllBrands();
    const specs = getSpecOptionsList();
    const coverages = getCoverageOptionsList();
    return (_jsxs("div", { className: `space-y-5 ${className}`, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-sm font-bold text-ink", children: "Filters" }), _jsx("button", { type: "button", onClick: onReset, className: "rounded text-xs font-semibold text-brand-700 underline-offset-4 hover:underline", children: "Clear all" })] }), _jsx(Group, { title: "Availability", children: _jsx("div", { className: "flex flex-wrap gap-2", children: [
                        { id: "all", label: "All" },
                        { id: "instock", label: "In stock" },
                        { id: "preorder", label: "Pre-order" },
                    ].map((tab) => (_jsx("button", { type: "button", onClick: () => onChange({ tab: tab.id }), "aria-pressed": filters.tab === tab.id, className: `rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition-colors ${filters.tab === tab.id
                            ? "bg-brand-700 text-white ring-brand-700"
                            : "bg-white text-ink ring-line hover:ring-brand-300"}`, children: tab.label }, tab.id))) }) }), showCategories && (_jsx(Group, { title: "Category", children: categories.map((category) => (_jsx(Checkbox, { checked: filters.category === category.slug, onChange: () => onChange({
                        category: filters.category === category.slug ? "all" : category.slug,
                    }), label: category.label, hint: `${category.count} item${category.count === 1 ? "" : "s"}` }, category.slug))) })), _jsx(Group, { title: "Condition grade", children: GRADES.map((grade) => (_jsx(Checkbox, { checked: filters.grades.includes(grade), onChange: () => onChange({ grades: toggle(filters.grades, grade) }), label: grade === "A" ? "Grade A – Like new" : grade === "B" ? "Grade B – Minor signs" : "Grade C – Value tier" }, grade))) }), _jsx(Group, { title: "Price (NGN)", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("label", { className: "sr-only", htmlFor: "filter-min-price", children: "Minimum price" }), _jsx("input", { id: "filter-min-price", type: "number", inputMode: "numeric", min: 0, step: 500, value: filters.minPrice || "", placeholder: "Min", onChange: (event) => onChange({ minPrice: Number(event.target.value) || 0 }), className: "h-10 w-full rounded-lg border border-line bg-white px-3 text-sm" }), _jsx("span", { className: "text-muted", "aria-hidden": "true", children: "\u2013" }), _jsx("label", { className: "sr-only", htmlFor: "filter-max-price", children: "Maximum price" }), _jsx("input", { id: "filter-max-price", type: "number", inputMode: "numeric", min: 0, step: 500, value: filters.maxPrice || "", placeholder: "Max", onChange: (event) => onChange({ maxPrice: Number(event.target.value) || 0 }), className: "h-10 w-full rounded-lg border border-line bg-white px-3 text-sm" })] }) }), _jsx(Group, { title: "Brand", children: brands.map((brand) => (_jsx(Checkbox, { checked: filters.brands.includes(brand), onChange: () => onChange({ brands: toggle(filters.brands, brand) }), label: brand }, brand))) }), _jsx(Group, { title: "Dispatch from", children: LOCATION_OPTIONS.map((location) => (_jsx(Checkbox, { checked: filters.locations.includes(location.id), onChange: () => onChange({ locations: toggle(filters.locations, location.id) }), label: location.label }, location.id))) }), _jsx(Group, { title: "Specifications", children: specs.map((spec) => (_jsx(Checkbox, { checked: filters.specs.includes(spec.id), onChange: () => onChange({ specs: toggle(filters.specs, spec.id) }), label: spec.label }, spec.id))) }), _jsx(Group, { title: "Coverage", children: coverages.map((coverage) => (_jsx(Checkbox, { checked: filters.coverages.includes(coverage.id), onChange: () => onChange({ coverages: toggle(filters.coverages, coverage.id) }), label: coverage.label }, coverage.id))) })] }));
}
