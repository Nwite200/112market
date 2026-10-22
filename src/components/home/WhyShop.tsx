import { PackageCheck, Search, ShieldCheck, Truck } from "lucide-react"
import SectionHeading from "../ui/SectionHeading"

const benefits = [
  {
    icon: ShieldCheck,
    title: "Honest condition grading",
    body: "Every item carries an A, B or C grade plus a written description of the marks, wear and features you are actually getting — no vague 'good condition' listings.",
  },
  {
    icon: PackageCheck,
    title: "Tested before it ships",
    body: "Appliances and electronics are powered on and checked at our Lagos depot, and each listing records the testing note and warranty window that applies to it.",
  },
  {
    icon: Truck,
    title: "Two ways to receive your order",
    body: "Choose depot dispatch for stock already in Lagos, or a container shipment for items still travelling from the United Kingdom. The listing tells you which applies.",
  },
  {
    icon: Search,
    title: "Condition you can verify before you pay",
    body: "Each product page shows the grade, the specifications, the accessories included and the current stock count, so nothing is hidden until checkout.",
  },
]

/** Verified benefits of shopping with 112 Market. */
export default function WhyShop() {
  return (
    <section className="section bg-brand-900 text-white">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent-300">Why shop with 112 Market</p>
          <h2 className="mt-2 text-display-sm font-extrabold">A clearer way to buy second-hand in Nigeria</h2>
          <p className="mt-3 text-base leading-relaxed text-white/75">
            We sell fairly used household items from the UK, and we show you exactly what
            you are getting before you commit.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl2 border border-white/10 bg-white/[0.06] p-6 transition-colors hover:border-accent-400/40 hover:bg-white/[0.09]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500/15 text-accent-300">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
