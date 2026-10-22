export type ConditionGrade = "A" | "B" | "C";
export type FulfillmentType = "in_stock" | "preorder";
/** One image of a product, with metadata for the gallery and admin editor. */
export interface ProductImage {
    id: string;
    url: string;
    alt?: string;
    position: number;
    isPrimary: boolean;
    /** Set when the image belongs to a specific variant; null for product-level images. */
    variantId: string | null;
    fileName?: string;
    storagePath?: string;
    mimeType?: string;
    sizeBytes?: number;
    uploadedAt?: string;
}
/** One selectable value inside a variant option, e.g. colour "Midnight" or storage "256GB". */
export interface VariantValue {
    id: string;
    label: string;
    color?: string;
    imageUrl?: string;
}
/** A group of selectable values, e.g. "Colour" or "Storage". */
export interface VariantOption {
    id: string;
    name: string;
    values: VariantValue[];
}
/** A purchasable variant of a product with its own price, stock, SKU and images. */
export interface ProductVariant {
    id: string;
    sku: string;
    name?: string;
    price: number;
    originalPrice?: number;
    stockQuantity: number;
    /** optionId -> valueId, e.g. { colour: "midnight", storage: "128gb" } */
    optionValues: Record<string, string>;
    /** Variant-specific gallery images; empty means the product-level images apply. */
    images: string[];
    fulfillmentType?: FulfillmentType;
    dispatchEta?: string;
}
export interface Product {
    id: string;
    sku: string;
    name: string;
    slug: string;
    brand: string;
    category: string;
    categorySlug: string;
    description: string;
    conditionGrade: ConditionGrade;
    price: number;
    originalPrice?: number;
    currency: string;
    /** All product-level image URLs in display order (primary first). Back-compat field. */
    images: string[];
    /** Rich image metadata (position, primary flag, variant association, storage path). */
    imageAssets?: ProductImage[];
    specifications: string[];
    accessories: string[];
    stockQuantity: number;
    fulfillmentType: FulfillmentType;
    dispatchLocation: string;
    dispatchEta?: string;
    containerId?: string;
    estimatedArrival?: string;
    meta?: string[];
    warrantyDays: number;
    isVerified: boolean;
    popularity: number;
    createdAt: string;
    depositAmount?: number;
    /** Curated for the homepage "Featured" rail. */
    isFeatured?: boolean;
    /** When present, purchasing is variant-driven: the customer must pick one
     * value per option before adding to cart. Products without variants keep
     * the single-SKU behaviour above.
     */
    variants?: ProductVariant[];
    variantOptions?: VariantOption[];
}
export interface Shipment {
    id: string;
    containerNumber: string;
    originPort: string;
    primaryCargo: string;
    status: "At Sea" | "Customs Clearance" | "Loading" | "Discharged";
    allocationPercentage: number;
    estimatedArrival: string;
    etaShort: string;
    vesselName: string;
    registryNumber: string;
}
/** A browsing category backed by real catalogue data. */
export interface Category {
    slug: string;
    label: string;
    description: string;
    /** Cover image for category cards and the mega menu. */
    image: string;
}
/** A named filter option derived from the catalogue. */
export interface FilterOption {
    id: string;
    label: string;
}
export interface CartItem {
    productId: string;
    quantity: number;
    fulfillmentType: FulfillmentType;
    /** Selected variant, when the product is variant-driven. */
    variantId?: string;
    variantSku?: string;
    variantName?: string;
    /** Unit price (NGN) charged for this line, snapped at add time. */
    unitPrice?: number;
    /** Snapshot of the product at add time so the cart renders without a lookup. */
    name?: string;
    slug?: string;
    image?: string;
    conditionGrade?: ConditionGrade;
    maxQuantity?: number;
}
export interface FilterState {
    query: string;
    category: string;
    grades: ConditionGrade[];
    locations: string[];
    brands: string[];
    specs: string[];
    coverages: string[];
    minPrice: number;
    maxPrice: number;
    tab: "all" | "instock" | "preorder";
}
export type SortKey = "newest" | "price-asc" | "price-desc" | "popularity" | "grade" | "recent";
export declare const GRADE_LABEL: Record<ConditionGrade, string>;
export declare const GRADE_SHORT: Record<ConditionGrade, string>;
/** Dispatch/delivery locations available to customers. */
export declare const LOCATION_OPTIONS: readonly [{
    readonly id: "depot";
    readonly label: "Lagos Depot pickup";
}, {
    readonly id: "sea";
    readonly label: "Container shipment";
}];
