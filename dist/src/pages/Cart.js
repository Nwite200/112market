import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Cart from "../components/cart/Cart";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import Breadcrumbs from "../components/ui/Breadcrumbs";
export default function CartPage() {
    useDocumentMeta({
        title: "Your cart",
        description: "Review the items in your 112 Market cart before checkout.",
        canonical: "/cart",
    });
    return (_jsxs("div", { className: "container-page py-8 lg:py-12", children: [_jsx(Breadcrumbs, { items: [{ label: "Home", to: "/" }, { label: "Cart" }] }), _jsxs("header", { className: "mb-8", children: [_jsx("h1", { className: "text-display-sm font-extrabold text-ink", children: "Your cart" }), _jsx("p", { className: "mt-2 text-base text-muted", children: "Review your items and the estimated total before you continue." })] }), _jsx(Cart, {})] }));
}
