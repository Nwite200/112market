import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Loading placeholder that mirrors the product card layout. */
export default function ProductCardSkeleton() {
    return (_jsxs("div", { className: "flex h-full flex-col overflow-hidden rounded-xl2 border border-line bg-surface", children: [_jsx("div", { className: "skeleton aspect-[4/5] w-full" }), _jsxs("div", { className: "flex flex-1 flex-col p-4", children: [_jsx("div", { className: "skeleton h-3 w-16 rounded" }), _jsx("div", { className: "skeleton mt-3 h-4 w-full rounded" }), _jsx("div", { className: "skeleton mt-2 h-4 w-2/3 rounded" }), _jsx("div", { className: "skeleton mt-4 h-3 w-24 rounded" }), _jsx("div", { className: "skeleton mt-3 h-6 w-20 rounded" }), _jsx("div", { className: "skeleton mt-4 h-9 w-full rounded-full" })] })] }));
}
