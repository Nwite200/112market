import React from "react"
import { Product, ConditionGrade } from "../../types"
import { formatPrice, getConditionGradeLabel, getStockWarning } from "../../services/sections"
import { useRouter } from "react-router-dom"
import { useAddToCart } from "../../hooks/useAddToCart"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const { addToCart } = useAddToCart()

  const isInStock = product.stockQuantity > 0
  const conditionLabel = getConditionGradeLabel(product.conditionGrade)
  const formattedPrice = formatPrice(product.price, product.currency)
  const stockWarning = getStockWarning(product)

  return (
    <article className="group border rounded-lg overflow-hidden hover:shadow-sm transition-shadow duration-200" style={{ maxWidth: "280px" }}>
      {/* Image */}
      <div className="aspect-w-16 aspect-h-24 bg-muted flex items-center justify-center">
        <img
          src={product.images[0]}
          alt={product.name}
          className="object-cover w-full h-full"
          style={{ height: "180px" }}
        />
      </div>

      {/* Details */}
      <div className="p-4">
        <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {product.description || "Quality used item from UK"}
        </p>

        {/* Condition */}
        <div className="mt-2 flex items-center gap-1 text-xs">
          <span className={`badge badge-ghost`}>
            {conditionLabel}
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-lg font-bold text-primary">
            {formattedPrice}
          </span>
          {product.originalPrice && (
            <smalL className="line-through text-muted-foreground">
              {formatPrice(product.originalPrice, product.currency)}
            </smalL>
          )}
        </div>

        {/* Stock status */}
        {stockWarning && (
          <p className="mt-2 text-xs text-warning">{stockWarning}</p>
        )}

        {/* Action button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            addToCart(product)
            router.push(`/cart`)
          }}
          className="mt-3 w-full rounded border-primary px-3 py-2 text-sm font-medium hover:bg-primary/10 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </article>
  )
}
