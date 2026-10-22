import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Find the variant that matches the current option selection. */
export const findVariant = (product, selection) => {
    if (!product.variants?.length)
        return undefined;
    return product.variants.find((variant) => Object.entries(selection).every(([optionId, valueId]) => variant.optionValues[optionId] === valueId));
};
/** True when every option has a value chosen. */
export const isSelectionComplete = (product, selection) => Boolean(product.variantOptions?.length) &&
    product.variantOptions.every((option) => Boolean(selection[option.id]));
/**
 * Variant picker. Renders only when the product genuinely carries variant
 * options — no fake colour or size choices are ever created.
 */
export default function VariantSelector({ product, selection, onChange, }) {
    if (!product.variantOptions?.length)
        return null;
    return (_jsx("div", { className: "space-y-5", children: product.variantOptions.map((option) => {
            const selectedValue = selection[option.id];
            return (_jsxs("fieldset", { children: [_jsxs("legend", { className: "mb-2 text-sm font-semibold text-ink", children: [option.name, selectedValue ? (_jsx("span", { className: "ml-2 font-normal text-muted", children: option.values.find((value) => value.id === selectedValue)?.label })) : null] }), _jsx("div", { className: "flex flex-wrap gap-2", children: option.values.map((value) => {
                            const isSelected = selectedValue === value.id;
                            return (_jsxs("button", { type: "button", onClick: () => onChange(option.id, value.id), "aria-pressed": isSelected, className: `flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors ${isSelected
                                    ? "border-brand-700 bg-brand-50 text-brand-800"
                                    : "border-line bg-white text-ink hover:border-brand-300"}`, children: [value.color ? (_jsx("span", { className: "h-4 w-4 rounded-full ring-1 ring-black/10", style: { backgroundColor: value.color }, "aria-hidden": "true" })) : null, value.label] }, value.id));
                        }) })] }, option.id));
        }) }));
}
