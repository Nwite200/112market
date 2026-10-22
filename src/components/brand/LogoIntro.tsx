import { useEffect, useState } from "react"
import { LogoMark } from "./Logo"
import { useReducedMotion } from "../../hooks/useReducedMotion"

const STORAGE_KEY = "112-market-intro-seen"

/** How long the overlay stays fully visible before it fades away. */
const INTRO_DURATION = 2300

/**
 * The 112 Market logo reveal.
 *
 * - Runs once per browser-tab session (`sessionStorage`), never on every route.
 * - The overlay is `pointer-events-none`, so the storefront underneath stays
 *   interactive and nothing is blocked while it plays.
 * - Skipped entirely when the visitor prefers reduced motion.
 */
export default function LogoIntro() {
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (reducedMotion) return
    if (typeof window === "undefined") return

    let alreadySeen = false
    try {
      alreadySeen = window.sessionStorage.getItem(STORAGE_KEY) === "1"
    } catch {
      alreadySeen = false
    }

    if (alreadySeen) return

    setVisible(true)
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1")
    } catch {
      // Session storage unavailable — the intro simply repeats next visit.
    }

    const timer = window.setTimeout(() => setVisible(false), INTRO_DURATION)
    return () => window.clearTimeout(timer)
  }, [reducedMotion])

  if (!visible) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-canvas animate-fade-in"
      style={{ animationDuration: "320ms" }}
      aria-hidden="true"
    >
      <div
        className="flex flex-col items-center gap-4 animate-scale-in"
        style={{ animationDelay: "180ms", animationDuration: "760ms" }}
      >
        <LogoMark size={76} />
        <div className="text-center">
          <p className="font-display text-2xl font-extrabold tracking-tight text-ink">
            112 <span className="font-semibold text-brand-700">Market</span>
          </p>
          <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-muted">
            UK → Nigeria
          </p>
        </div>
      </div>
    </div>
  )
}
