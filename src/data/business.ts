/**
 * Verified business details for 112 Market.
 *
 * These are the only contact details published by the store. Nothing here is
 * inferred — the address was supplied by the business owner. Contact details
 * that have not been provided (phone, email, social accounts) are deliberately
 * absent rather than invented.
 */
export const BUSINESS = {
  name: "112 Market",
  tagline: "Fairly used household items, sourced in the UK and delivered in Nigeria.",
  address: {
    line1: "18 Jayieoba Road",
    line2: "Beside Oremeta Close, Shasha",
    city: "Lagos",
    state: "Lagos State",
    country: "Nigeria",
  },
  /** Single-line form used for maps and structured data. */
  addressLine: "18 Jayieoba Road, Beside Oremeta Close, Shasha, Lagos State, Nigeria",
  /** Name of the physical pickup / dispatch point. */
  depotName: "112 Market Lagos Depot",
  countryCode: "NG",
} as const

/** Address rendered as separate lines. */
export const BUSINESS_ADDRESS_LINES = [
  BUSINESS.address.line1,
  BUSINESS.address.line2,
  `${BUSINESS.address.city}, ${BUSINESS.address.state}`,
  BUSINESS.address.country,
]

/**
 * A `mailto:`/`tel:` link can only be built when the business has published
 * that channel. Support pages read this to decide what to show.
 */
export const BUSINESS_CONTACT = {
  email: null as string | null,
  phone: null as string | null,
  whatsapp: null as string | null,
}
