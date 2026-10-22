import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

export interface Crumb {
  label: string
  to?: string
}

/** Accessible breadcrumb trail. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="rounded transition-colors hover:text-brand-700 hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "font-semibold text-ink" : undefined} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="h-3.5 w-3.5 text-muted/60" aria-hidden="true" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
