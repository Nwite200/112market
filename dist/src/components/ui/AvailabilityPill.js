import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TONES = {
    "in-stock": "text-success",
    "low-stock": "text-warning",
    "out-of-stock": "text-danger",
    preorder: "text-brand-700",
};
/** Small stock / availability indicator driven by real stock data. */
export default function AvailabilityPill({ availability, className = "", }) {
    return (_jsxs("p", { className: `flex items-center gap-1.5 text-xs font-semibold ${TONES[availability.tone]} ${className}`, children: [_jsx("span", { className: "relative flex h-1.5 w-1.5", children: _jsx("span", { className: `absolute inline-flex h-full w-full rounded-full opacity-70 ${availability.tone === "out-of-stock" ? "bg-danger" : "bg-current"}` }) }), availability.label, availability.detail ? (_jsxs("span", { className: "font-normal text-muted", children: ["\u00B7 ", availability.detail] })) : null] }));
}
