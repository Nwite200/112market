import type { ReactNode } from "react";
interface SectionHeadingProps {
    eyebrow?: string;
    title: string;
    description?: string;
    action?: {
        label: string;
        to: string;
    };
    align?: "left" | "center";
}
/** Consistent section title block used across the homepage. */
export default function SectionHeading({ eyebrow, title, description, action, align, }: SectionHeadingProps): import("react").JSX.Element;
export type { SectionHeadingProps };
export declare function SectionShell({ children, className, }: {
    children: ReactNode;
    className?: string;
}): import("react").JSX.Element;
