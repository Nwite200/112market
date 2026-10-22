/**
 * Page transition component with logo animation.
 * - Fades out current page on navigation start
 * - Shows 112 Market logo during transition
 * - Fades in new page after location change
 */
export default function Transition({ children }: {
    children: React.ReactNode;
}): import("react").JSX.Element;
