import type { ReactNode } from "react";
import { type Crumb } from "./Breadcrumbs";
/** Shared layout for the informational pages (about, policies, support). */
export default function PolicyLayout({ title, intro, breadcrumbs, children, }: {
    title: string;
    intro?: string;
    breadcrumbs: Crumb[];
    children: ReactNode;
}): import("react").JSX.Element;
