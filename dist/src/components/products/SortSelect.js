import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const OPTIONS = [
    { value: "newest", label: "Newest first" },
    { value: "price-asc", label: "Price: low to high" },
    { value: "price-desc", label: "Price: high to low" },
    { value: "popularity", label: "Most popular" },
    { value: "grade", label: "Condition grade" },
];
/** Sort control for catalogue pages. */
export default function SortSelect({ value, onChange, }) {
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("label", { htmlFor: "sort-select", className: "whitespace-nowrap text-sm text-muted", children: "Sort by" }), _jsx("select", { id: "sort-select", value: value, onChange: (event) => onChange(event.target.value), className: "h-10 rounded-lg border border-line bg-white px-3 text-sm font-semibold text-ink", children: OPTIONS.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value))) })] }));
}
