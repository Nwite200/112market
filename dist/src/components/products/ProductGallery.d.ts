export interface GalleryImage {
    id: string;
    url: string;
    alt?: string;
}
interface ProductGalleryProps {
    images: GalleryImage[];
    productName: string;
    /** Badge rendered over the main image, e.g. the condition grade. */
    overlay?: React.ReactNode;
}
/**
 * Product image gallery with clickable thumbnails and a full-screen zoom.
 * Handles broken images with an inline fallback rather than a broken icon.
 */
export default function ProductGallery({ images, productName, overlay, }: ProductGalleryProps): import("react").JSX.Element;
export {};
