import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Shared empty / unavailable state. */
export default function EmptyState({ title, description, action, icon, }) {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center rounded-xl2 border border-dashed border-line bg-white px-6 py-16 text-center", children: [icon ? _jsx("div", { className: "mb-4 text-brand-700", children: icon }) : null, _jsx("h2", { className: "text-lg font-bold text-ink", children: title }), description ? (_jsx("p", { className: "mt-2 max-w-md text-sm leading-relaxed text-muted", children: description })) : null, action ? _jsx("div", { className: "mt-6", children: action }) : null] }));
}
