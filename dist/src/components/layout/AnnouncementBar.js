import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Package, ShieldCheck, Truck, X } from "lucide-react";
import { useShippingContext } from "../../context/ShopContext";
const DISMISS_KEY = "112-market-announcement-dismissed";
/**
 * Compact store announcement strip.
 *
 * Everything shown here is derived from live catalogue data (container
 * shipments, depot dispatch, condition grading) — no invented delivery
 * windows or discounts.
 */
export function AnnouncementBar({ message, href }) {
    const { shipments, loading } = useShippingContext();
    const [dismissed, setDismissed] = useState(true);
    useEffect(() => {
        try {
            setDismissed(window.localStorage.getItem(DISMISS_KEY) === "1");
        }
        catch {
            setDismissed(false);
        }
    }, []);
    if (dismissed)
        return null;
    const next = shipments[0];
    const items = message
        ? [{ id: "custom", icon: Package, text: message, href }]
        : [
            next && {
                id: "container",
                icon: Truck,
                text: `Container ${next.containerNumber} from ${next.originPort} arrives in ${next.etaShort}`,
            },
            {
                id: "depot",
                icon: Package,
                text: "In-stock items dispatch from our Lagos depot",
            },
            {
                id: "grades",
                icon: ShieldCheck,
                text: "Every item graded A–C and described before dispatch",
            },
        ].filter(Boolean);
    const dismiss = () => {
        setDismissed(true);
        try {
            window.localStorage.setItem(DISMISS_KEY, "1");
        }
        catch {
            // Storage unavailable — the bar simply reappears on the next visit.
        }
    };
    return (_jsx("div", { className: "relative z-40 border-b border-line bg-brand-900 text-white", children: _jsxs("div", { className: "container-page flex items-center gap-4 py-2", children: [_jsx("div", { className: "no-scrollbar flex flex-1 items-center gap-6 overflow-x-auto text-xs sm:text-[0.8rem]", children: loading && !items.length ? (_jsx("span", { className: "text-white/70", children: "Loading store announcements\u2026" })) : (items.map((item) => {
                        const Icon = item.icon;
                        const body = (_jsxs("span", { className: "flex shrink-0 items-center gap-2", children: [_jsx(Icon, { className: "h-3.5 w-3.5 text-accent-300", "aria-hidden": "true" }), item.text] }));
                        return item.href ? (_jsx("a", { href: item.href, className: "rounded underline-offset-4 hover:underline", target: "_blank", rel: "noreferrer", children: body }, item.id)) : (_jsx("span", { children: body }, item.id));
                    })) }), _jsx("button", { type: "button", onClick: dismiss, "aria-label": "Dismiss announcements", className: "-mr-1 rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white", children: _jsx(X, { className: "h-4 w-4", "aria-hidden": "true" }) })] }) }));
}
export default AnnouncementBar;
