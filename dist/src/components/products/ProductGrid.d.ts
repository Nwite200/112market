import type { Product } from "../../types";
interface ProductGridProps {
    products: Product[];
    loading?: boolean;
    /** Number of skeleton cards shown while loading. */
    skeletonCount?: number;
    className?: string;
}
/**
 * Responsive product grid.
 *
 * Two columns on mobile, three on tablets, four on laptops and five on wide
 * desktop screens. Every grid in the store uses this component so the column
 * rhythm stays consistent.
 */
export default function ProductGrid({ products, loading, skeletonCount, className, }: ProductGridProps): import("react").JSX.Element;
export {};
