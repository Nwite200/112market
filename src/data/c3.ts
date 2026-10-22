import type { Product } from "../types"

export const img = (id: string): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`

/** Product P2 - Used kitchen appliance from UK */
export const P2: Product = {
  id: "p-used-blender-001",
  sku: "SKU-NG-002",
  name: "Used Blender - Grade A",
  slug: "used-blender-grade-a",
  brand: "Kenwood",
  category: "Kitchen & Appliances",
  categorySlug: "kitchen",
  description:
    "Pre-owned Kenwood blender from UK kitchen. Excellent condition, lightly used. Includes original jug and lid. Professionally tested and cleaned.",
  conditionGrade: "A",
  price: 4500,
  originalPrice: 8000,
  currency: "NGN",
  images: [
    img("photo-1555630441-b21f0a7e0c23"),
    img("photo-1555630441-b21f0a7e0c24"),
    img("photo-1555630441-b21f0a7e0c25"),
  ],
  imageAssets: [
    {
      id: "ia-2-a",
      url: img("photo-1555630441-b21f0a7e0c23"),
      alt: "Kenwood blender - main unit, Grade A condition",
      position: 0,
      isPrimary: true,
      variantId: null,
    },
    {
      id: "ia-2-b",
      url: img("photo-1555630441-b21f0a7e0c24"),
      alt: "Kenwood blender - speed control dial",
      position: 1,
      isPrimary: false,
      variantId: null,
    },
    {
      id: "ia-2-c",
      url: img("photo-1555630441-b21f0a7e0c25"),
      alt: "Kenwood blender - blending jug and lid",
      position: 2,
      isPrimary: false,
      variantId: null,
    },
  ],
  specifications: ["1.6L capacity", "700W motor", "Stainless steel blades", "2-speed settings"],
  accessories: ["Original jug, lid, instruction manual"],
  stockQuantity: 5,
  fulfillmentType: "in_stock",
  dispatchLocation: "Lagos Depot",
  dispatchEta: "Dispatch: 1-2 days",
  meta: ["Grade A - Excellent condition", "Power tested: 100%"],
  warrantyDays: 30,
  isVerified: true,
  popularity: 62,
  createdAt: "2024-01-20",
}
