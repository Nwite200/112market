import CatalogueView from "../components/products/CatalogueView"
import { useDocumentMeta } from "../hooks/useDocumentMeta"

export default function Products() {
  useDocumentMeta({
    title: "All products",
    description:
      "Browse the full 112 Market catalogue of graded furniture, kitchen appliances, electronics and tools sourced from UK households.",
    canonical: "/products",
  })

  return (
    <CatalogueView
      title="All products"
      description="Every graded item currently listed, with live stock counts and delivery options. Filter by condition, brand, price or dispatch route."
      breadcrumbs={[{ label: "Home", to: "/" }, { label: "All products" }]}
      showCategories
    />
  )
}
