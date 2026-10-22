import { Link } from "react-router-dom"
import { Compass } from "lucide-react"
import { useDocumentMeta } from "../hooks/useDocumentMeta"
import { getAllCategories } from "../services/sections"

export default function NotFound() {
  useDocumentMeta({
    title: "Page not found",
    description: "The page you are looking for could not be found.",
  })

  const categories = getAllCategories()

  return (
    <div className="container-page flex flex-col items-center py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
        <Compass className="h-6 w-6" aria-hidden="true" />
      </span>
      <h1 className="mt-6 text-display-sm font-extrabold text-ink">We could not find that page</h1>
      <p className="mt-3 max-w-md text-base text-muted">
        The link may be out of date, or the item may have sold. Try the catalogue or one of the
        categories below.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          Back to home
        </Link>
        <Link to="/products" className="btn-secondary">
          Browse all products
        </Link>
      </div>

      <ul className="mt-10 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              to={`/category/${category.slug}`}
              className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              {category.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
