import React from "react"

export default function Footer() {
  return (
    <footer className="border-t border-border py-6 text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-3">112 Market</h4>
            <p className="text-muted-foreground">
              Fairly used household items sourced from the UK, delivered to Nigeria.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-3">Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/products" className="hover-underline-animation">
                  Products
                </a>
              </li>
              <li>
                <a href="/categories" className="hover-underline-animation">
                  Categories
                </a>
              </li>
              <li>
                <a href="/about" className="hover-underline-animation">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover-underline-animation">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-center text-xs text-muted-foreground">
            2024 112 Market • UK-to-Nigeria fairly used household items
          </p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }