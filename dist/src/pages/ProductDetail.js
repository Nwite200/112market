import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BadgeCheck, ClipboardList, Info, MapPin, Package, ShieldCheck, Truck, } from "lucide-react";
import { useProductContext } from "../context/ShopContext";
import { useAddToCart } from "../hooks/useAddToCart";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { formatPrice, getAvailability, getConditionGradeLabel, getDiscountPercent, } from "../services/sections";
import ProductGallery from "../components/products/ProductGallery";
import VariantSelector, { findVariant, isSelectionComplete } from "../components/products/VariantSelector";
import QuantitySelector from "../components/products/QuantitySelector";
import ConditionBadge from "../components/ui/ConditionBadge";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import EmptyState from "../components/ui/EmptyState";
const CONDITION_LABEL = {
    A: "https://schema.org/NewCondition",
    B: "https://schema.org/UsedCondition",
    C: "https://schema.org/UsedCondition",
};
export default function ProductDetail() {
    const { slug = "" } = useParams();
    const { products, loading, error } = useProductContext();
    const { addToCart, isAdded } = useAddToCart();
    const [quantity, setQuantity] = useState(1);
    const [selection, setSelection] = useState({});
    const product = useMemo(() => products.find((item) => item.slug === slug), [products, slug]);
    useEffect(() => {
        setQuantity(1);
        setSelection({});
    }, [slug]);
    const variant = useMemo(() => (product ? findVariant(product, selection) : undefined), [product, selection]);
    const price = variant?.price ?? product?.price ?? 0;
    const originalPrice = variant?.originalPrice ?? product?.originalPrice;
    const currency = product?.currency ?? "NGN";
    const stock = variant?.stockQuantity ?? product?.stockQuantity ?? 0;
    const images = useMemo(() => {
        if (!product)
            return [];
        if (product.imageAssets?.length) {
            return [...product.imageAssets]
                .sort((a, b) => a.position - b.position)
                .map((asset) => ({ id: asset.id, url: asset.url, alt: asset.alt }));
        }
        return product.images.map((url, index) => ({
            id: `${product.id}-${index}`,
            url,
            alt: `${product.name} — photo ${index + 1}`,
        }));
    }, [product]);
    const effectiveImages = useMemo(() => {
        if (variant?.images?.length) {
            return [
                { id: `${variant.id}-primary`, url: variant.images[0], alt: `${product?.name} — ${variant.name ?? "selected option"}` },
                ...images.filter((image) => image.url !== variant.images[0]),
            ];
        }
        return images;
    }, [variant, images, product]);
    useDocumentMeta({
        title: product ? product.name : "Product",
        description: product
            ? product.description.slice(0, 155)
            : "Graded second-hand household items from 112 Market.",
        image: effectiveImages[0]?.url,
        canonical: product ? `/product/${product.slug}` : undefined,
        type: "product",
    });
    useEffect(() => {
        if (!product)
            return;
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: product.images,
            sku: product.sku,
            brand: { "@type": "Brand", name: product.brand },
            category: product.category,
            itemCondition: CONDITION_LABEL[product.conditionGrade],
            offers: {
                "@type": "Offer",
                price,
                priceCurrency: currency,
                availability: stock > 0
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
                itemCondition: CONDITION_LABEL[product.conditionGrade],
                seller: { "@type": "Organization", name: "112 Market" },
            },
        };
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(structuredData);
        script.dataset.productSchema = product.id;
        document.head.appendChild(script);
        return () => {
            script.remove();
        };
    }, [product, price, currency, stock]);
    if (loading) {
        return (_jsx("div", { className: "container-page py-12", "aria-busy": "true", children: _jsxs("div", { className: "grid gap-10 lg:grid-cols-2", children: [_jsx("div", { className: "skeleton aspect-square w-full rounded-xl2" }), _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "skeleton h-4 w-24 rounded" }), _jsx("div", { className: "skeleton h-10 w-full rounded" }), _jsx("div", { className: "skeleton h-6 w-40 rounded" }), _jsx("div", { className: "skeleton h-24 w-full rounded" })] })] }) }));
    }
    if (error) {
        return (_jsx("div", { className: "container-page py-16", children: _jsx(EmptyState, { title: "We could not load this product", description: error, action: _jsx(Link, { to: "/products", className: "btn-primary btn-sm", children: "Back to products" }) }) }));
    }
    if (!product) {
        return (_jsx("div", { className: "container-page py-16", children: _jsx(EmptyState, { title: "Product not found", description: "This item may have sold or been removed from the catalogue.", action: _jsx(Link, { to: "/products", className: "btn-primary btn-sm", children: "Browse all products" }) }) }));
    }
    const availability = getAvailability(product);
    const discount = getDiscountPercent({ ...product, price });
    const soldOut = availability.tone === "out-of-stock" && stock <= 0;
    const requiresVariant = Boolean(product.variantOptions?.length) && !isSelectionComplete(product, selection);
    const added = isAdded(product, variant?.id);
    return (_jsxs("div", { className: "container-page py-8 lg:py-12", children: [_jsx(Breadcrumbs, { items: [
                    { label: "Home", to: "/" },
                    { label: "All products", to: "/products" },
                    { label: product.category, to: `/category/${product.categorySlug}` },
                    { label: product.name },
                ] }), _jsxs("div", { className: "grid gap-10 lg:grid-cols-2 lg:gap-14", children: [_jsx(ProductGallery, { images: effectiveImages, productName: product.name, overlay: _jsx(ConditionBadge, { grade: product.conditionGrade }) }), _jsxs("div", { children: [_jsx("p", { className: "eyebrow", children: product.brand }), _jsx("h1", { className: "mt-2 text-display-sm font-extrabold text-ink", children: product.name }), _jsxs("div", { className: "mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1", children: [_jsx("span", { className: "text-3xl font-extrabold tracking-tight text-ink", children: formatPrice(price, currency) }), originalPrice && originalPrice > price && (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-base font-medium text-muted line-through", children: formatPrice(originalPrice, currency) }), discount !== null && (_jsxs("span", { className: "rounded-full bg-accent-100 px-2.5 py-1 text-xs font-bold text-accent-800", children: ["Save ", discount, "%"] }))] }))] }), _jsxs("p", { className: "mt-2 text-sm text-muted", children: ["Condition:", " ", _jsx("span", { className: "font-semibold text-ink", children: getConditionGradeLabel(product.conditionGrade) }), product.warrantyDays > 0 ? ` · ${product.warrantyDays}-day warranty` : ""] }), _jsx("p", { className: "mt-4 leading-relaxed text-muted", children: product.description }), product.variantOptions?.length ? (_jsx("div", { className: "mt-7", children: _jsx(VariantSelector, { product: product, selection: selection, onChange: (optionId, valueId) => setSelection((current) => ({ ...current, [optionId]: valueId })) }) })) : null, _jsxs("div", { className: "mt-7 flex flex-wrap items-center gap-4", children: [_jsx(QuantitySelector, { value: quantity, onChange: setQuantity, max: Math.max(1, stock || 99), disabled: soldOut }), _jsx("button", { type: "button", onClick: () => addToCart(product, quantity, variant?.id), disabled: soldOut || requiresVariant, className: `btn btn-lg flex-1 sm:flex-none ${added ? "bg-success text-white hover:bg-success" : "btn-primary"}`, children: soldOut
                                            ? "Out of stock"
                                            : requiresVariant
                                                ? "Choose an option"
                                                : added
                                                    ? "Added to cart"
                                                    : "Add to cart" })] }), soldOut ? (_jsx("p", { className: "mt-3 text-sm font-semibold text-danger", children: "This item is currently out of stock. Check back \u2014 new stock arrives regularly." })) : null, _jsxs("dl", { className: "mt-8 grid gap-3 rounded-xl2 border border-line bg-white p-5 sm:grid-cols-2", children: [_jsxs("div", { className: "flex items-start gap-2.5", children: [_jsx(Package, { className: "mt-0.5 h-4 w-4 shrink-0 text-brand-700", "aria-hidden": "true" }), _jsxs("div", { children: [_jsx("dt", { className: "text-xs font-bold uppercase tracking-wide text-muted", children: "Stock" }), _jsx("dd", { className: "text-sm font-semibold text-ink", children: stock > 0 ? `${stock} available` : "Out of stock" })] })] }), _jsxs("div", { className: "flex items-start gap-2.5", children: [_jsx(Truck, { className: "mt-0.5 h-4 w-4 shrink-0 text-brand-700", "aria-hidden": "true" }), _jsxs("div", { children: [_jsx("dt", { className: "text-xs font-bold uppercase tracking-wide text-muted", children: "Dispatch" }), _jsxs("dd", { className: "text-sm font-semibold text-ink", children: [product.dispatchLocation, product.dispatchEta ? ` · ${product.dispatchEta}` : ""] })] })] }), _jsxs("div", { className: "flex items-start gap-2.5", children: [_jsx(ShieldCheck, { className: "mt-0.5 h-4 w-4 shrink-0 text-brand-700", "aria-hidden": "true" }), _jsxs("div", { children: [_jsx("dt", { className: "text-xs font-bold uppercase tracking-wide text-muted", children: "Guarantee" }), _jsxs("dd", { className: "text-sm font-semibold text-ink", children: [product.warrantyDays, "-day testing guarantee"] })] })] }), _jsxs("div", { className: "flex items-start gap-2.5", children: [_jsx(BadgeCheck, { className: "mt-0.5 h-4 w-4 shrink-0 text-brand-700", "aria-hidden": "true" }), _jsxs("div", { children: [_jsx("dt", { className: "text-xs font-bold uppercase tracking-wide text-muted", children: "Reference" }), _jsx("dd", { className: "text-sm font-semibold text-ink", children: product.sku })] })] })] }), product.estimatedArrival ? (_jsxs("p", { className: "mt-3 flex items-start gap-2 rounded-xl2 bg-brand-50 p-4 text-sm text-ink", children: [_jsx(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-brand-700", "aria-hidden": "true" }), product.estimatedArrival] })) : null, _jsxs("div", { className: "mt-8 grid gap-6 sm:grid-cols-2", children: [_jsxs("section", { children: [_jsxs("h2", { className: "flex items-center gap-2 text-sm font-bold text-ink", children: [_jsx(ClipboardList, { className: "h-4 w-4 text-brand-700", "aria-hidden": "true" }), "Specifications"] }), _jsx("ul", { className: "mt-3 space-y-1.5 text-sm text-muted", children: product.specifications.map((spec) => (_jsxs("li", { className: "flex gap-2", children: [_jsx("span", { className: "text-brand-700", "aria-hidden": "true", children: "\u2022" }), spec] }, spec))) })] }), _jsxs("section", { children: [_jsxs("h2", { className: "flex items-center gap-2 text-sm font-bold text-ink", children: [_jsx(Info, { className: "h-4 w-4 text-brand-700", "aria-hidden": "true" }), "What's included"] }), _jsx("ul", { className: "mt-3 space-y-1.5 text-sm text-muted", children: product.accessories.map((accessory) => (_jsxs("li", { className: "flex gap-2", children: [_jsx("span", { className: "text-brand-700", "aria-hidden": "true", children: "\u2022" }), accessory] }, accessory))) }), product.meta?.length ? (_jsx("ul", { className: "mt-4 space-y-1.5 text-sm text-muted", children: product.meta.map((note) => (_jsxs("li", { className: "flex gap-2", children: [_jsx("span", { className: "text-accent-600", "aria-hidden": "true", children: "\u2022" }), note] }, note))) })) : null] })] }), _jsxs(Link, { to: "/products", className: "mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline", children: [_jsx(ArrowLeft, { className: "h-4 w-4", "aria-hidden": "true" }), "Back to all products"] })] })] })] }));
}
