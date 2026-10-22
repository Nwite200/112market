/** Accessible pagination for catalogue listings. */
export default function Pagination({ page, pageCount, onChange, }: {
    page: number;
    pageCount: number;
    onChange: (page: number) => void;
}): import("react").JSX.Element | null;
