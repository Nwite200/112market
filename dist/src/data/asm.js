import { P1 } from "./c2";
import { P2, P3, P5 } from "./c3";
import { P4, P9 } from "./c5";
import { P6, P8, P10, P11, P12, P13, P14, P16, P17, P25 } from "./c7";
/**
 * The full 112 Market catalogue.
 *
 * This is the single source of truth for the storefront: every count, filter
 * option and price shown in the UI is derived from this array. Swap this
 * module for an API-backed repository and the rest of the app keeps working.
 */
export const PRODUCTS = [
    P1,
    P2,
    P3,
    P4,
    P5,
    P6,
    P8,
    P9,
    P10,
    P11,
    P12,
    P13,
    P14,
    P16,
    P17,
    P25,
];
/** Live container shipments currently moving from the UK to Nigeria. */
export const SHIPMENTS = [
    {
        id: "shp-112-ms-04",
        containerNumber: "112-MS-04",
        originPort: "Felixstowe, UK",
        primaryCargo: "Electronics & media equipment",
        status: "At Sea",
        allocationPercentage: 68,
        estimatedArrival: "2026-12-04",
        etaShort: "6 weeks",
        vesselName: "MV Northern Star",
        registryNumber: "IMO 9482731",
    },
    {
        id: "shp-112-ms-05",
        containerNumber: "112-MS-05",
        originPort: "Southampton, UK",
        primaryCargo: "Kitchen & household appliances",
        status: "Loading",
        allocationPercentage: 24,
        estimatedArrival: "2027-01-16",
        etaShort: "12 weeks",
        vesselName: "MV Atlas Trader",
        registryNumber: "IMO 9611024",
    },
];
/** Short label used in the announcement bar. */
export const NEXT_CONTAINER_ETA = {
    containerNumber: "112-MS-04",
    etaShort: "6 weeks",
    estimatedArrival: "2026-12-04",
};
