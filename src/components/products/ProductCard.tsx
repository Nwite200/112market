import { Link } from "react-router-dom"
import { Check, Plus } from "lucide-react"
import type { Product } from "../../types"
import { imageSrcSet, imageUrl } from "../../data/images"
import {
  formatPrice,
  getAvailability,
  getDiscountPercent,
} from "../../services/sections"
import { useAddToCart } from "../../hooks/useAddToCart"
import ConditionBadge from "../ui/ConditionBadge"
import AvailabilityPill from "../ui/AvailabilityPill"

interface ProductCardProps {
  product: Product
  /** Optional class for grid-specific tweaks. */
  className?: string
  /** Priority-load the image (used by the first row of a grid). */
  priority?: boolean
}

/**
 * The shared product card used by the homepage, category pages, search
 * results and related-product rails. Every card uses the same structure so
 * grids stay aligned regardless of title length.
 */
export function ProductCard({ product, className = "", priority = false }: ProductCardProps) {
  const { addToCart, isAdded } = useAddToCart()

  const availability = getAvailability(product)
  const discount = getDiscountPercent(product)
  const added = isAdded(product)
  const soldOut = availability.tone === "out-of-stock"
  const image = product.images?.[0]

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-xl2 border border-line bg-surface transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift focus-within:border-brand-300 ${className}`}
    >
      <div className="media aspect-[4/5] w-full">
        <Link
          to={`/product/${product.slug}`}
          className="block h-full w-full"
          tabIndex={-1}
          aria-hidden="true"
        >
          {image ? (
            <img
              src={imageUrl(image, 600)}
              srcSet={imageSrcSet(image, [320, 480, 600])}
              sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 45vw"
              alt={product.name}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              className="group-hover:scale-[1.06]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-brand-50 text-xs text-muted">
              No image
            </div>
          )}
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          <ConditionBadge grade={product.conditionGrade} />
          {availability.tone === "preorder" && (
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-brand-700 ring-1 ring-brand-200">
              Pre-order
            </span>
          )}
        </div>

        {discount !== null && (
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-accent-500 px-2.5 py-1 text-[0.7rem] font-bold text-brand-900 shadow-soft">
            −{discount}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-brand-700">
          {product.brand}
        </p>

        <h3 className="mt-1.5 min-h-[2.5rem] text-sm font-semibold leading-snug text-ink">
          <Link
            to={`/product/${product.slug}`}
            className="line-clamp-2 transition-colors hover:text-brand-700"
          >
            {product.name}
          </Link>
        </h3>

        <AvailabilityPill availability={availability} className="mt-2" />

        <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-lg font-extrabold tracking-tight text-ink">
            {formatPrice(product.price, product.currency)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs font-medium text-muted line-through">
              {formatPrice(product.originalPrice, product.currency)}
            </span>
          )}
        </div>

        <div className="mt-4 pt-1">
          <button
            type="button"
            onClick={() => addToCart(product)}
            disabled={soldOut}
            aria-label={
              soldOut
                ? `${product.name} is out of stock`
                : `Add ${product.name} to cart`
            }
            className={`btn btn-sm w-full ${
              added
                ? "bg-success text-white hover:bg-success"
                : soldOut
                  ? "bg-stone-100 text-muted ring-1 ring-line"
                  : "btn-primary"
            }`}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                Added
              </>
            ) : soldOut ? (
              "Out of stock"
            ) : (
              <>
                <Plus className="h-4 w-4" aria-hidden="true" />
                Add to cart
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
