import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Breadcrumbs from "./Breadcrumbs";
/** Shared layout for the informational pages (about, policies, support). */
export default function PolicyLayout({ title, intro, breadcrumbs, children, }) {
    return (_jsxs("div", { className: "container-page py-8 lg:py-12", children: [_jsx(Breadcrumbs, { items: breadcrumbs }), _jsxs("header", { className: "max-w-2xl", children: [_jsx("h1", { className: "text-display-sm font-extrabold text-ink", children: title }), intro ? _jsx("p", { className: "mt-3 text-base leading-relaxed text-muted", children: intro }) : null] }), _jsx("div", { className: "mt-10 max-w-3xl space-y-10 text-sm leading-relaxed text-muted", children: children })] }));
}
