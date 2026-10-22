import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ChevronDown, MapPin } from "lucide-react";
import { BUSINESS_ADDRESS_LINES } from "../../data/business";
import SectionHeading from "../ui/SectionHeading";
const faqs = [
    {
        q: "What do the condition grades mean?",
        a: "Grade A is like new, Grade B has minor signs of use, and Grade C is our value tier with visible wear. The grade for every item is shown on its card and product page, alongside a written description of the condition.",
    },
    {
        q: "Where is 112 Market based?",
        a: `Our depot is at ${BUSINESS_ADDRESS_LINES.join(", ")}. In-stock items are dispatched from there, and it is where you can inspect a piece before you take it home.`,
    },
    {
        q: "How do my items reach Nigeria?",
        a: "There are two routes. Items already in Nigeria are dispatched directly from our Lagos depot. Items still in the United Kingdom travel on our containers, and the listing shows which route applies along with the estimated arrival.",
    },
    {
        q: "Do items come with a guarantee?",
        a: "Yes. Each listing records the warranty window that applies to that item, and appliances and electronics are tested at the depot before they are published. Longer depot protection can be added on top of the standard cover.",
    },
    {
        q: "Are the prices in Naira?",
        a: "All prices on the store are shown in Nigerian Naira (NGN), including the original price on any marked-down item, so you can compare the full picture before you order.",
    },
    {
        q: "What information can I check before buying?",
        a: "Every product page lists the condition grade, description, specifications, what is included in the box, the live stock count, the dispatch location and the warranty window — plus photographs of the actual piece.",
    },
];
/** Support entry point and FAQ block for the homepage. */
export default function SupportFaq() {
    return (_jsx("section", { className: "section bg-brand-50", children: _jsxs("div", { className: "container-page grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14", children: [_jsxs("div", { children: [_jsx(SectionHeading, { eyebrow: "Support & FAQs", title: "Answers before you order", description: "The questions customers ask most often, answered with the same information we publish on every listing." }), _jsx("div", { className: "mt-8 divide-y divide-line overflow-hidden rounded-xl2 border border-line bg-brand-50", children: faqs.map((faq) => (_jsxs("details", { className: "group bg-canvas open:bg-white", children: [_jsxs("summary", { className: "flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-ink transition-colors hover:text-brand-700", children: [_jsx("span", { children: faq.q }), _jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180", "aria-hidden": "true" })] }), _jsx("p", { className: "px-5 pb-5 text-sm leading-relaxed text-muted", children: faq.a })] }, faq.q))) })] }), _jsxs("aside", { className: "h-fit rounded-xl2 border border-line bg-brand-50 p-6", children: [_jsx("h3", { className: "text-base font-bold text-ink", children: "Visit the depot" }), _jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted", children: "Prefer to see the condition yourself? Our Lagos depot is open for collection and inspection during the testing window recorded on each listing." }), _jsxs("address", { className: "mt-5 flex items-start gap-2 not-italic", children: [_jsx(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-brand-700", "aria-hidden": "true" }), _jsx("span", { className: "text-sm text-ink", children: BUSINESS_ADDRESS_LINES.map((line) => (_jsx("span", { className: "block", children: line }, line))) })] }), _jsxs("div", { className: "mt-6 flex flex-col gap-2", children: [_jsx(Link, { to: "/support", className: "btn-primary btn-sm w-full", children: "Get help" }), _jsx(Link, { to: "/delivery-returns", className: "btn-secondary btn-sm w-full", children: "Delivery & returns" })] })] })] }) }));
}
