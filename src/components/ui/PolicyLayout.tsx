import type { ReactNode } from "react"
import Breadcrumbs, { type Crumb } from "./Breadcrumbs"

/** Shared layout for the informational pages (about, policies, support). */
export default function PolicyLayout({
  title,
  intro,
  breadcrumbs,
  children,
}: {
  title: string
  intro?: string
  breadcrumbs: Crumb[]
  children: ReactNode
}) {
  return (
    <div className="container-page py-8 lg:py-12">
      <Breadcrumbs items={breadcrumbs} />

      <header className="max-w-2xl">
        <h1 className="text-display-sm font-extrabold text-ink">{title}</h1>
        {intro ? <p className="mt-3 text-base leading-relaxed text-muted">{intro}</p> : null}
      </header>

      <div className="mt-10 max-w-3xl space-y-10 text-sm leading-relaxed text-muted">
        {children}
      </div>
    </div>
  )
}
