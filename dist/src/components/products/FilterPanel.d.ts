import type { FilterState } from "../../types";
interface FilterPanelProps {
    filters: FilterState;
    onChange: (patch: Partial<FilterState>) => void;
    onReset: () => void;
    /** Show the category checkbox group (used on the all-products page). */
    showCategories?: boolean;
    className?: string;
}
/** Catalogue filter sidebar. Rendered inline on desktop and inside the mobile drawer. */
export default function FilterPanel({ filters, onChange, onReset, showCategories, className, }: FilterPanelProps): import("react").JSX.Element;
export {};
