import type { Product, ProductVariant } from "../../types";
/** Find the variant that matches the current option selection. */
export declare const findVariant: (product: Product, selection: Record<string, string>) => ProductVariant | undefined;
/** True when every option has a value chosen. */
export declare const isSelectionComplete: (product: Product, selection: Record<string, string>) => boolean;
interface VariantSelectorProps {
    product: Product;
    selection: Record<string, string>;
    onChange: (optionId: string, valueId: string) => void;
}
/**
 * Variant picker. Renders only when the product genuinely carries variant
 * options — no fake colour or size choices are ever created.
 */
export default function VariantSelector({ product, selection, onChange, }: VariantSelectorProps): import("react").JSX.Element | null;
export {};
