import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
/**
 * The 112 Market identity: a shipping crate crossed by a journey arc,
 * sitting next to the wordmark. Drawn as inline SVG so it stays crisp and
 * needs no external asset.
 */
export function LogoMark({ size = 40, className = "" }) {
    return (_jsxs("svg", { width: size, height: size, viewBox: "0 0 40 40", fill: "none", role: "img", "aria-label": "112 Market", className: className, children: [_jsx("rect", { width: "40", height: "40", rx: "12", fill: "#2A5238" }), _jsx("path", { d: "M11 22.5 20 18l9 4.5v8L20 35l-9-4.5v-8Z", stroke: "#FFFFFF", strokeWidth: "2.2", strokeLinejoin: "round" }), _jsx("path", { d: "M11 22.5 20 27l9-4.5M20 27v8", stroke: "#FFFFFF", strokeWidth: "2.2", strokeLinejoin: "round" }), _jsx("path", { d: "M13 14.5c3.6-3.6 9.8-4 13.8-.4", stroke: "#E2823D", strokeWidth: "2.4", strokeLinecap: "round" })] }));
}
export default function Logo({ size = 40, showTagline = false, asLink = true, className = "", }) {
    const content = (_jsxs("span", { className: `inline-flex items-center gap-2.5 ${className}`, children: [_jsx(LogoMark, { size: size }), _jsxs("span", { className: "flex flex-col leading-none", children: [_jsxs("span", { className: "font-display text-lg font-extrabold tracking-tight text-ink sm:text-xl", children: ["112 ", _jsx("span", { className: "font-semibold text-brand-700", children: "Market" })] }), showTagline && (_jsx("span", { className: "mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-muted", children: "UK \u2192 Nigeria" }))] })] }));
    if (!asLink)
        return content;
    return (_jsx(Link, { to: "/", "aria-label": "112 Market \u2014 home", className: "rounded-lg", children: content }));
}
