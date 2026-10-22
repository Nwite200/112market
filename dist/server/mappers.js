/**
 * Mapper functions for converting between database rows and domain types.
 * 112 Market - UK to Nigeria fairly used household items.
 */
/** Map a database products row to a domain Product */
export function mapProduct(row) {
    const id = row.id || crypto.randomUUID();
    const sku = row.sku || "";
    const name = row.name || "";
    const slug = row.slug || "";
    const brand = row.brand || "Unbranded";
    const category = row.category || "Uncategorised";
    const categorySlug = row.categorySlug || "uncategorised";
    const description = row.description || "";
    const conditionGrade = row.conditionGrade || "A";
    const price = Number(row.price) || 0;
    const originalPrice = row.originalPrice !== undefined ? Number(row.originalPrice) : undefined;
    const currency = row.currency || "NGN";
    const images = row.images || [];
    const imageAssets = row.imageAssets
        ?.map((a) => ({
        id: a.id || crypto.randomUUID(),
        url: a.url || "",
        alt: a.alt,
        position: Number(a.position) || 0,
        isPrimary: a.isPrimary || false,
        variantId: a.variantId,
        fileName: a.fileName,
        storagePath: a.storagePath,
        mimeType: a.mimeType,
        sizeBytes: a.sizeBytes === Number(a.sizeBytes) ? Number(a.sizeBytes) : undefined,
    }))
        .filter((a) => Boolean(a.url)) || [];
    const specifications = row.specifications || [];
    const accessories = row.accessories || [];
    const stockQuantity = Number(row.stockQuantity) || 0;
    const fulfillmentType = row.fulfillmentType || "in_stock";
    const dispatchLocation = row.dispatchLocation || "Depot";
    const dispatchEta = row.dispatchEta;
    const containerId = row.containerId;
    const estimatedArrival = row.estimatedArrival;
    const meta = row.meta || [];
    const warrantyDays = Number(row.warrantyDays) || 30;
    const isVerified = row.isVerified || true;
    const popularity = Number(row.popularity) || 0;
    const createdAt = row.createdAt || new Date().toISOString();
    const depositAmount = row.depositAmount !== undefined ? Number(row.depositAmount) : undefined;
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
        variants: row.variants,
        variantOptions: row.variantOptions,
    };
}
/** Map a database product_images row to a ProductImage */
export function mapProductImage(row) {
    return {
        id: row.id || crypto.randomUUID(),
        url: row.url || "",
        alt: row.alt,
        position: Number(row.position) || 0,
        isPrimary: row.isPrimary || false,
        variantId: row.variantId,
        fileName: row.fileName,
        storagePath: row.storagePath,
        mimeType: row.mimeType,
        sizeBytes: Number(row.sizeBytes) || undefined,
        uploadedAt: row.uploadedAt,
    };
}
/** Map a database shipments row to a domain Shipment */
export function mapShipment(row) {
    return {
        id: row.id || crypto.randomUUID(),
        containerNumber: row.containerNumber || "",
        originPort: row.originPort || "",
        primaryCargo: row.primaryCargo || "",
        status: row.status || "At Sea",
        allocationPercentage: Number(row.allocationPercentage) || 0,
        estimatedArrival: row.estimatedArrival || "",
        etaShort: row.etaShort || "",
        vesselName: row.vesselName || "",
        registryNumber: row.registryNumber || "",
    };
}
/** Map a database product_variants row to a ProductVariant */
export function mapProductVariant(row) {
    return {
        id: row.id || crypto.randomUUID(),
        sku: row.sku || "",
        name: row.name,
        price: Number(row.price) || 0,
        originalPrice: row.originalPrice !== undefined ? Number(row.originalPrice) : undefined,
        stockQuantity: Number(row.stockQuantity) || 0,
        optionValues: row.optionValues || {},
        images: row.images || [],
        fulfillmentType: row.fulfillmentType,
        dispatchEta: row.dispatchEta,
    };
}
/** Map a database product_variant_options row to variant options */
export function mapVariantOptions(rows) {
    return rows.map((row) => ({
        id: row.id || crypto.randomUUID(),
        name: row.name || "Unnamed Option",
        values: row.values || [],
    }));
}
