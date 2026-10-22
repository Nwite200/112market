import { useState, type ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { useReducedMotion } from "../../hooks/useReducedMotion"

interface PageTransitionProps {
  children: ReactNode
  /**
   * What counts as "a different page". Defaults to the pathname, so `/products`
   * to `/product/sofa` fades in while `/products?sort=newest` to
   * `/products?sort=popularity` (same page, new filters) does not remount or
   * replay the animation.
   */
  transitionKey?: string
  className?: string
}

/**
 * Fades the routed page in whenever the location changes to a different page.
 *
 * It only reads the router's location. It never calls `navigate`, so query
 * strings, hashes and history entries are untouched, and links, programmatic
 * `navigate()` and browser Back/Forward all go through the same path.
 *
 * - The first page shown is not animated. The full-screen `LogoIntro` owns
 *   first load, so the two never stack.
 * - Changing the `key` remounts the wrapper, which restarts the CSS animation.
 *   Layout, header and footer stay mounted, so there is never a blank screen.
 * - Under `prefers-reduced-motion` the animation class is not applied at all.
 * - The duration (250ms) lives with the `route-fade` animation in
 *   `tailwind.config.js`.
 */
export default function PageTransition({ children, transitionKey, className = "" }: PageTransitionProps) {
  const { pathname } = useLocation()
  const reducedMotion = useReducedMotion()
  const key = transitionKey ?? pathname

  // "Storing information from previous renders": React re-renders immediately
  // when state is set during render, so the new page never paints un-animated.
  const [current, setCurrent] = useState({ key, animate: false })
  if (current.key !== key) {
    setCurrent({ key, animate: true })
  }

  const animate = current.animate && !reducedMotion

  return (
    <div
      key={key}
      data-route-transition={animate ? "animating" : "idle"}
      className={[animate ? "animate-route-fade" : "", className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  )
}
