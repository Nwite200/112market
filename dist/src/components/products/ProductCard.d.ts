import type { Product } from "../../types";
interface ProductCardProps {
    product: Product;
    /** Optional class for grid-specific tweaks. */
    className?: string;
    /** Priority-load the image (used by the first row of a grid). */
    priority?: boolean;
}
/**
 * The shared product card used by the homepage, category pages, search
 * results and related-product rails. Every card uses the same structure so
 * grids stay aligned regardless of title length.
 */
export declare function ProductCard({ product, className, priority }: ProductCardProps): import("react").JSX.Element;
export default ProductCard;
