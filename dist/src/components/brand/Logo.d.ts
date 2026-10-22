interface LogoProps {
    /** Rendered height of the mark in pixels. */
    size?: number;
    /** Show the "UK → Nigeria" strapline under the wordmark. */
    showTagline?: boolean;
    /** Link to home. Pass `false` for a non-interactive logo (e.g. inside the intro). */
    asLink?: boolean;
    className?: string;
}
/**
 * The 112 Market identity: a shipping crate crossed by a journey arc,
 * sitting next to the wordmark. Drawn as inline SVG so it stays crisp and
 * needs no external asset.
 */
export declare function LogoMark({ size, className }: {
    size?: number;
    className?: string;
}): import("react").JSX.Element;
export default function Logo({ size, showTagline, asLink, className, }: LogoProps): import("react").JSX.Element;
export {};
