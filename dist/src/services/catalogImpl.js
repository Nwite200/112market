import { applyFilters, getCatalogue, getShipments, sortProducts } from "./catalog";
/** In-memory product repository using the demo data set */
export class DemoProductRepository {
    products;
    constructor() {
        // Catalogue is loaded from the shared data module. Replace this with an
        // API call to serve live stock without touching the UI layer.
        this.products = getCatalogue();
    }
    async listProducts(filters) {
        const results = filters ? applyFilters(this.products, filters) : [...this.products];
        return results;
    }
    async listProductsSorted(sort, filters) {
        const results = await this.listProducts(filters);
        return sortProducts(results, sort);
    }
    async getProductById(id) {
        return this.products.find((p) => p.id === id);
    }
    async getProductBySlug(slug) {
        return this.products.find((p) => p.slug === slug);
    }
    async searchProducts(filters) {
        return this.listProducts(filters);
    }
    async listShipments() {
        return getShipments();
    }
}
/** Default repository instance */
export const productRepository = new DemoProductRepository();
