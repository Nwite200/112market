import { Link } from "react-router-dom"
import { MapPin } from "lucide-react"
import Logo from "../brand/Logo"
import { BUSINESS, BUSINESS_ADDRESS_LINES } from "../../data/business"
import { getAllCategories } from "../../services/sections"

export default function Footer() {
  const categories = getAllCategories()
  const year = new Date().getFullYear()

  const supportLinks = [
    { to: "/support", label: "Help & Support" },
    { to: "/delivery-returns", label: "Delivery & Returns" },
    { to: "/products", label: "All products" },
    { to: "/products?sort=newest", label: "Latest arrivals" },
  ]

  const companyLinks = [
    { to: "/about", label: "About 112 Market" },
    { to: "/privacy", label: "Privacy policy" },
    { to: "/terms", label: "Terms of sale" },
  ]

  return (
    <footer className="mt-auto border-t border-line bg-white">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
<Logo size={38} showTagline />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {BUSINESS.tagline} Every item is graded, described and tested before it
              reaches our Lagos depot.
            </p>
            <address className="mt-5 not-italic">
              <p className="flex items-start gap-2 text-sm text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
                <span>
                  {BUSINESS_ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </p>
            </address>
          </div>

          <nav aria-labelledby="footer-shop">
            <h2 id="footer-shop" className="text-sm font-bold text-ink">
              Shop
            </h2>
            <ul className="mt-4 space-y-2.5">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/category/${category.slug}`}
                    className="text-sm text-muted transition-colors hover:text-brand-700"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-support">
            <h2 id="footer-support" className="text-sm font-bold text-ink">
              Customer support
            </h2>
            <ul className="mt-4 space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.to + link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted transition-colors hover:text-brand-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company">
            <h2 id="footer-company" className="text-sm font-bold text-ink">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted transition-colors hover:text-brand-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted sm:flex-row">
          <p>
            © {year} {BUSINESS.name}. UK-sourced fairly used household items.
          </p>
          <p>
            Prices shown in Nigerian Naira (NGN). {BUSINESS.address.city}, {BUSINESS.address.state}.
          </p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
