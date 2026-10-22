import type { Product } from "../types"

export const img = (id: string): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`

/** Product P4 - Used washing machine from UK */
export const P4: Product = {
  id: "p-used-washer-001",
  sku: "SKU-NG-004",
  name: "Used Washing Machine - Grade C",
  slug: "used-washing-machine-grade-c",
  brand: "Beko",
  category: "Kitchen & Appliances",
  categorySlug: "kitchen",
  description:
    "Pre-owned Beko washing machine from UK household. Grade C condition - visible wear and minor functional notes. Drum rotates, wash cycles tested. Sold as-is with 7-day testing guarantee.",
  conditionGrade: "C",
  price: 6500,
  originalPrice: 12000,
  currency: "NGN",
  images: [
    img("photo-1555630441-b21f0a7e0c29"),
    img("photo-1555630441-b21f0a7e0c30"),
    img("photo-1555630441-b21f0a7e0c31"),
  ],
  imageAssets: [
    {
      id: "ia-4-a",
      url: img("photo-1555630441-b21f0a7e0c29"),
      alt: "Beko washing machine - front view, Grade C",
      position: 0,
      isPrimary: true,
      variantId: null,
    },
    {
      id: "ia-4-b",
      url: img("photo-1555630441-b21f0a7e0c30"),
      alt: "Beko washing machine - control panel",
      position: 1,
      isPrimary: false,
      variantId: null,
    },
    {
      id: "ia-4-c",
      url: img("photo-1555630441-b21f0a7e0c31"),
      alt: "Beko washing machine - drum interior",
      position: 2,
      isPrimary: false,
      variantId: null,
    },
  ],
  specifications: ["6kg capacity", "Multiple wash programs", "Energy rating C", "Spin speed 1000 RPM"],
  accessories: ["Inlet hose, drain hose, user manual"],
  stockQuantity: 1,
  fulfillmentType: "in_stock",
  dispatchLocation: "Lagos Depot",
  dispatchEta: "Dispatch: 3-5 days",
  meta: ["Grade C - Visible wear", "Sold with 7-day testing guarantee"],
  warrantyDays: 7,
  isVerified: true,
  popularity: 33,
  createdAt: "2024-02-15",
}
