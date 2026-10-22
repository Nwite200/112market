import { Link } from "react-router-dom"
import { AlertTriangle, MapPin, PhoneCall } from "lucide-react"
import { useCartContext } from "../context/ShopContext"
import { formatPrice } from "../services/sections"
import { BUSINESS, BUSINESS_ADDRESS_LINES } from "../data/business"
import { useDocumentMeta } from "../hooks/useDocumentMeta"
import Breadcrumbs from "../components/ui/Breadcrumbs"

export default function Checkout() {
  const { cart, cartCount, cartTotal } = useCartContext()

  useDocumentMeta({
    title: "Checkout",
    description: "Complete your 112 Market order.",
    canonical: "/checkout",
  })

  return (
    <div className="container-page py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Cart", to: "/cart" }, { label: "Checkout" }]} />

      <h1 className="text-display-sm font-extrabold text-ink">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-10">
        <div className="space-y-6">
          <div className="rounded-xl2 border border-warning/30 bg-warning/5 p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-ink">
              <AlertTriangle className="h-5 w-5 text-warning" aria-hidden="true" />
              Checkout is not available yet
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Online payment has not been switched on for this storefront, so no payment can be
              taken and no order can be confirmed here. We are not able to show an order
              confirmation until a payment provider confirms a successful transaction.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              In the meantime you can reserve the items in your cart at our Lagos depot, or send
              us a message through the support page and we will confirm availability and the
              delivery cost for you.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/support" className="btn-primary btn-sm">
                <PhoneCall className="h-4 w-4" aria-hidden="true" />
                Contact support
              </Link>
              <Link to="/products" className="btn-secondary btn-sm">
                Keep shopping
              </Link>
            </div>
          </div>

          <div className="rounded-xl2 border border-line bg-white p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-ink">
              <MapPin className="h-5 w-5 text-brand-700" aria-hidden="true" />
              Where you would collect from
            </h2>
            <address className="mt-3 not-italic text-sm leading-relaxed text-muted">
              {BUSINESS.name}
              <br />
              {BUSINESS_ADDRESS_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
        </div>

        <aside className="h-fit rounded-xl2 border border-line bg-white p-6 lg:sticky lg:top-28">
          <h2 className="text-base font-bold text-ink">Your items</h2>
          {cart.length === 0 ? (
            <p className="mt-3 text-sm text-muted">
              Your cart is empty.{" "}
              <Link to="/products" className="font-semibold text-brand-700 hover:underline">
                Browse products
              </Link>
            </p>
          ) : (
            <>
              <ul className="mt-4 space-y-3">
                {cart.map((item) => (
                  <li
                    key={`${item.productId}-${item.variantId ?? ""}`}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="min-w-0 truncate text-muted">
                      {item.quantity} × {item.name}
                    </span>
                    <span className="shrink-0 font-semibold text-ink">
                      {formatPrice((item.unitPrice ?? 0) * (item.quantity ?? 0))}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
                <span className="text-sm font-bold text-ink">
                  Estimated total ({cartCount} item{cartCount === 1 ? "" : "s"})
                </span>
                <span className="text-xl font-extrabold tracking-tight text-ink">
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                Delivery cost is confirmed before payment. Nothing is charged at this stage.
              </p>
            </>
          )}
        </aside>
      </div>
    </div>
  )
}
