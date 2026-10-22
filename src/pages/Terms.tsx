import { useDocumentMeta } from "../hooks/useDocumentMeta"
import PolicyLayout from "../components/ui/PolicyLayout"

export default function Terms() {
  useDocumentMeta({
    title: "Terms of sale",
    description: "The terms that apply when you buy from 112 Market.",
    canonical: "/terms",
  })

  return (
    <PolicyLayout
      title="Terms of sale"
      intro="These terms describe what we sell, how it is priced and how an order is completed."
      breadcrumbs={[{ label: "Home", to: "/" }, { label: "Terms of sale" }]}
    >
      <section>
        <h2 className="text-lg font-bold text-ink">Pricing and currency</h2>
        <p className="mt-3">
          All prices are shown in Nigerian Naira (NGN). Where an item was priced above its
          current price, the original price is shown alongside it and struck through. Prices and
          stock counts on a listing are live and can change.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">Condition grading</h2>
        <p className="mt-3">
          Items are graded A, B or C and the grade is shown on the listing together with a written
          description of the marks and wear present. Grade A is like new, Grade B has minor signs
          of use and Grade C is our value tier with visible wear. The description on the listing
          forms part of what you are agreeing to buy.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">Availability</h2>
        <p className="mt-3">
          Items are either in stock at our Lagos depot, in which case they are dispatched from
          there, or they are travelling from the United Kingdom on one of our containers and are
          available to pre-order. The listing tells you which of the two applies.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">Placing an order</h2>
        <p className="mt-3">
          Online payment is not currently enabled on this storefront. Adding an item to your cart
          reserves it in your browser only — it does not create an order and no money is taken.
          An order is only placed once payment has been confirmed by our payment provider, and
          you will receive a confirmation from us at that point.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">Delivery cost</h2>
        <p className="mt-3">
          Delivery cost depends on the item, the destination and the route it travels by. It is
          confirmed with you before payment is taken and is never added to the price of an item
          without being shown to you first.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">Testing guarantee</h2>
        <p className="mt-3">
          The testing-guarantee window recorded on each listing applies to that item. Details of
          how it works are set out on the delivery and returns page.
        </p>
      </section>
    </PolicyLayout>
  )
}
