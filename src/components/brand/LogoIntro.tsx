import { useEffect, useState } from "react"
import { LOGO_SRC } from "./Logo"
import { useReducedMotion } from "../../hooks/useReducedMotion"

const STORAGE_KEY = "112-market-intro-seen"

/** The sequence: fade and scale the logo in, hold it, then fade the overlay out. */
const FADE_IN_MS = 600
const HOLD_MS = 500
const FADE_OUT_MS = 700
/** Total running time: 600 + 500 + 700 = 1800ms. */
const TOTAL_MS = FADE_IN_MS + HOLD_MS + FADE_OUT_MS

/** Never wait longer than this for the logo image before starting. */
const MAX_LOGO_WAIT_MS = 300
/** Extra time before the unmount safety net fires (the animation normally unmounts it first). */
const SAFETY_MARGIN_MS = 150

const EASE_IN = "cubic-bezier(0.22, 1, 0.36, 1)" // smooth deceleration, no overshoot
const EASE_OUT = "cubic-bezier(0.4, 0, 0.2, 1)"

function hasSeenIntro(): boolean {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1"
  } catch {
    return false
  }
}

function markIntroSeen(): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1")
  } catch {
    // Session storage unavailable: the intro simply plays again next visit.
  }
}

/**
 * The full-screen 112 Market logo reveal (about 1.8 seconds).
 *
 *   0 to 600ms     logo fades 0 to 100% while scaling 96 to 100%
 *   600 to 1100ms  logo holds
 *   1100 to 1800ms overlay fades out and reveals the page
 *
 * - Plays once per browser-tab session (`sessionStorage`). Page-to-page fades
 *   are a separate, subtler effect handled by `PageTransition`.
 * - Whether to play is decided in the first render, so the storefront never
 *   flashes before the overlay appears. The logo is decoded first (capped at
 *   300ms) so it fades in instead of popping in half-loaded.
 * - It can never get stuck or block the page: the overlay is
 *   `pointer-events-none`, hides itself with `visibility: hidden` when its
 *   animation ends, unmounts on `animationend`, and a timer unmounts it as a
 *   safety net. The "seen" flag is written in the effect that starts the
 *   sequence, so React StrictMode's double effect run restarts it cleanly.
 * - Only opacity and transform are animated, which keeps it smooth on phones.
 * - Skipped entirely when the visitor prefers reduced motion.
 */
export default function LogoIntro() {
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(() => !reducedMotion && !hasSeenIntro())
  const [ready, setReady] = useState(false)

  // Mark as seen and wait (briefly) for the logo to be decoded.
  useEffect(() => {
    if (!visible) return
    if (reducedMotion) {
      setVisible(false)
      return
    }

    markIntroSeen()

    let active = true
    const begin = () => {
      if (active) setReady(true)
    }
    const image = new Image()
    image.src = LOGO_SRC
    const decoded = typeof image.decode === "function" ? image.decode() : Promise.resolve()
    decoded.then(begin, begin)
    const cap = window.setTimeout(begin, MAX_LOGO_WAIT_MS)

    return () => {
      active = false
      window.clearTimeout(cap)
    }
  }, [visible, reducedMotion])

  // Safety net: unmount even if `animationend` never fires.
  useEffect(() => {
    if (!visible || !ready) return
    const timer = window.setTimeout(() => setVisible(false), TOTAL_MS + SAFETY_MARGIN_MS)
    return () => window.clearTimeout(timer)
  }, [visible, ready])

  if (!visible) return null

  return (
    <div
      data-brand-intro
      data-state={ready ? "playing" : "loading"}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-brand-800"
      style={
        ready
          ? { animation: `brand-intro-out ${FADE_OUT_MS}ms ${EASE_OUT} ${FADE_IN_MS + HOLD_MS}ms both` }
          : undefined
      }
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) setVisible(false)
      }}
    >
      {ready && (
        <div
          className="flex flex-col items-center gap-5 px-6"
          style={{ animation: `brand-intro-in ${FADE_IN_MS}ms ${EASE_IN} both`, willChange: "opacity, transform" }}
        >
          <img
            src={LOGO_SRC}
            alt=""
            decoding="async"
            draggable={false}
            className="h-auto w-[min(72vw,21rem)] select-none"
          />
          <span className="flex h-[2px] w-14 overflow-hidden rounded-full" aria-hidden="true">
            <span className="flex-1 bg-flag-navy" />
            <span className="flex-1 bg-flag-red" />
          </span>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-flag-navy/70">
            UK → Nigeria
          </p>
        </div>
      )}
    </div>
  )
}
