interface AnnouncementBarProps {
    message?: string;
    href?: string;
}
/**
 * Compact store announcement strip.
 *
 * Everything shown here is derived from live catalogue data (container
 * shipments, depot dispatch, condition grading) — no invented delivery
 * windows or discounts.
 */
export declare function AnnouncementBar({ message, href }: AnnouncementBarProps): import("react").JSX.Element | null;
export default AnnouncementBar;
