import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function AnnouncementBar({ message, href }) {
    return (_jsx("div", { className: "bg-primary/5 border-b border-primary/10 text-primary py-2 text-sm", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 flex items-center gap-3", children: [href ? (_jsx("a", { href: href, className: "underline underline-offset-2 hover:underline-opacity-50", target: "_blank", rel: "noreferrer", children: message })) : (_jsx("span", { children: message })), _jsx("button", { type: "button", className: "ml-auto rounded border-primary text-primary text-sm px-3 py-1 hover:bg-primary/10 transition-colors", "aria-label": "Close announcement", children: "\u2715" })] }) }));
}
