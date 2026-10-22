import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
/** Accessible breadcrumb trail. */
export default function Breadcrumbs({ items }) {
    return (_jsx("nav", { "aria-label": "Breadcrumb", className: "py-4", children: _jsx("ol", { className: "flex flex-wrap items-center gap-1 text-xs text-muted", children: items.map((item, index) => {
                const isLast = index === items.length - 1;
                return (_jsxs("li", { className: "flex items-center gap-1", children: [item.to && !isLast ? (_jsx(Link, { to: item.to, className: "rounded transition-colors hover:text-brand-700 hover:underline", children: item.label })) : (_jsx("span", { className: isLast ? "font-semibold text-ink" : undefined, "aria-current": isLast ? "page" : undefined, children: item.label })), !isLast && (_jsx(ChevronRight, { className: "h-3.5 w-3.5 text-muted/60", "aria-hidden": "true" }))] }, `${item.label}-${index}`));
            }) }) }));
}
