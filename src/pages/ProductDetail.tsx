import React from "react"
import { useParams } from "react-router-dom"
import { useProductContext } from "../context/ShopContext"
import { useFilterContext } from "../context/ShopContext"
import { productRepository } from "../services/catalogImpl"
import { formatPrice, getConditionGradeLabel, getStockWarning } from "../services/sections"
import { useAddToCart } from "../hooks/useAddToCart"

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { products, loading } = useProductContext()
  const { setFilters } = useFilterContext()
  const { addToCart } = useAddToCart()

  React.useEffect(() => {
    if (slug) {
      productRepository.getProductBySlug(slug).then(() => {})
    }
  }, [slug])

  const product =
    products?.find((p) => p.slug === slug) || products?.[0]

  if (!product && loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto my-6"></div>
        <p className="text-muted-foreground">Loading product detail...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background p-6">
        <p className="text-xl text-error">Product not found</p>
      </div>
    )
  }

  const conditionLabel = getConditionGradeLabel(product.conditionGrade)
  const formattedPrice = formatPrice(product.price, product.currency)
  const stockWarning = getStockWarning(product)

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="space-y-3">
              {product.imageAssets?.map((image, idx) => (
                <img
                  key={image.id}
                  src={image.url}
                  alt={image.alt || product.name}
                  className="object-cover rounded w-full h-64 md:h-[400px]"
                />
              ))}
              {product.images.length > 0 && product.imageAssets?.length === 0 && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="object-cover rounded w-full h-64 md:h-[400px]"
                />
              )}
            </div>

            {/* Thumbnail gallery */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {product.images?.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt={`${product.name} - thumbnail ${idx + 1}`}
                  className="cursor-pointer border rounded opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ height: 80, objectFit: "cover" }}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-text mb-2">
              {product.name}
            </h1>
            <p className="text-muted-foreground mb-4">{product.description || "Quality used item from UK"}</p>

            {/* Condition and Price */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Condition</p>
                <p className="text-lg font-medium {
                  product.conditionGrade === "A"
                    ? "text-primary"
                  : product.conditionGrade === "B"
                    ? "text-primary"
                    : "text-warning"
                }">
                  {conditionLabel}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-2xl font-bold">
                  {formattedPrice}
                </p>
              </div>
            </div>

            {/* Stock status */}
            {stockWarning && (
              <div className="mb-6 p-3 rounded bg-warning/10">
                <p className="text-sm text-warning">{stockWarning}</p>
              </div>
            )}

            {/* Specifications */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground font-medium mb-2">Specifications</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className="p-2 rounded border border-border">
                    <span className="font-medium text-muted-foreground">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div>
              <button
                onClick={() => addToCart(product)}
                className="w-full rounded border-primary px-4 py-3 text-sm font-medium hover:bg-primary/10 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
