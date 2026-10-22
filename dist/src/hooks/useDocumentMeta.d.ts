export declare const SITE: {
    name: string;
    title: string;
    description: string;
};
export interface PageMeta {
    /** Page title. The store name is appended automatically. */
    title?: string;
    description?: string;
    /** Absolute or root-relative canonical URL. */
    canonical?: string;
    image?: string;
    type?: string;
}
/**
 * Sets the document title, meta description, Open Graph tags and canonical
 * URL for the current page. Every route calls this with its own content so
 * titles never leak between pages.
 */
export declare function useDocumentMeta(meta?: PageMeta): void;
export default useDocumentMeta;
