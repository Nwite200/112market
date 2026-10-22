import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useProductContext } from "../../context/ShopContext"
import { selectFeatured, sortByNewest } from "../../services/sections"
import ProductGrid from "../products/ProductGrid"
import SectionHeading from "../ui/SectionHeading"

/**
 * Homepage rail for products flagged as featured in the catalogue.
 * Reads from the product context so it shows loading skeletons while the
 * catalogue is being fetched.
 */
export default function FeaturedProducts() {
  const { products, loading } = useProductContext()
  const featured = selectFeatured(products)

  if (!loading && !featured.length) return null

  return (
    <section className="section bg-brand-50">
      <div className="container-page">
        <SectionHeading
          eyebrow="Featured this week"
          title="Hand-picked stock from our depot"
          description="Items our team has inspected and photographed recently. Stock counts shown are live."
          action={{ label: "Browse all products", to: "/products" }}
        />

        <div className="mt-10">
          <ProductGrid products={featured.slice(0, 10)} loading={loading} skeletonCount={5} />
        </div>

        <div className="mt-8 flex justify-center">
          <Link to="/products" className="btn-secondary">
            See the full catalogue
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
