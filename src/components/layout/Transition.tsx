import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Logo from "../brand/Logo"

/**
 * Page transition component with logo animation.
 * - Fades out current page on navigation start
 * - Shows 112 Market logo during transition
 * - Fades in new page after location change
 */
export default function Transition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isNavigating, setIsNavigating] = useState(false)
  const [fromPath, setFromPath] = useState<string | null>(null)

  // Track navigation start
  useEffect(() => {
    const handlePop = () => {
      setIsNavigating(true)
      setFromPath(location.pathname)
    }

    const una = navigate(
      location.pathname,
      { replace: true }
    ) // hack to trigger the navigation state

    return () => una()
  }, [location.pathname, navigate])

  // Reset navigation state after location changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsNavigating(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [location.pathname])

  // If we just navigated, show the transition
  if (isNavigating && fromPath) {
    // Immediately transition to new location
    const timeout = setTimeout(() => {
      setIsNavigating(false)
    }, 100)

    return <div className="min-h-screen bg-white">{children}</div>
  }

  // During navigation, show logo and prevent content rendering
  if (isNavigating) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-white"
        style={{ minHeight: "100vh" }}
      >
        <Logo size={60} className="mb-6" />
        <div className="text-3dot" aria-label="Loading..." />
      </div>
    )
  }

  // Default: render children (page content)
  return <div className="min-h-screen">{children}</div>
}