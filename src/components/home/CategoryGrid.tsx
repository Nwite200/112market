import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { getAllCategories } from "../../services/sections"
import SectionHeading from "../ui/SectionHeading"

/** Visual category cards that link straight to the filtered catalogue. */
export default function CategoryGrid() {
  const categories = getAllCategories()

  return (
    <section id="categories" className="section scroll-mt-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Shop by category"
          title="Find the room, appliance or device you need"
          description="Every category below is backed by stock we have graded and photographed. Pick one to see what is available right now."
        />

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-xl2 border border-line bg-brand-50 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="media aspect-[4/3] w-full">
                <img
                  src={category.image}
                  alt={category.label}
                  loading="lazy"
                  decoding="async"
                  className="group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/85 via-brand-900/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-sm font-bold text-white">{category.label}</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-white/80">
                  {category.count} item{category.count === 1 ? "" : "s"}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
