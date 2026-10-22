import { Link } from "react-router-dom"

interface LogoProps {
  /** Rendered height of the mark in pixels. */
  size?: number
  /** Show the "UK → Nigeria" strapline under the wordmark. */
  showTagline?: boolean
  /** Link to home. Pass `false` for a non-interactive logo (e.g. inside the intro). */
  asLink?: boolean
  className?: string
}

/**
 * The 112 Market identity: a shipping crate crossed by a journey arc,
 * sitting next to the wordmark. Drawn as inline SVG so it stays crisp and
 * needs no external asset.
 */
export function LogoMark({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-label="112 Market"
      className={className}
    >
      <rect width="40" height="40" rx="12" fill="#2A5238" />
      <path
        d="M11 22.5 20 18l9 4.5v8L20 35l-9-4.5v-8Z"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M11 22.5 20 27l9-4.5M20 27v8"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M13 14.5c3.6-3.6 9.8-4 13.8-.4"
        stroke="#E2823D"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function Logo({
  size = 40,
  showTagline = false,
  asLink = true,
  className = "",
}: LogoProps) {
  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-extrabold tracking-tight text-ink sm:text-xl">
          112 <span className="font-semibold text-brand-700">Market</span>
        </span>
        {showTagline && (
          <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-muted">
            UK → Nigeria
          </span>
        )}
      </span>
    </span>
  )

  if (!asLink) return content

  return (
    <Link to="/" aria-label="112 Market — home" className="rounded-lg">
      {content}
    </Link>
  )
}
