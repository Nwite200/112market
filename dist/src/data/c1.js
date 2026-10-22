/**
 * Browsing taxonomy for 112 Market.
 *
 * Every category here is backed by at least one product in the catalogue
 * (`src/data/asm.ts`). Counts are computed from the catalogue at runtime by
 * `getAllCategories()` — the `count` field below is only a seed value.
 */
export const CATEGORIES = [
    {
        slug: "furniture",
        label: "Furniture & Living",
        description: "Sofas, dining sets and bedroom pieces from UK households, graded and described before dispatch.",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=70",
    },
    {
        slug: "kitchen",
        label: "Kitchen & Appliances",
        description: "Kitchen appliances, laundry and cookware tested at our Lagos depot before they are listed.",
        image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=900&q=70",
    },
    {
        slug: "home",
        label: "Home & Cleaning",
        description: "Vacuums, lighting and everyday home essentials that still work as they did in the UK.",
        image: "https://images.unsplash.com/photo-1512446816042-444d641267d4?auto=format&fit=crop&w=900&q=70",
    },
    {
        slug: "electronics",
        label: "Electronics & Media",
        description: "TVs, laptops and audio gear powered on and verified before they leave the depot.",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=70",
    },
    {
        slug: "tools",
        label: "Tools & Garden",
        description: "Power tools, garden equipment and outdoor gear cleared from UK homes and workspaces.",
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=70",
    },
];
/** Brands that actually appear in the catalogue. */
export const BRANDS = [
    "Ikea",
    "Kenwood",
    "Beko",
    "Bosch",
    "Samsung",
    "Apple",
    "Dyson",
    "Roberts",
    "Panasonic",
    "Philips",
    "Decathlon",
];
/** Specification filters. Each id maps to a matcher in `services/catalog.ts`. */
export const SPEC_OPTIONS = [
    { id: "plug", label: "UK Type G plug" },
    { id: "voltage", label: "220–240V" },
    { id: "energy", label: "Energy rating A–C" },
    { id: "dimensions", label: "Dimensions published" },
    { id: "manual", label: "User manual included" },
    { id: "tested", label: "Function tested in depot" },
];
/** Coverage options. Each id maps to a matcher in `services/catalog.ts`. */
export const COVERAGE_OPTIONS = [
    { id: "30day", label: "30-Day Testing Guarantee (Free)" },
    { id: "90day", label: "90-Day Extended Depot Protection" },
];
