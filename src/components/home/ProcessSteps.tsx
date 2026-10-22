import { Container, Home, PackageSearch, Truck } from "lucide-react"
import SectionHeading from "../ui/SectionHeading"

const steps = [
  {
    icon: Home,
    title: "Sourced in the United Kingdom",
    body: "We clear furniture, appliances, electronics and tools from UK households, workspaces and clearances.",
  },
  {
    icon: PackageSearch,
    title: "Graded and described",
    body: "Each item is graded A, B or C, photographed, and described with its condition, specifications and what is included.",
  },
  {
    icon: Container,
    title: "Shipped to our Lagos depot",
    body: "Stock arrives in Nigeria on our own containers and is checked, tested and stored at our Shasha depot.",
  },
  {
    icon: Truck,
    title: "Dispatched your way",
    body: "Depot dispatch for items already in Lagos, or a container shipment for items still in transit from the UK.",
  },
]

/** The real UK-to-Nigeria fulfilment sequence. */
export default function ProcessSteps() {
  return (
    <section className="section bg-brand-50">
      <div className="container-page">
        <SectionHeading
          eyebrow="How it works"
          title="From a UK home to your Lagos doorstep"
          description="Four steps, and you can follow them on every listing we publish."
        />

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, body }, index) => (
            <li key={title} className="relative rounded-xl2 border border-line bg-brand-50 p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-700 text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-display text-3xl font-extrabold text-brand-100">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
