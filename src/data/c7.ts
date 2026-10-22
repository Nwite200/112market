import type { Product } from "../types"

export const img = (id: string): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`

/** Product P25 - Used furniture item */
export const P25: Product = {
  id: "p-used-chair-025",
  sku: "SKU-NG-025",
  name: "Used Dining Chair (Set of 4) - Grade A",
  slug: "used-dining-chair-set-grade-a",
  brand: "Ikea",
  category: "Furniture & Living",
  categorySlug: "furniture",
  description:
    "Pre-owned set of 4 dining chairs from UK household. Grade A condition - excellent preservation, minimal signs of use. Original fabric intact, wooden frames in excellent condition.",
  conditionGrade: "A",
  price: 12000, // per set of 4
  originalPrice: 25000,
  currency: "NGN",
  images: [
    img("photo-1555630441-b21f0a7e0c35"),
    img("photo-1555630441-b21f0a7e0c36"),
    img("photo-1555630441-b21f0a7e0c37"),
  ],
  imageAssets: [
    {
      id: "ia-25-a",
      url: img("photo-1555630441-b21f0a7e0c35"),
      alt: "Set of 4 dining chairs - front view, Grade A",
      position: 0,
      isPrimary: true,
      variantId: null,
    },
    {
      id: "ia-25-b",
      url: img("photo-1555630441-b21f0a7e0c36"),
      alt: "Set of 4 dining chairs - side view",
      position: 1,
      isPrimary: false,
      variantId: null,
    },
    {
      id: "ia-25-c",
      url: img("photo-1555630441-b21f0a7e0c37"),
      alt: "Set of 4 dining chairs - detail of wood finish",
      position: 2,
      isPrimary: false,
      variantId: null,
    },
  ],
  specifications: ["Set of 4 chairs", "Wooden frame", "Fabric seat upholstery", "Dimensions: 45W x 55D x 85H cm"],
  accessories: ["Additional sets available"],
  stockQuantity: 1,
  fulfillmentType: "in_stock",
  dispatchLocation: "Lagos Depot",
  dispatchEta: "Dispatch: 3-5 days",
  meta: ["Grade A - Excellent condition", "Set of 4"],
  warrantyDays: 30,
  isVerified: true,
  popularity: 28,
  createdAt: "2024-05-10",
}

/** Demo notice */
export const DEMO_NOTICE =
  "Demonstration inventory — connect Supabase or your backend to serve live stock for 112 Market UK-to-Nigeria fairly used household items."

/** Categories */
export const CATEGORIES = [
  { slug: "furniture", label: "Furniture & Living", count: 25 },
  { slug: "kitchen", label: "Kitchen & Appliances", count: 18 },
  { slug: "home", label: "Home & Electronics", count: 32 },
  { slug: "tools", label: "Tools & Garden", count: 12 },
  { slug: "electronics", label: "Electronics & Media", count: 21 },
]

/** Brands */
export const BRANDS = [
  "Ikea",
  "Sony",
  "Bosch",
  "Philips",
  "Dyson",
  "De'Longhi",
  "Kenwood",
  "Russell Hobbs",
  "Beko",
  "Hotpoint",
]

/** Specification options */
export const SPEC_OPTIONS = [
  { id: "type-g", label: "Standard UK 3-Pin (Type G)" },
  { id: "220v", label: "220V-240V Native Frequency" },
  { id: "usbc", label: "Universal USB-C PD Units" },
  { id: "dimensions", label: "Custom Dimensions (cm)" },
  { id: "condition", label: "Condition Grade" },
]

/** Coverage options */
export const COVERAGE_OPTIONS = [
  { id: "30day", label: "30-Day Testing Guarantee (Free)" },
  { id: "90day", label: "90-Day Extended Depot Protection" },
]
