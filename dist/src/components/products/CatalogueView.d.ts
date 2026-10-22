import { type Crumb } from "../ui/Breadcrumbs";
interface CatalogueViewProps {
    title: string;
    description?: string;
    breadcrumbs: Crumb[];
    /** Category slug applied by default (category pages). */
    categorySlug?: string;
    /** Show the category filter group (all-products page). */
    showCategories?: boolean;
    searchPlaceholder?: string;
}
/**
 * Shared catalogue listing used by the all-products page and every category
 * page. Filtering, sorting and pagination all run against the real catalogue.
 */
export default function CatalogueView({ title, description, breadcrumbs, categorySlug, showCategories, searchPlaceholder, }: CatalogueViewProps): import("react").JSX.Element;
export {};
