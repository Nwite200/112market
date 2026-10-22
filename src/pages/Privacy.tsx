import { useDocumentMeta } from "../hooks/useDocumentMeta"
import PolicyLayout from "../components/ui/PolicyLayout"

export default function Privacy() {
  useDocumentMeta({
    title: "Privacy policy",
    description: "What 112 Market stores about you, and what it does not.",
    canonical: "/privacy",
  })

  return (
    <PolicyLayout
      title="Privacy policy"
      intro="This storefront is built to collect as little as possible. Here is exactly what happens to your data."
      breadcrumbs={[{ label: "Home", to: "/" }, { label: "Privacy policy" }]}
    >
      <section>
        <h2 className="text-lg font-bold text-ink">Your cart is stored in your browser</h2>
        <p className="mt-3">
          When you add an item to your cart, the contents of that cart are saved in your own
          browser&apos;s local storage. Nothing is sent to us. Clearing your cart, or clearing your
          browser storage, removes it permanently.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">No account, no tracking of your visits</h2>
        <p className="mt-3">
          There is no sign-in and no customer account on this storefront, so we do not hold a user
          profile for you. The site does not use advertising trackers or third-party analytics.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">No payment data</h2>
        <p className="mt-3">
          Online payment has not been switched on, so no card number, bank account or other
          payment credential is ever entered on this site, and we never receive it. If payment is
          enabled in future, it will be handled by the payment provider, not by this storefront.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">Product images and fonts</h2>
        <p className="mt-3">
          Product photography is served from an image CDN and the typeface is served from a font
          CDN. As with any third-party host, your browser makes a request to them when the page
          loads.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">Contact</h2>
        <p className="mt-3">
          For any question about your data, visit our Lagos depot — the address is published on
          the{" "}
          <a href="/support" className="font-semibold text-brand-700 hover:underline">
            support page
          </a>
          .
        </p>
      </section>
    </PolicyLayout>
  )
}
