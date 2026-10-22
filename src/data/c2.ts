import type { Product } from "../types"
import { img } from "./images"

/** Product P1 - Used sofa from a UK household */
export const P1: Product = {
  id: "p-used-sofa-001",
  sku: "SKU-NG-001",
  name: "Used 3-Seater Sofa - Grade B",
  slug: "used-3-seater-sofa-grade-b",
  brand: "Ikea",
  category: "Furniture & Living",
  categorySlug: "furniture",
  description:
    "Pre-owned 3-seater sofa from a UK household. Minor signs of use on the arms and cushions, structurally sound and comfortable for continued use. Cleaned and re-covered before it leaves the depot.",
  conditionGrade: "B",
  price: 8500,
  originalPrice: 15000,
  currency: "NGN",
  images: [
    img("photo-1555041469-a586c61ea9bc"),
    img("photo-1583847268964-b28dc8f51f92"),
    img("photo-1616627561950-9f746e330187"),
  ],
  imageAssets: [
    {
      id: "ia-1-a",
      url: img("photo-1555041469-a586c61ea9bc"),
      alt: "Pre-owned 3-seater sofa, Grade B, full view",
      position: 0,
      isPrimary: true,
      variantId: null,
    },
    {
      id: "ia-1-b",
      url: img("photo-1583847268964-b28dc8f51f92"),
      alt: "3-seater sofa in a bright living room setting",
      position: 1,
      isPrimary: false,
      variantId: null,
    },
    {
      id: "ia-1-c",
      url: img("photo-1616627561950-9f746e330187"),
      alt: "Close-up of sofa cushions showing light wear",
      position: 2,
      isPrimary: false,
      variantId: null,
    },
  ],
  specifications: [
    "3-seat sofa",
    "Approx. 205W x 90D cm",
    "UK Type G compatible",
    "Solid wood legs",
  ],
  accessories: ["Matching cushion covers", "Care kit"],
  stockQuantity: 3,
  fulfillmentType: "in_stock",
  dispatchLocation: "Lagos Depot",
  dispatchEta: "Dispatch: 1-2 days",
  meta: ["Grade B - minor signs of use", "Frame checked at depot"],
  warrantyDays: 30,
  isVerified: true,
  popularity: 96,
  createdAt: "2025-12-08",
  isFeatured: true,
}
