/**
 * The 112 Market logo reveal.
 *
 * - Runs once per browser-tab session (`sessionStorage`), never on every route.
 * - The overlay is `pointer-events-none`, so the storefront underneath stays
 *   interactive and nothing is blocked while it plays.
 * - Skipped entirely when the visitor prefers reduced motion.
 */
export default function LogoIntro(): import("react").JSX.Element | null;
