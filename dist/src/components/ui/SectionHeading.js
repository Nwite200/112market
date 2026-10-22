import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
/** Consistent section title block used across the homepage. */
export default function SectionHeading({ eyebrow, title, description, action, align = "left", }) {
    const centered = align === "center";
    return (_jsxs("div", { className: `flex flex-col gap-4 ${centered
            ? "items-center text-center"
            : "sm:flex-row sm:items-end sm:justify-between"}`, children: [_jsxs("div", { className: centered ? "max-w-2xl" : "max-w-2xl", children: [eyebrow ? _jsx("p", { className: "eyebrow", children: eyebrow }) : null, _jsx("h2", { className: "mt-2 text-display-sm font-extrabold text-ink", children: title }), description ? (_jsx("p", { className: "mt-3 text-base leading-relaxed text-muted", children: description })) : null] }), action ? (_jsxs(Link, { to: action.to, className: "btn-secondary btn-sm shrink-0 self-start sm:self-auto", children: [action.label, _jsx(ArrowRight, { className: "h-4 w-4", "aria-hidden": "true" })] })) : null] }));
}
export function SectionShell({ children, className = "", }) {
    return _jsx("section", { className: `section ${className}`, children: children });
}
