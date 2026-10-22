/**
 * Mapper functions for converting between database rows and domain types.
 * 112 Market - UK to Nigeria fairly used household items.
 */
import type { Product, ProductImage, ProductVariant, VariantOption } from "../../src/types";
import type { Shipment } from "../../src/types";
/** Map a database products row to a domain Product */
export declare function mapProduct(row: Record<string, unknown>): Product;
/** Map a database product_images row to a ProductImage */
export declare function mapProductImage(row: Record<string, unknown>): ProductImage;
/** Map a database shipments row to a domain Shipment */
export declare function mapShipment(row: Record<string, unknown>): Shipment;
/** Map a database product_variants row to a ProductVariant */
export declare function mapProductVariant(row: Record<string, unknown>): ProductVariant;
/** Map a database product_variant_options row to variant options */
export declare function mapVariantOptions(rows: Record<string, unknown>[]): VariantOption[];
