import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import AnnouncementBar from "./AnnouncementBar"
import Navbar from "./navbar/Index"
import Footer from "./Footer"
import LogoIntro from "../brand/LogoIntro"

/**
 * Shared storefront shell: announcement bar, header, routed page and footer.
 * Route changes get a short 280ms fade so navigation feels responsive
 * without being distracting.
 */
export default function DefaultLayout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110] focus:rounded-lg focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <LogoIntro />
      <AnnouncementBar />
      <Navbar />

      <main id="main-content" className="flex-1">
        <div key={location.pathname} className="animate-route-fade">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export { DefaultLayout }
