import { applyFilters, getShipments } from "./catalog";
/** In-memory product repository using the demo data set */
export class DemoProductRepository {
    products;
    constructor() {
        // Import all products from data files
        const { P1, P2, P3, P4, P5, P25 } = await import("../data");
        this.products = [P1, P2, P3, P4, P5, P25];
    }
    async listProducts(filters) {
        let results = [...this.products];
        if (filters) {
            results = applyFilters(results, filters);
        }
        return results;
    }
    async getProductById(id) {
        return this.products.find((p) => p.id === id);
    }
    async getProductBySlug(slug) {
        return this.products.find((p) => p.slug === slug);
    }
    async searchProducts(filters) {
        const products = await this.listProducts(filters);
        return products;
    }
    async listShipments() {
        return getShipments();
    }
}
/** Default repository instance */
export const productRepository = new DemoProductRepository();
