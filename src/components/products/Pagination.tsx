import { ChevronLeft, ChevronRight } from "lucide-react"

/** Accessible pagination for catalogue listings. */
export default function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number
  pageCount: number
  onChange: (page: number) => void
}) {
  if (pageCount <= 1) return null

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)

  return (
    <nav aria-label="Pagination" className="mt-12 flex justify-center">
      <ul className="flex flex-wrap items-center gap-1.5">
        <li>
          <button
            type="button"
            onClick={() => onChange(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white text-ink transition-colors hover:border-brand-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
        </li>

        {pages.map((value) => (
          <li key={value}>
            <button
              type="button"
              onClick={() => onChange(value)}
              aria-current={value === page ? "page" : undefined}
              aria-label={`Page ${value}`}
              className={`h-10 min-w-[2.5rem] rounded-lg border px-3 text-sm font-semibold transition-colors ${
                value === page
                  ? "border-brand-700 bg-brand-700 text-white"
                  : "border-line bg-white text-ink hover:border-brand-300"
              }`}
            >
              {value}
            </button>
          </li>
        ))}

        <li>
          <button
            type="button"
            onClick={() => onChange(page + 1)}
            disabled={page >= pageCount}
            aria-label="Next page"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white text-ink transition-colors hover:border-brand-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </li>
      </ul>
    </nav>
  )
}
