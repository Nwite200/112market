import { Link } from "react-router-dom"
import logoUrl from "../../assets/logo.webp"

/** URL of the official logo image (shared with the first-visit intro). */
export const LOGO_SRC: string = logoUrl

interface LogoProps {
  /** Base size in pixels. The full logo is rendered at about 1.45x this height. */
  size?: number
  /** Show the "UK → Nigeria" strapline under the logo. */
  showTagline?: boolean
  /** Link to home. Pass `false` for a non-interactive logo (e.g. inside the intro). */
  asLink?: boolean
  className?: string
}

/** The official 112 Market logo (house roof, "112" and shopping cart, with the MARKET wordmark). */
export function LogoMark({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src={logoUrl}
      alt="112 Market"
      height={Math.round(size * 1.45)}
      style={{ height: Math.round(size * 1.45), width: "auto" }}
      className={`block select-none ${className}`}
      draggable={false}
    />
  )
}

export default function Logo({
  size = 40,
  showTagline = false,
  asLink = true,
  className = "",
}: LogoProps) {
  const content = (
    <span className={`inline-flex flex-col items-start ${className}`}>
      <LogoMark size={size} />
      {showTagline && (
        <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-muted">
          UK → Nigeria
        </span>
      )}
    </span>
  )

  if (!asLink) return content

  return (
    <Link to="/" aria-label="112 Market — home" className="rounded-lg">
      {content}
    </Link>
  )
}
