import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, Home, PackageSearch, Truck } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
const steps = [
    {
        icon: Home,
        title: "Sourced in the United Kingdom",
        body: "We clear furniture, appliances, electronics and tools from UK households, workspaces and clearances.",
    },
    {
        icon: PackageSearch,
        title: "Graded and described",
        body: "Each item is graded A, B or C, photographed, and described with its condition, specifications and what is included.",
    },
    {
        icon: Container,
        title: "Shipped to our Lagos depot",
        body: "Stock arrives in Nigeria on our own containers and is checked, tested and stored at our Shasha depot.",
    },
    {
        icon: Truck,
        title: "Dispatched your way",
        body: "Depot dispatch for items already in Lagos, or a container shipment for items still in transit from the UK.",
    },
];
/** The real UK-to-Nigeria fulfilment sequence. */
export default function ProcessSteps() {
    return (_jsx("section", { className: "section bg-brand-50", children: _jsxs("div", { className: "container-page", children: [_jsx(SectionHeading, { eyebrow: "How it works", title: "From a UK home to your Lagos doorstep", description: "Four steps, and you can follow them on every listing we publish." }), _jsx("ol", { className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: steps.map(({ icon: Icon, title, body }, index) => (_jsxs("li", { className: "relative rounded-xl2 border border-line bg-brand-50 p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-brand-700 text-white", children: _jsx(Icon, { className: "h-5 w-5", "aria-hidden": "true" }) }), _jsxs("span", { className: "font-display text-3xl font-extrabold text-brand-100", children: ["0", index + 1] })] }), _jsx("h3", { className: "mt-4 text-base font-bold text-ink", children: title }), _jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted", children: body })] }, title))) })] }) }));
}
