import { Link } from "react-router-dom"
import { useDocumentMeta } from "../hooks/useDocumentMeta"
import PolicyLayout from "../components/ui/PolicyLayout"
import { BUSINESS_ADDRESS_LINES } from "../data/business"
import { getShipments } from "../services/catalog"

export default function DeliveryReturns() {
  const shipments = getShipments()

  useDocumentMeta({
    title: "Delivery & returns",
    description:
      "How 112 Market delivers items from the UK to Nigeria, and how the testing guarantee and returns work.",
    canonical: "/delivery-returns",
  })

  return (
    <PolicyLayout
      title="Delivery & returns"
      intro="How your order travels from a UK household to your home in Nigeria, and what happens if something is not right."
      breadcrumbs={[{ label: "Home", to: "/" }, { label: "Delivery & returns" }]}
    >
      <section>
        <h2 className="text-lg font-bold text-ink">Two delivery routes</h2>
        <p className="mt-3">
          Every listing states which route applies to that item, so you always know what you are
          ordering.
        </p>
        <ul className="mt-4 space-y-4">
          <li>
            <span className="block font-semibold text-ink">Depot dispatch</span>
            Items already in Nigeria are dispatched directly from our Lagos depot. The dispatch
            estimate shown on the product page is the one that applies to your order.
          </li>
          <li>
            <span className="block font-semibold text-ink">Container shipment</span>
            Items still in the United Kingdom travel on our containers. The estimated arrival is
            printed on the listing.
          </li>
        </ul>
        {shipments.length ? (
          <div className="mt-5 overflow-hidden rounded-xl2 border border-line bg-white">
            <table className="w-full text-left text-sm">
              <caption className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-muted">
                Current containers
              </caption>
              <thead className="bg-canvas text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th scope="col" className="px-4 py-2 font-semibold">Container</th>
                  <th scope="col" className="px-4 py-2 font-semibold">Origin</th>
                  <th scope="col" className="px-4 py-2 font-semibold">Status</th>
                  <th scope="col" className="px-4 py-2 font-semibold">Est. arrival</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {shipments.map((shipment) => (
                  <tr key={shipment.id}>
                    <td className="px-4 py-3 font-semibold text-ink">{shipment.containerNumber}</td>
                    <td className="px-4 py-3">{shipment.originPort}</td>
                    <td className="px-4 py-3">{shipment.status}</td>
                    <td className="px-4 py-3">
                      {shipment.etaShort} · {shipment.estimatedArrival}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">Delivery cost</h2>
        <p className="mt-3">
          Delivery cost is not fixed at the catalogue level, so it is not calculated on this
          storefront. It is confirmed with you before any payment is taken, based on the item, the
          destination and the route it travels by.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">Testing guarantee</h2>
        <p className="mt-3">
          Each listing records the testing-guarantee window that applies to that item, shown on
          the product page alongside the condition grade. The window recorded on your item is the
          one that applies to your order — it is never longer or shorter than what you were shown.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">If something is wrong</h2>
        <p className="mt-3">
          If an item fails within the testing-guarantee window shown on its listing, bring it to
          our depot at {BUSINESS_ADDRESS_LINES.join(", ")} together with your order reference and
          we will assess it at the counter.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">Collection</h2>
        <p className="mt-3">
          You can collect your order from the depot instead of having it delivered. Contact us
          through the{" "}
          <Link to="/support" className="font-semibold text-brand-700 hover:underline">
            support page
          </Link>{" "}
          to arrange a collection slot within your testing window.
        </p>
      </section>
    </PolicyLayout>
  )
}
