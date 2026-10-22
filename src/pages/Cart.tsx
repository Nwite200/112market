import Cart from "../components/cart/Cart"
import { useDocumentMeta } from "../hooks/useDocumentMeta"
import Breadcrumbs from "../components/ui/Breadcrumbs"

export default function CartPage() {
  useDocumentMeta({
    title: "Your cart",
    description: "Review the items in your 112 Market cart before checkout.",
    canonical: "/cart",
  })

  return (
    <div className="container-page py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Cart" }]} />

      <header className="mb-8">
        <h1 className="text-display-sm font-extrabold text-ink">Your cart</h1>
        <p className="mt-2 text-base text-muted">
          Review your items and the estimated total before you continue.
        </p>
      </header>

      <Cart />
    </div>
  )
}
