import { describe, expect, it } from "vitest";
import { PRODUCTS } from "../../data";
import { DEFAULT_FILTERS } from "../../context/ShopContext";
import { applyFilters, locationOf, matchesFilters, paginate, sortProducts, } from "../catalog";
const filter = (patch) => ({
    ...DEFAULT_FILTERS,
    ...patch,
});
describe("applyFilters", () => {
    it("returns the whole catalogue when no filters are active", () => {
        expect(applyFilters(PRODUCTS, filter({}))).toHaveLength(PRODUCTS.length);
    });
    it("filters by category slug", () => {
        const results = applyFilters(PRODUCTS, filter({ category: "kitchen" }));
        expect(results.length).toBeGreaterThan(0);
        expect(results.every((p) => p.categorySlug === "kitchen")).toBe(true);
    });
    it("filters by condition grade", () => {
        const results = applyFilters(PRODUCTS, filter({ grades: ["A"] }));
        expect(results.every((p) => p.conditionGrade === "A")).toBe(true);
        expect(results.length).toBeGreaterThan(0);
    });
    it("filters by brand", () => {
        const results = applyFilters(PRODUCTS, filter({ brands: ["Ikea"] }));
        expect(results.length).toBeGreaterThan(0);
        expect(results.every((p) => p.brand === "Ikea")).toBe(true);
    });
    it("filters by price range", () => {
        const results = applyFilters(PRODUCTS, filter({ minPrice: 10000, maxPrice: 50000 }));
        expect(results.every((p) => p.price >= 10000 && p.price <= 50000)).toBe(true);
    });
    it("filters by search query across name, brand and description", () => {
        const results = applyFilters(PRODUCTS, filter({ query: "sofa" }));
        expect(results.length).toBeGreaterThan(0);
        expect(results.every((p) => p.name.toLowerCase().includes("sofa"))).toBe(true);
    });
    it("filters by availability tab", () => {
        const preorder = applyFilters(PRODUCTS, filter({ tab: "preorder" }));
        expect(preorder.length).toBeGreaterThan(0);
        expect(preorder.every((p) => p.fulfillmentType === "preorder")).toBe(true);
    });
    it("filters by dispatch location", () => {
        const depot = applyFilters(PRODUCTS, filter({ locations: ["depot"] }));
        expect(depot.length).toBeGreaterThan(0);
        expect(depot.every((p) => locationOf(p) === "depot")).toBe(true);
    });
    it("filters by spec option using catalogue data", () => {
        const results = applyFilters(PRODUCTS, filter({ specs: ["plug"] }));
        expect(results.length).toBeGreaterThan(0);
        expect(results.every((p) => p.specifications.some((s) => /type g/i.test(s)))).toBe(true);
    });
    it("filters by coverage using the recorded warranty window", () => {
        const results = applyFilters(PRODUCTS, filter({ coverages: ["30day"] }));
        expect(results.length).toBeGreaterThan(0);
        expect(results.every((p) => p.warrantyDays >= 30)).toBe(true);
    });
    it("returns nothing when filters conflict", () => {
        expect(applyFilters(PRODUCTS, filter({ brands: ["Ikea"], minPrice: 999999 }))).toEqual([]);
    });
});
describe("matchesFilters", () => {
    it("excludes a product whose grade does not match", () => {
        const product = PRODUCTS.find((p) => p.conditionGrade === "A");
        expect(matchesFilters(product, filter({ grades: ["C"] }))).toBe(false);
    });
});
describe("sortProducts", () => {
    it("sorts by newest first", () => {
        const sorted = sortProducts(PRODUCTS, "newest");
        const timestamps = sorted.map((p) => new Date(p.createdAt).getTime());
        expect(timestamps).toEqual([...timestamps].sort((a, b) => b - a));
    });
    it("sorts by ascending price", () => {
        const prices = sortProducts(PRODUCTS, "price-asc").map((p) => p.price);
        expect(prices).toEqual([...prices].sort((a, b) => a - b));
    });
    it("sorts by descending price", () => {
        const prices = sortProducts(PRODUCTS, "price-desc").map((p) => p.price);
        expect(prices).toEqual([...prices].sort((a, b) => b - a));
    });
    it("sorts by popularity", () => {
        const popularity = sortProducts(PRODUCTS, "popularity").map((p) => p.popularity);
        expect(popularity).toEqual([...popularity].sort((a, b) => b - a));
    });
    it("does not mutate the source array", () => {
        const source = [...PRODUCTS];
        sortProducts(source, "price-asc");
        expect(source).toEqual(PRODUCTS);
    });
});
describe("paginate", () => {
    const items = Array.from({ length: 25 }, (_, index) => index);
    it("returns the requested page", () => {
        const page = paginate(items, 2, 10);
        expect(page.items).toEqual([10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
        expect(page.pageCount).toBe(3);
        expect(page.total).toBe(25);
    });
    it("clamps an out-of-range page", () => {
        expect(paginate(items, 99, 10).page).toBe(3);
        expect(paginate(items, 0, 10).page).toBe(1);
    });
    it("reports neighbouring pages", () => {
        expect(paginate(items, 1, 10).hasPrevious).toBe(false);
        expect(paginate(items, 1, 10).hasNext).toBe(true);
        expect(paginate(items, 3, 10).hasNext).toBe(false);
    });
});
