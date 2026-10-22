import type { Product } from "../../types"
import ProductCard from "./ProductCard"
import ProductCardSkeleton from "./ProductCardSkeleton"

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  /** Number of skeleton cards shown while loading. */
  skeletonCount?: number
  className?: string
}

/**
 * Responsive product grid.
 *
 * Two columns on mobile, three on tablets, four on laptops and five on wide
 * desktop screens. Every grid in the store uses this component so the column
 * rhythm stays consistent.
 */
export default function ProductGrid({
  products,
  loading = false,
  skeletonCount = 8,
  className = "",
}: ProductGridProps) {
  if (loading) {
    return (
      <div
        className={`grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${className}`}
        aria-busy="true"
        aria-live="polite"
      >
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div
      className={`grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${className}`}
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 5} />
      ))}
    </div>
  )
}
