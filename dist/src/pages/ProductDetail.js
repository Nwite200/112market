import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ShopContext";
import { useFilterContext } from "../context/ShopContext";
import { productRepository } from "../services/catalogImpl";
import { formatPrice, getConditionGradeLabel, getStockWarning } from "../services/sections";
import { useAddToCart } from "../hooks/useAddToCart";
export default function ProductDetail() {
    const { slug } = useParams();
    const { products, loading } = useProductContext();
    const { setFilters } = useFilterContext();
    const { addToCart } = useAddToCart();
    React.useEffect(() => {
        if (slug) {
            productRepository.getProductBySlug(slug).then(() => { });
        }
    }, [slug]);
    const product = products?.find((p) => p.slug === slug) || products?.[0];
    if (!product && loading) {
        return (_jsxs("div", { className: "min-h-screen bg-background p-6", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 mx-auto my-6" }), _jsx("p", { className: "text-muted-foreground", children: "Loading product detail..." })] }));
    }
    if (!product) {
        return (_jsx("div", { className: "min-h-screen bg-background p-6", children: _jsx("p", { className: "text-xl text-error", children: "Product not found" }) }));
    }
    const conditionLabel = getConditionGradeLabel(product.conditionGrade);
    const formattedPrice = formatPrice(product.price, product.currency);
    const stockWarning = getStockWarning(product);
    return (_jsx("section", { className: "py-12", children: _jsx("div", { className: "max-w-7xl mx-auto px-4", children: _jsxs("div", { className: "grid lg:grid-cols-2 gap-12", children: [_jsxs("div", { children: [_jsxs("div", { className: "space-y-3", children: [product.imageAssets?.map((image, idx) => (_jsx("img", { src: image.url, alt: image.alt || product.name, className: "object-cover rounded w-full h-64 md:h-[400px]" }, image.id))), product.images.length > 0 && product.imageAssets?.length === 0 && (_jsx("img", { src: product.images[0], alt: product.name, className: "object-cover rounded w-full h-64 md:h-[400px]" }))] }), _jsx("div", { className: "mt-4 grid grid-cols-3 gap-2", children: product.images?.map((imgUrl, idx) => (_jsx("img", { src: imgUrl, alt: `${product.name} - thumbnail ${idx + 1}`, className: "cursor-pointer border rounded opacity-50 group-hover:opacity-100 transition-opacity", style: { height: 80, objectFit: "cover" } }, idx))) })] }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-text mb-2", children: product.name }), _jsx("p", { className: "text-muted-foreground mb-4", children: product.description || "Quality used item from UK" }), _jsx("div", { className: "grid grid-cols-2 gap-4 mb-6", children: _jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Condition" }), _jsx("p", { className: "text-lg font-medium {\n                  product.conditionGrade === ", A: true }), "\" ? \"text-primary\" : product.conditionGrade === \"B\" ? \"text-primary\" : \"text-warning\" }\">", conditionLabel] }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Price" }), _jsx("p", { className: "text-2xl font-bold", children: formattedPrice })] })] }), stockWarning && (_jsx("div", { className: "mb-6 p-3 rounded bg-warning/10", children: _jsx("p", { className: "text-sm text-warning", children: stockWarning }) })), _jsxs("div", { className: "mb-6", children: [_jsx("p", { className: "text-sm text-muted-foreground font-medium mb-2", children: "Specifications" }), _jsx("div", { className: "grid grid-cols-2 gap-2 text-sm", children: product.specifications.map((spec, idx) => (_jsx("div", { className: "p-2 rounded border border-border", children: _jsx("span", { className: "font-medium text-muted-foreground", children: spec }) }, idx))) })] }), _jsx("div", { children: _jsx("button", { onClick: () => addToCart(product), className: "w-full rounded border-primary px-4 py-3 text-sm font-medium hover:bg-primary/10 transition-colors", children: "Add to Cart" }) })] }) }) }));
    section >
    ;
}
