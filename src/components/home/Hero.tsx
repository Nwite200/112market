import { Link } from "react-router-dom"
import { ArrowRight, LayoutGrid, ShieldCheck, Truck } from "lucide-react"
import { imageSrcSet, imageUrl } from "../../data/images"

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=70"
const HERO_SECONDARY =
  "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=70"

const trustPoints = [
  { icon: ShieldCheck, label: "Graded A–C and described in detail" },
  { icon: Truck, label: "Depot dispatch in Lagos, or by container" },
  { icon: LayoutGrid, label: "Every listing shows real stock and condition" },
]

/** Homepage hero — introduces 112 Market and routes into the catalogue. */
export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-brand-50 via-canvas to-canvas">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 12%, rgba(42,82,56,0.12), transparent 42%), radial-gradient(circle at 82% 8%, rgba(226,130,61,0.14), transparent 46%)",
        }}
      />

      <div className="container-page relative grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20">
        <div className="animate-fade-up">
          <p className="eyebrow">UK-sourced · Lagos-delivered</p>
          <h1 className="mt-4 text-display-lg font-extrabold text-ink">
            Quality second-hand household goods, from the UK to your home in Nigeria.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            112 Market sources fairly used furniture, appliances and electronics from UK
            households. Every item is graded A–C, described honestly, tested at our Lagos
            depot and dispatched with the condition spelled out — no surprises.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/products" className="btn-primary btn-lg">
              Shop products
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href="#categories" className="btn-secondary btn-lg">
              Explore categories
            </a>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {trustPoints.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-2 text-sm text-muted">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative animate-fade-in" style={{ animationDelay: "120ms" }}>
          <div className="overflow-hidden rounded-xl3 border border-line bg-white shadow-lift">
            <img
              src={imageUrl(HERO_IMAGE, 900)}
              srcSet={imageSrcSet(HERO_IMAGE, [640, 900, 1200])}
              sizes="(min-width: 1024px) 46vw, 92vw"
              alt="A furnished living room with a graded sofa and side table"
              width={900}
              height={640}
              fetchPriority="high"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 hidden w-44 overflow-hidden rounded-xl2 border border-line bg-white shadow-lift sm:block lg:-left-8">
            <img
              src={imageUrl(HERO_SECONDARY, 320)}
              alt="A graded kitchen appliance set on a counter"
              width={320}
              height={240}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
