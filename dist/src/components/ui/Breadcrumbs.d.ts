export interface Crumb {
    label: string;
    to?: string;
}
/** Accessible breadcrumb trail. */
export default function Breadcrumbs({ items }: {
    items: Crumb[];
}): import("react").JSX.Element;
