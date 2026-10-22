import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ChevronDown, MapPin } from "lucide-react";
import { BUSINESS, BUSINESS_ADDRESS_LINES } from "../data/business";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import PolicyLayout from "../components/ui/PolicyLayout";
const faqs = [
    {
        q: "How do I check the condition of an item?",
        a: "Every product page shows the condition grade, a written description, the specifications, what is included in the box and the live stock count. Where a photo does not make something obvious, the description spells it out.",
    },
    {
        q: "What do the grades mean?",
        a: "Grade A is like new, Grade B has minor signs of use, and Grade C is our value tier with visible wear. The grade and the warranty window recorded against each item appear together on the product page.",
    },
    {
        q: "How will my order reach me?",
        a: "Items already in Nigeria are dispatched from our Lagos depot. Items still in the United Kingdom travel on our containers and the listing shows the estimated arrival. The delivery cost itself is confirmed with you before any payment is taken.",
    },
    {
        q: "Can I pay online?",
        a: "Not yet — online payment has not been switched on for this storefront. You can reserve items at the depot and we will confirm the delivery cost with you there.",
    },
    {
        q: "Can I collect instead of having it delivered?",
        a: "Yes. You can collect from our Lagos depot at the address below during the testing window recorded on your item.",
    },
    {
        q: "How do I return or exchange an item?",
        a: "Each listing records a testing-guarantee window. If an item fails within that window, bring it to the depot with your order reference and we will assess it at the counter. The window shown on the product page is the one that applies.",
    },
];
export default function Support() {
    useDocumentMeta({
        title: "Help & support",
        description: "Answers about condition grades, delivery routes, payment and returns from the 112 Market team in Lagos.",
        canonical: "/support",
    });
    return (_jsxs(PolicyLayout, { title: "Help & support", intro: "Answers to the questions we are asked most, plus the details for reaching our Lagos depot.", breadcrumbs: [{ label: "Home", to: "/" }, { label: "Help & support" }], children: [_jsxs("section", { children: [_jsx("h2", { className: "text-lg font-bold text-ink", children: "Visit the depot" }), _jsxs("address", { className: "mt-3 flex items-start gap-2 not-italic", children: [_jsx(MapPin, { className: "mt-1 h-4 w-4 shrink-0 text-brand-700", "aria-hidden": "true" }), _jsxs("span", { children: [_jsx("span", { className: "block font-semibold text-ink", children: BUSINESS.name }), BUSINESS_ADDRESS_LINES.map((line) => (_jsx("span", { className: "block", children: line }, line)))] })] }), _jsx("p", { className: "mt-3", children: "Phone and email details are published here once they are confirmed by the business, so that you always reach us on a verified channel." })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-lg font-bold text-ink", children: "Frequently asked questions" }), _jsx("div", { className: "mt-4 divide-y divide-line overflow-hidden rounded-xl2 border border-line bg-white", children: faqs.map((faq) => (_jsxs("details", { className: "group bg-white", children: [_jsxs("summary", { className: "flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-ink transition-colors hover:text-brand-700", children: [_jsx("span", { children: faq.q }), _jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180", "aria-hidden": "true" })] }), _jsx("p", { className: "px-5 pb-5 text-sm leading-relaxed text-muted", children: faq.a })] }, faq.q))) })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-lg font-bold text-ink", children: "More information" }), _jsxs("ul", { className: "mt-3 space-y-2", children: [_jsx("li", { children: _jsx(Link, { to: "/delivery-returns", className: "font-semibold text-brand-700 hover:underline", children: "Delivery & returns" }) }), _jsx("li", { children: _jsx(Link, { to: "/about", className: "font-semibold text-brand-700 hover:underline", children: "About 112 Market" }) }), _jsx("li", { children: _jsx(Link, { to: "/terms", className: "font-semibold text-brand-700 hover:underline", children: "Terms of sale" }) }), _jsx("li", { children: _jsx(Link, { to: "/privacy", className: "font-semibold text-brand-700 hover:underline", children: "Privacy policy" }) })] })] })] }));
}
