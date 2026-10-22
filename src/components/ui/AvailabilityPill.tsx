import type { Availability } from "../../services/sections"

const TONES: Record<Availability["tone"], string> = {
  "in-stock": "text-success",
  "low-stock": "text-warning",
  "out-of-stock": "text-danger",
  preorder: "text-brand-700",
}

/** Small stock / availability indicator driven by real stock data. */
export default function AvailabilityPill({
  availability,
  className = "",
}: {
  availability: Availability
  className?: string
}) {
  return (
    <p className={`flex items-center gap-1.5 text-xs font-semibold ${TONES[availability.tone]} ${className}`}>
      <span className="relative flex h-1.5 w-1.5">
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-70 ${
            availability.tone === "out-of-stock" ? "bg-danger" : "bg-current"
          }`}
        />
      </span>
      {availability.label}
      {availability.detail ? (
        <span className="font-normal text-muted">· {availability.detail}</span>
      ) : null}
    </p>
  )
}
