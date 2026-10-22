import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  action?: { label: string; to: string }
  align?: "left" | "center"
}

/** Consistent section title block used across the homepage. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center"

  return (
    <div
      className={`flex flex-col gap-4 ${
        centered
          ? "items-center text-center"
          : "sm:flex-row sm:items-end sm:justify-between"
      }`}
    >
      <div className={centered ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="mt-2 text-display-sm font-extrabold text-ink">{title}</h2>
        {description ? (
          <p className="mt-3 text-base leading-relaxed text-muted">{description}</p>
        ) : null}
      </div>

      {action ? (
        <Link to={action.to} className="btn-secondary btn-sm shrink-0 self-start sm:self-auto">
          {action.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  )
}

export type { SectionHeadingProps }

export function SectionShell({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return <section className={`section ${className}`}>{children}</section>
}
