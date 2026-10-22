import type { SortKey } from "../../types";
/** Sort control for catalogue pages. */
export default function SortSelect({ value, onChange, }: {
    value: SortKey;
    onChange: (value: SortKey) => void;
}): import("react").JSX.Element;
