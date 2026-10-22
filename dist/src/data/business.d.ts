/**
 * Verified business details for 112 Market.
 *
 * These are the only contact details published by the store. Nothing here is
 * inferred — the address was supplied by the business owner. Contact details
 * that have not been provided (phone, email, social accounts) are deliberately
 * absent rather than invented.
 */
export declare const BUSINESS: {
    readonly name: "112 Market";
    readonly tagline: "Fairly used household items, sourced in the UK and delivered in Nigeria.";
    readonly address: {
        readonly line1: "18 Jayieoba Road";
        readonly line2: "Beside Oremeta Close, Shasha";
        readonly city: "Lagos";
        readonly state: "Lagos State";
        readonly country: "Nigeria";
    };
    /** Single-line form used for maps and structured data. */
    readonly addressLine: "18 Jayieoba Road, Beside Oremeta Close, Shasha, Lagos State, Nigeria";
    /** Name of the physical pickup / dispatch point. */
    readonly depotName: "112 Market Lagos Depot";
    readonly countryCode: "NG";
};
/** Address rendered as separate lines. */
export declare const BUSINESS_ADDRESS_LINES: string[];
/**
 * A `mailto:`/`tel:` link can only be built when the business has published
 * that channel. Support pages read this to decide what to show.
 */
export declare const BUSINESS_CONTACT: {
    email: string | null;
    phone: string | null;
    whatsapp: string | null;
};
