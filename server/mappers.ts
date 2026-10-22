/**
 * Mapper functions for converting between database rows and domain types.
 * 112 Market - UK to Nigeria fairly used household items.
 */

import type {
  Product,
  ProductImage,
  ProductVariant,
  VariantValue,
  VariantOption,
  ConditionGrade,
  FulfillmentType,
} from "../src/types"
import type { Shipment } from "../src/types"

/** Map a database products row to a domain Product */
export function mapProduct(row: Record<string, unknown>): Product {
  const id = row.id as string || crypto.randomUUID()
  const sku = row.sku as string || ""
  const name = row.name as string || ""
  const slug = row.slug as string || ""
  const brand = row.brand as string || "Unbranded"
  const category = row.category as string || "Uncategorised"
  const categorySlug = row.categorySlug as string || "uncategorised"
  const description = row.description as string || ""
  const conditionGrade = (row.conditionGrade as ConditionGrade) || "A"
  const price = Number(row.price) || 0
  const originalPrice = row.originalPrice !== undefined ? Number(row.originalPrice) : undefined
  const currency = (row.currency as string) || "NGN"
  const images = row.images as string[] || []
  const imageAssets = (row.imageAssets as Record<string, unknown>[] | undefined)
    ?.map((a: Record<string, unknown>): ProductImage => ({
      id: a.id as string || crypto.randomUUID(),
      url: a.url as string || "",
      alt: a.alt as string | undefined,
      position: Number(a.position) || 0,
      isPrimary: a.isPrimary as boolean || false,
      variantId: a.variantId as string | null,
      fileName: a.fileName as string | undefined,
      storagePath: a.storagePath as string | undefined,
      mimeType: a.mimeType as string | undefined,
      sizeBytes: a.sizeBytes === Number(a.sizeBytes) ? Number(a.sizeBytes) : undefined,
    }))
    .filter((a) => Boolean(a.url)) || []
  const specifications = row.specifications as string[] || []
  const accessories = row.accessories as string[] || []
  const stockQuantity = Number(row.stockQuantity) || 0
  const fulfillmentType = (row.fulfillmentType as FulfillmentType) || "in_stock"
  const dispatchLocation = row.dispatchLocation as string || "Depot"
  const dispatchEta = row.dispatchEta as string | undefined
  const containerId = row.containerId as string | undefined
  const estimatedArrival = row.estimatedArrival as string | undefined
  const meta = row.meta as string[] || []
  const warrantyDays = Number(row.warrantyDays) || 30
  const isVerified = row.isVerified as boolean || true
  const popularity = Number(row.popularity) || 0
  const createdAt = row.createdAt as string || new Date().toISOString()
  const depositAmount = row.depositAmount !== undefined ? Number(row.depositAmount) : undefined

  return {
    id,
    sku,
    name,
    slug,
    brand,
    category,
    categorySlug,
    description,
    conditionGrade,
    price,
    originalPrice,
    currency,
    images,
    imageAssets,
    specifications,
    accessories,
    stockQuantity,
    fulfillmentType,
    dispatchLocation,
    dispatchEta,
    containerId,
    estimatedArrival,
    meta,
    warrantyDays,
    isVerified,
    popularity,
    createdAt,
    depositAmount,
    variants: row.variants as ProductVariant[] | undefined,
    variantOptions: row.variantOptions as VariantOption[] | undefined,
  }
}

/** Map a database product_images row to a ProductImage */
export function mapProductImage(row: Record<string, unknown>): ProductImage {
  return {
    id: row.id as string || crypto.randomUUID(),
    url: row.url as string || "",
    alt: row.alt as string | undefined,
    position: Number(row.position) || 0,
    isPrimary: row.isPrimary as boolean || false,
    variantId: row.variantId as string | null,
    fileName: row.fileName as string | undefined,
    storagePath: row.storagePath as string | undefined,
    mimeType: row.mimeType as string | undefined,
    sizeBytes: Number(row.sizeBytes) || undefined,
    uploadedAt: row.uploadedAt as string | undefined,
  }
}

/** Map a database shipments row to a domain Shipment */
export function mapShipment(row: Record<string, unknown>): Shipment {
  return {
    id: row.id as string || crypto.randomUUID(),
    containerNumber: row.containerNumber as string || "",
    originPort: row.originPort as string || "",
    primaryCargo: row.primaryCargo as string || "",
    status: (row.status as "At Sea" | "Customs Clearance" | "Loading" | "Discharged") || "At Sea",
    allocationPercentage: Number(row.allocationPercentage) || 0,
    estimatedArrival: row.estimatedArrival as string || "",
    etaShort: row.etaShort as string || "",
    vesselName: row.vesselName as string || "",
    registryNumber: row.registryNumber as string || "",
  }
}

/** Map a database product_variants row to a ProductVariant */
export function mapProductVariant(row: Record<string, unknown>): ProductVariant {
  return {
    id: row.id as string || crypto.randomUUID(),
    sku: row.sku as string || "",
    name: row.name as string | undefined,
    price: Number(row.price) || 0,
    originalPrice: row.originalPrice !== undefined ? Number(row.originalPrice) : undefined,
    stockQuantity: Number(row.stockQuantity) || 0,
    optionValues: row.optionValues as Record<string, string> || {},
    images: row.images as string[] || [],
    fulfillmentType: row.fulfillmentType as FulfillmentType | undefined,
    dispatchEta: row.dispatchEta as string | undefined,
  }
}

/** Map a database product_variant_options row to variant options */
export function mapVariantOptions(rows: Record<string, unknown>[]): VariantOption[] {
  return rows.map((row: Record<string, unknown>) => ({
    id: row.id as string || crypto.randomUUID(),
    name: row.name as string || "Unnamed Option",
    values: (row.values as Array<{ id: string; label: string; color?: string; imageUrl?: string }>) || [],
  }))
}
