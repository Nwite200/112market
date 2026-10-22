import { applyFilters, getCategories, getBrands, getSpecOptions, getCoverageOptions, getShipments, type Product, type FilterState } from "./catalog"

/** Repository interface for product catalogue */
export interface ProductRepository {
  listProducts(filters?: FilterState): Promise<Product[]>
  getProductById(id: string): Promise<Product | undefined>
  getProductBySlug(slug: string): Promise<Product | undefined>
  searchProducts(filters: FilterState): Promise<Product[]>
  listShipments(): Promise<Shipment[]>
}

/** In-memory product repository using the demo data set */
export class DemoProductRepository implements ProductRepository {
  private products: Product[]

  constructor() {
    // Import all products from data files
    const { P1, P2, P3, P4, P5, P25 } = await import("../data")
    this.products = [P1, P2, P3, P4, P5, P25]
  }

  async listProducts(filters?: FilterState): Promise<Product[]> {
    let results = [...this.products]
    if (filters) {
      results = applyFilters(results, filters)
    }
    return results
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.find((p) => p.id === id)
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return this.products.find((p) => p.slug === slug)
  }

  async searchProducts(filters: FilterState): Promise<Product[]> {
    const products = await this.listProducts(filters)
    return products
  }

  async listShipments(): Promise<Shipment[]> {
    return getShipments()
  }
}

/** Default repository instance */
export const productRepository = new DemoProductRepository()

/** Type exports */
export type { ProductRepository }
