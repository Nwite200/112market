import { Link } from "react-router-dom"
import { Tag } from "lucide-react"
import { getDiscountPercent, getPromotionalProducts } from "../../services/sections"
import ProductGrid from "../products/ProductGrid"
import SectionHeading from "../ui/SectionHeading"

/**
 * Markdown rail. Rendered only when the catalogue actually contains items
 * priced below their recorded original price.
 */
export default function Promotions() {
  const promotional = getPromotionalProducts()
    .map((product) => ({ product, discount: getDiscountPercent(product) ?? 0 }))
    .sort((a, b) => b.discount - a.discount)

  if (!promotional.length) return null

  return (
    <section className="section bg-brand-50">
      <div className="container-page">
        <SectionHeading
          eyebrow="Price markdowns"
          title="Graded stock, marked down"
          description="A selection of items priced below their original UK pricing. The crossed-out figure on each card is the original price recorded for that item."
          action={{ label: "See all markdowns", to: "/products?sort=price-asc" }}
        />

        <div className="mt-10">
          <ProductGrid products={promotional.slice(0, 10).map((entry) => entry.product)} />
        </div>

        <div className="mt-8 flex justify-center">
          <Link to="/products" className="btn-secondary">
            <Tag className="h-4 w-4" aria-hidden="true" />
            Browse the full catalogue
          </Link>
        </div>
      </div>
    </section>
  )
}
