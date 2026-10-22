import { useEffect, useRef, useState } from "react"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { ChevronDown, Headphones, Menu, Search, ShoppingBag, X } from "lucide-react"
import Logo from "../../brand/Logo"
import { useCartContext } from "../../../context/ShopContext"
import { getAllCategories } from "../../../services/sections"

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
    isActive ? "text-brand-700" : "text-ink hover:text-brand-700"
  }`

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [query, setQuery] = useState("")
  const { cartCount } = useCartContext()
  const navigate = useNavigate()
  const location = useLocation()
  const megaRef = useRef<HTMLDivElement>(null)

  const categories = getAllCategories()

  useEffect(() => {
    setMobileOpen(false)
    setMegaOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    if (!megaOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMegaOpen(false)
    }
    const onClick = (event: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(event.target as Node)) {
        setMegaOpen(false)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("mousedown", onClick)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("mousedown", onClick)
    }
  }, [megaOpen])

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault()
    const trimmed = query.trim()
    navigate(trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : "/products")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85">
      <div className="container-page">
        <div className="flex h-16 items-center gap-3 lg:h-[4.5rem] lg:gap-6">
          <button
            type="button"
            className="-ml-2 rounded-lg p-2 text-ink transition-colors hover:bg-brand-50 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

<Logo size={38} className="shrink-0" />

          <form role="search" onSubmit={submitSearch} className="hidden flex-1 md:block">
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <input
                id="site-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search sofas, appliances, electronics…"
                className="h-11 w-full rounded-full border border-line bg-canvas pl-11 pr-4 text-sm text-ink placeholder:text-muted/80 transition-colors focus:border-brand-400 focus:bg-surface"
              />
            </div>
          </form>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <Link
              to="/support"
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-50 hover:text-brand-700 md:flex"
            >
              <Headphones className="h-4 w-4" aria-hidden="true" />
              <span className="hidden lg:inline">Help &amp; Support</span>
              <span className="lg:hidden">Support</span>
            </Link>

            <Link
              to="/cart"
              className="relative rounded-full p-2.5 text-ink transition-colors hover:bg-brand-50 hover:text-brand-700"
              aria-label={`Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent-500 px-1 text-[0.65rem] font-bold text-brand-900 ring-2 ring-surface">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Category navigation (desktop) */}
        <nav aria-label="Product categories" className="hidden border-t border-line lg:block">
          <div className="flex items-center gap-1 py-2">
            <div ref={megaRef} className="relative">
              <button
                type="button"
                onClick={() => setMegaOpen((open) => !open)}
                onMouseEnter={() => setMegaOpen(true)}
                aria-expanded={megaOpen}
                aria-haspopup="true"
                aria-controls="category-menu"
                className="flex items-center gap-1.5 rounded-full bg-brand-50 px-4 py-2 text-sm font-bold text-brand-800 transition-colors hover:bg-brand-100"
              >
                All categories
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {megaOpen && (
                <div
                  id="category-menu"
                  className="absolute left-0 top-full z-50 w-[min(46rem,calc(100vw-3rem))] animate-slide-down rounded-xl2 border border-line bg-surface p-5 shadow-overlay"
                >
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        to={`/category/${category.slug}`}
                        className="group flex items-center gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-line hover:bg-brand-50/60"
                      >
                        <img
                          src={category.image}
                          alt=""
                          loading="lazy"
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-ink group-hover:text-brand-700">
                            {category.label}
                          </span>
                          <span className="block text-xs text-muted">{category.count} items</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/products" className={navLinkClass}>
              All products
            </NavLink>
            <NavLink to="/products?sort=newest" className={navLinkClass}>
              Latest arrivals
            </NavLink>
            <NavLink to="/products?sort=popularity" className={navLinkClass}>
              Best selling
            </NavLink>
            <NavLink to="/category/furniture" className={navLinkClass}>
              Furniture
            </NavLink>
            <NavLink to="/category/kitchen" className={navLinkClass}>
              Kitchen &amp; Appliances
            </NavLink>
            <NavLink to="/category/electronics" className={navLinkClass}>
              Electronics
            </NavLink>
          </div>
        </nav>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="animate-slide-down border-t border-line bg-surface lg:hidden"
        >
          <div className="container-page space-y-4 py-4">
            <form role="search" onSubmit={submitSearch}>
              <label htmlFor="mobile-search" className="sr-only">
                Search products
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                  aria-hidden="true"
                />
                <input
                  id="mobile-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products…"
                  className="h-11 w-full rounded-full border border-line bg-canvas pl-11 pr-4 text-sm"
                />
              </div>
            </form>

            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-muted">
                Categories
              </p>
              <ul className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      to={`/category/${category.slug}`}
                      className="flex items-center gap-2 rounded-xl border border-line p-2 text-sm font-semibold text-ink"
                    >
                      <img
                        src={category.image}
                        alt=""
                        loading="lazy"
                        className="h-9 w-9 rounded-lg object-cover"
                      />
                      <span className="min-w-0 truncate">{category.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-1 border-t border-line pt-3">
              <NavLink to="/products" className={navLinkClass}>
                All products
              </NavLink>
              <NavLink to="/products?sort=newest" className={navLinkClass}>
                Latest arrivals
              </NavLink>
              <NavLink to="/support" className={navLinkClass}>
                Help &amp; Support
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
