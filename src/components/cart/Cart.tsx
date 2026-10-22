import { Link } from "react-router-dom"
import { ArrowRight, Info, ShoppingBag, Trash2, Truck } from "lucide-react"
import { useCartContext } from "../../context/ShopContext"
import { formatPrice, getConditionGradeShort } from "../../services/sections"
import QuantitySelector from "../products/QuantitySelector"
import EmptyState from "../ui/EmptyState"

export default function Cart() {
  const { cart, removeItem, updateQuantity, clearCart, cartCount, cartTotal } =
    useCartContext()

  if (cart.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingBag className="h-8 w-8" aria-hidden="true" />}
        title="Your cart is empty"
        description="Browse graded furniture, appliances and electronics sourced from UK households and add what you need."
        action={
          <Link to="/products" className="btn-primary btn-sm">
            Start shopping
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      />
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-10">
      <div className="overflow-hidden rounded-xl2 border border-line bg-white">
        <ul className="divide-y divide-line">
          {cart.map((item) => {
            const lineTotal = (item.unitPrice ?? 0) * (item.quantity ?? 0)
            return (
              <li key={`${item.productId}-${item.variantId ?? ""}`} className="flex gap-4 p-4 sm:p-5">
                <Link
                  to={item.slug ? `/product/${item.slug}` : "/products"}
                  className="media h-24 w-24 shrink-0 rounded-xl border border-line"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name ?? "Cart item"}
                      loading="lazy"
                      decoding="async"
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-[0.65rem] text-muted">
                      No image
                    </span>
                  )}
                </Link>

                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <Link
                    to={item.slug ? `/product/${item.slug}` : "/products"}
                    className="truncate text-sm font-semibold text-ink hover:text-brand-700"
                  >
                    {item.name ?? "Product"}
                  </Link>
                  <p className="text-xs text-muted">
                    {item.conditionGrade ? `${getConditionGradeShort(item.conditionGrade)} · ` : ""}
                    {item.variantName ??
                      item.variantSku ??
                      (item.fulfillmentType === "preorder" ? "Pre-order" : "In stock")}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(value) => updateQuantity(item.productId, value, item.variantId)}
                      max={Math.max(1, item.maxQuantity ?? 99)}
                      label={`Quantity for ${item.name ?? "item"}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="inline-flex items-center gap-1.5 rounded text-xs font-semibold text-muted transition-colors hover:text-danger"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold text-ink">{formatPrice(lineTotal)}</p>
                  {item.quantity > 1 && (
                    <p className="mt-0.5 text-xs text-muted">
                      {formatPrice(item.unitPrice ?? 0)} each
                    </p>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <aside className="h-fit rounded-xl2 border border-line bg-white p-6 lg:sticky lg:top-28">
        <h2 className="text-base font-bold text-ink">Order summary</h2>

        <dl className="mt-4 space-y-2.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">
              Items ({cartCount})
            </dt>
            <dd className="font-semibold text-ink">{formatPrice(cartTotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Delivery</dt>
            <dd className="font-semibold text-ink">Confirmed at checkout</dd>
          </div>
        </dl>

        <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
          <span className="text-sm font-bold text-ink">Estimated total</span>
          <span className="text-xl font-extrabold tracking-tight text-ink">
            {formatPrice(cartTotal)}
          </span>
        </div>

        <p className="mt-3 flex items-start gap-2 rounded-xl bg-canvas p-3 text-xs leading-relaxed text-muted">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-700" aria-hidden="true" />
          Delivery cost is not yet configured for this storefront. It is confirmed before any
          payment is taken.
        </p>

        <Link to="/checkout" className="btn-primary mt-5 w-full">
          Go to checkout
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        <Link to="/products" className="btn-secondary mt-2 w-full">
          Continue shopping
        </Link>

        <button
          type="button"
          onClick={clearCart}
          className="mt-4 w-full rounded text-xs font-semibold text-muted transition-colors hover:text-danger"
        >
          Clear cart
        </button>

        <p className="mt-5 flex items-start gap-2 border-t border-line pt-4 text-xs leading-relaxed text-muted">
          <Truck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-700" aria-hidden="true" />
          Items dispatch from our Lagos depot or by container, as stated on each product page.
        </p>
      </aside>
    </div>
  )
}
