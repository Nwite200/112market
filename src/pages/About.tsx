import { Link } from "react-router-dom"
import { useDocumentMeta } from "../hooks/useDocumentMeta"
import PolicyLayout from "../components/ui/PolicyLayout"
import { BUSINESS, BUSINESS_ADDRESS_LINES } from "../data/business"

export default function About() {
  useDocumentMeta({
    title: "About us",
    description:
      "112 Market sources fairly used furniture, appliances and electronics from UK households and delivers them to customers across Nigeria.",
    canonical: "/about",
  })

  return (
    <PolicyLayout
      title="About 112 Market"
      intro="We source fairly used household items from the United Kingdom and make them available, honestly described and graded, to customers across Nigeria."
      breadcrumbs={[{ label: "Home", to: "/" }, { label: "About us" }]}
    >
      <section>
        <h2 className="text-lg font-bold text-ink">What we do</h2>
        <p className="mt-3">
          Buying second-hand in Nigeria usually means guessing. You rarely know the exact
          condition, the age or what is inside the box. 112 Market works the other way round: we
          clear stock from UK households, workspaces and clearances, grade every item A, B or C,
          photograph it, describe the marks in writing, test anything that needs power, and publish
          the live stock count on the listing.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">How items reach Nigeria</h2>
        <p className="mt-3">
          Stock travels on our own containers from the United Kingdom to Lagos. On arrival it is
          inspected, tested and stored at our depot, where it is dispatched either as a depot
          collection or a delivery. The route that applies to each item is stated on its product
          page, along with the estimated arrival for anything still in transit.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">Where to find us</h2>
        <p className="mt-3">
          Our depot is in Shasha, Lagos. You are welcome to come and inspect an item before you
          commit to it.
        </p>
        <address className="mt-3 not-italic">
          <span className="block font-semibold text-ink">{BUSINESS.name}</span>
          {BUSINESS_ADDRESS_LINES.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">Questions</h2>
        <p className="mt-3">
          If anything on this page is unclear, the{" "}
          <Link to="/support" className="font-semibold text-brand-700 hover:underline">
            help &amp; support page
          </Link>{" "}
          covers condition grades, delivery routes, payment and returns in more detail.
        </p>
      </section>
    </PolicyLayout>
  )
}
