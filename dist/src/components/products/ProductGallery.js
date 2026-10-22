import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Expand, X } from "lucide-react";
import { imageSrcSet, imageUrl } from "../../data/images";
/**
 * Product image gallery with clickable thumbnails and a full-screen zoom.
 * Handles broken images with an inline fallback rather than a broken icon.
 */
export default function ProductGallery({ images, productName, overlay, }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [zoomOpen, setZoomOpen] = useState(false);
    const [broken, setBroken] = useState({});
    useEffect(() => {
        setActiveIndex(0);
        setBroken({});
    }, [images]);
    useEffect(() => {
        if (!zoomOpen)
            return;
        const onKeyDown = (event) => {
            if (event.key === "Escape")
                setZoomOpen(false);
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [zoomOpen]);
    const list = images.length
        ? images
        : [{ id: "placeholder", url: "", alt: productName }];
    const active = list[Math.min(activeIndex, list.length - 1)];
    return (_jsxs("div", { children: [_jsxs("div", { className: "relative overflow-hidden rounded-xl2 border border-line bg-white", children: [_jsx("div", { className: "media aspect-square w-full", children: active.url && !broken[active.id] ? (_jsx("img", { src: imageUrl(active.url, 900), srcSet: imageSrcSet(active.url, [480, 720, 900, 1200]), sizes: "(min-width: 1024px) 45vw, 92vw", alt: active.alt || productName, loading: "eager", decoding: "async", className: "object-contain", onError: () => setBroken((state) => ({ ...state, [active.id]: true })) })) : (_jsxs("div", { className: "flex h-full w-full flex-col items-center justify-center gap-2 bg-brand-50 p-6 text-center", children: [_jsx("span", { className: "text-sm font-semibold text-ink", children: "Image unavailable" }), _jsx("span", { className: "text-xs text-muted", children: "This photo could not be loaded. Please contact us for more detail." })] })) }), overlay ? _jsx("div", { className: "absolute left-4 top-4", children: overlay }) : null, active.url && !broken[active.id] && list.length > 1 ? (_jsxs("button", { type: "button", onClick: () => setZoomOpen(true), className: "absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 text-xs font-semibold text-ink shadow-soft ring-1 ring-line transition-colors hover:bg-white", children: [_jsx(Expand, { className: "h-3.5 w-3.5", "aria-hidden": "true" }), "Enlarge"] })) : null] }), list.length > 1 && (_jsx("ul", { className: "mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5", children: list.map((image, index) => (_jsx("li", { children: _jsx("button", { type: "button", onClick: () => setActiveIndex(index), "aria-label": `Show photo ${index + 1} of ${list.length}`, "aria-current": index === activeIndex, className: `block w-full overflow-hidden rounded-xl border-2 transition-colors ${index === activeIndex
                            ? "border-brand-700"
                            : "border-transparent hover:border-brand-200"}`, children: _jsx("span", { className: "media block aspect-square w-full", children: image.url && !broken[image.id] ? (_jsx("img", { src: imageUrl(image.url, 200), alt: image.alt || `${productName} thumbnail ${index + 1}`, loading: "lazy", decoding: "async", className: "object-cover", onError: () => setBroken((state) => ({ ...state, [image.id]: true })) })) : (_jsx("span", { className: "flex h-full w-full items-center justify-center bg-brand-50 text-[0.65rem] text-muted", children: "No photo" })) }) }) }, image.id))) })), zoomOpen && active.url && (_jsxs("div", { className: "fixed inset-0 z-[90] flex items-center justify-center bg-ink/80 p-4", role: "dialog", "aria-modal": "true", "aria-label": `${productName} enlarged photo`, onClick: () => setZoomOpen(false), children: [_jsx("button", { type: "button", onClick: () => setZoomOpen(false), "aria-label": "Close enlarged photo", className: "absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20", children: _jsx(X, { className: "h-5 w-5", "aria-hidden": "true" }) }), _jsx("img", { src: imageUrl(active.url, 1600), alt: active.alt || productName, className: "max-h-[90vh] max-w-full rounded-lg object-contain", onClick: (event) => event.stopPropagation() })] }))] }));
}
