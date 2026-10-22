import type { Availability } from "../../services/sections";
/** Small stock / availability indicator driven by real stock data. */
export default function AvailabilityPill({ availability, className, }: {
    availability: Availability;
    className?: string;
}): import("react").JSX.Element;
