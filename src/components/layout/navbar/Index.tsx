import React from "react"
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="border-b border-border bg-card py-3">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="font-semibold text-primary">
            112 Market
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/products" className="text-sm text-foreground hover:underline">
            Shop
          </Link>
          <Link to="/categories" className="text-sm text-foreground hover:underline">
            Categories
          </Link>
          <a
            href="#"
            className="relative after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-0.5 after:bg-primary after:content-['']"
          >
            Account
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-full p-2 hover:bg-primary/10 transition-colors"
            aria-label="View cart"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M3 3h2l.4 2 7 9 6 2L21 3l-9-2 9-2v1.5l3 9L12 21l-9-1.5L3 3z" />
              <circle cx="9" cy="21" r="1" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-primary text-xs font-bold rounded-full w-3 h-3 text-white">0</span>
          </button>
        </div>
      </div>
    </nav>
  )
}