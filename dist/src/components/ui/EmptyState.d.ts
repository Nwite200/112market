import type { ReactNode } from "react";
interface EmptyStateProps {
    title: string;
    description?: string;
    action?: ReactNode;
    icon?: ReactNode;
}
/** Shared empty / unavailable state. */
export default function EmptyState({ title, description, action, icon, }: EmptyStateProps): import("react").JSX.Element;
export {};
