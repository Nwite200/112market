import { Link, useParams } from "react-router-dom"
import CatalogueView from "../components/products/CatalogueView"
import EmptyState from "../components/ui/EmptyState"
import { getAllCategories, getCategoryBySlug } from "../services/sections"
import { useDocumentMeta } from "../hooks/useDocumentMeta"

export default function Category() {
  const { slug = "" } = useParams<{ slug: string }>()
  const category = getCategoryBySlug(slug)

  useDocumentMeta({
    title: category ? category.label : "Category not found",
    description: category?.description,
    canonical: `/category/${slug}`,
  })

  if (!category) {
    return (
      <div className="container-page py-16">
        <EmptyState
          title="We could not find that category"
          description="The category you are looking for is not part of the current catalogue."
          action={
            <Link to="/products" className="btn-primary btn-sm">
              Browse all products
            </Link>
          }
        />
        <div className="mt-10">
          <h2 className="text-sm font-bold text-ink">Available categories</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {getAllCategories().map((item) => (
              <li key={item.slug}>
                <Link
                  to={`/category/${item.slug}`}
                  className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand-300 hover:text-brand-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <CatalogueView
      title={category.label}
      description={category.description}
      breadcrumbs={[{ label: "Home", to: "/" }, { label: "All products", to: "/products" }, { label: category.label }]}
      categorySlug={category.slug}
    />
  )
}
