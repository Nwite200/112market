import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatPrice, getConditionGradeLabel, getStockWarning } from "../../services/sections";
import { useRouter } from "react-router-dom";
import { useAddToCart } from "../../hooks/useAddToCart";
export function ProductCard({ product }) {
    const router = useRouter();
    const { addToCart } = useAddToCart();
    const isInStock = product.stockQuantity > 0;
    const conditionLabel = getConditionGradeLabel(product.conditionGrade);
    const formattedPrice = formatPrice(product.price, product.currency);
    const stockWarning = getStockWarning(product);
    return (_jsxs("article", { className: "group border rounded-lg overflow-hidden hover:shadow-sm transition-shadow duration-200", style: { maxWidth: "280px" }, children: [_jsx("div", { className: "aspect-w-16 aspect-h-24 bg-muted flex items-center justify-center", children: _jsx("img", { src: product.images[0], alt: product.name, className: "object-cover w-full h-full", style: { height: "180px" } }) }), _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "text-sm font-medium line-clamp-2", children: product.name }), _jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: product.description || "Quality used item from UK" }), _jsx("div", { className: "mt-2 flex items-center gap-1 text-xs", children: _jsx("span", { className: `badge badge-ghost`, children: conditionLabel }) }), _jsxs("div", { className: "mt-3 flex items-baseline gap-1", children: [_jsx("span", { className: "text-lg font-bold text-primary", children: formattedPrice }), product.originalPrice && (_jsx("smalL", { className: "line-through text-muted-foreground", children: formatPrice(product.originalPrice, product.currency) }))] }), stockWarning && (_jsx("p", { className: "mt-2 text-xs text-warning", children: stockWarning })), _jsx("button", { onClick: (e) => {
                            e.preventDefault();
                            addToCart(product);
                            router.push(`/cart`);
                        }, className: "mt-3 w-full rounded border-primary px-3 py-2 text-sm font-medium hover:bg-primary/10 transition-colors", children: "Add to Cart" })] })] }));
}
