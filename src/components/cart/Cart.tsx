import React from "react"
import { useCartContext } from "../../context/ShopContext"
import { formatPrice } from "../../services/sections"
import type { CartItem } from "../../types"

interface CartItemDisplay {
  product: import("../types").Product
  quantity: number
  unitPrice: number
  subtotal: number
}

export default function Cart() {
  const { cart, addItem, removeItem, updateQuantity, clearCart, cartCount } =
    useCartContext()

  const items: CartItemDisplay[] = cart.map((item: CartItem) => {
    const product: any = {}
    const unitPrice = item.unitPrice || 0
    const subtotal = unitPrice * (item.quantity || 1)
    return { product, quantity: item.quantity || 1, unitPrice, subtotal }
  })

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-text mb-2">Shopping Cart</h2>
          <p className="text-muted-foreground">Review your items and proceed to checkout</p>
        </header>

        {/* Cart items summary */}
        {cart.length === 0 ? (
          <div className="empty-state text-center py-12">
            <p className="text-muted-foreground">Your cart is empty</p>
            <p className="text-medium mt-2">
              Start shopping for quality pre-owned household items
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Items list */}
            <div className="border rounded-lg overflow-hidden">
              {items.map((item, idx) => (
                <div key={idx} className="border-b py-4 flex items-start gap-4">
                  <div className="w-24 h-24 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.imageAssets?.[0]?.url || "/placeholder-product.jpg"}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-text truncate">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.product.conditionGrade}</p>
                  </div>
                  <div className="w-20">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="rounded border p-1 hover:bg-primary/10 transition-colors"
                        disabled={item.quantity >= 10}
                      >
                        +
                      </button>
                      <span className="min-w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="rounded border p-1 hover:bg-primary/10 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">₦{formatPrice(item.unitPrice)}</p>
                    <p className="text-lg font-bold">₦{formatPrice(item.subtotal)}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-error text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Cart totals */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div></div>
                <div>
                  <p className="text-sm text-muted-foreground">Cart total</p>
                  <p className="text-lg font-bold">₦{formatPrice(
                    items.reduce((sum, item) => sum + item.subtotal, 0)
                  )}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">Estimated shipping</p>
                <p className="text-medium">Free on orders over ₦50,000</p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => clearCart()}
                  className="w-full rounded border-primary px-4 py-3 text-sm font-medium hover:bg-primary/10 transition-colors"
                >
                  Clear cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Checkout CTA */}
        {cart.length > 0 && (
          <div className="mt-8 p-6 rounded border border-primary/20">
            <h3 className="text-xl font-bold text-primary mb-3">Proceed to Checkout</h3>
            <p className="text-muted-foreground mb-4">
              Your cart contains {cartCount} item(s) totaling ₦{formatPrice(
                items.reduce((sum, item) => sum + item.subtotal, 0)
              )}. Would you like to update delivery address or add more items?
            </p>
            <button
              className="w-full rounded border-primary px-4 py-3 text-sm font-medium mt-4 hover:bg-primary/10 transition-colors"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </section>
  )
}