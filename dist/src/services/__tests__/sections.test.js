import { describe, expect, it } from "vitest";
import { PRODUCTS } from "../../data";
import { formatPrice, getAllBrands, getAllCategories, getAvailability, getCategoryBySlug, getConditionGradeLabel, getDiscountPercent, getPromotionalProducts, selectFeatured, sortByNewest, } from "../sections";
describe("formatPrice", () => {
    it("renders Naira amounts without decimals", () => {
        const formatted = formatPrice(185000);
        expect(formatted).toContain("185,000");
        expect(formatted).toContain("₦");
        expect(formatted).not.toContain(".00");
    });
    it("handles zero", () => {
        expect(formatPrice(0)).toContain("0");
    });
});
describe("getAvailability", () => {
    it("flags low stock", () => {
        const product = { ...PRODUCTS[0], stockQuantity: 1, fulfillmentType: "in_stock" };
        expect(getAvailability(product).tone).toBe("low-stock");
    });
    it("flags out of stock", () => {
        const product = { ...PRODUCTS[0], stockQuantity: 0, fulfillmentType: "in_stock" };
        expect(getAvailability(product).tone).toBe("out-of-stock");
    });
    it("flags pre-order and keeps the arrival estimate", () => {
        const product = PRODUCTS.find((p) => p.fulfillmentType === "preorder");
        const availability = getAvailability(product);
        expect(availability.tone).toBe("preorder");
        expect(availability.detail).toBeTruthy();
    });
});
describe("getDiscountPercent", () => {
    it("calculates the markdown against the original price", () => {
        const product = PRODUCTS.find((p) => p.originalPrice && p.originalPrice > p.price);
        const percent = getDiscountPercent(product);
        expect(percent).toBeGreaterThan(0);
        expect(percent).toBeLessThan(100);
    });
    it("returns null when there is no genuine markdown", () => {
        const product = PRODUCTS.find((p) => !p.originalPrice);
        expect(getDiscountPercent(product)).toBeNull();
    });
});
describe("categories", () => {
    it("only lists categories that contain products", () => {
        const categories = getAllCategories();
        expect(categories.length).toBeGreaterThan(0);
        expect(categories.every((category) => category.count > 0)).toBe(true);
    });
    it("counts match the catalogue", () => {
        const category = getCategoryBySlug("furniture");
        const expected = PRODUCTS.filter((p) => p.categorySlug === "furniture").length;
        expect(category.count).toBe(expected);
    });
    it("returns undefined for an unknown slug", () => {
        expect(getCategoryBySlug("not-a-category")).toBeUndefined();
    });
});
describe("brands", () => {
    it("only lists brands that exist in the catalogue", () => {
        const brands = getAllBrands();
        expect(brands.length).toBeGreaterThan(0);
        expect(brands.every((brand) => PRODUCTS.some((p) => p.brand === brand))).toBe(true);
    });
});
describe("grade labels", () => {
    it("labels each grade", () => {
        expect(getConditionGradeLabel("A")).toContain("Like New");
        expect(getConditionGradeLabel("B")).toContain("Minor Signs");
        expect(getConditionGradeLabel("C")).toContain("Value Tier");
    });
});
describe("selection helpers", () => {
    it("selects featured products only", () => {
        const featured = selectFeatured(PRODUCTS);
        expect(featured.length).toBeGreaterThan(0);
        expect(featured.every((p) => p.isFeatured)).toBe(true);
    });
    it("sorts by newest first", () => {
        const sorted = sortByNewest(PRODUCTS);
        const times = sorted.map((p) => new Date(p.createdAt).getTime());
        expect(times).toEqual([...times].sort((a, b) => b - a));
    });
    it("lists only products with a genuine markdown as promotions", () => {
        const promotions = getPromotionalProducts();
        expect(promotions.every((p) => p.originalPrice && p.originalPrice > p.price)).toBe(true);
    });
});
