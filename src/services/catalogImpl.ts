import { applyFilters, getCatalogue, getShipments, sortProducts } from "./catalog"
import type { FilterState, Product, Shipment, SortKey } from "../types"

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
    // Catalogue is loaded from the shared data module. Replace this with an
    // API call to serve live stock without touching the UI layer.
    this.products = getCatalogue()
  }

  async listProducts(filters?: FilterState): Promise<Product[]> {
    const results = filters ? applyFilters(this.products, filters) : [...this.products]
    return results
  }

  async listProductsSorted(sort: SortKey, filters?: FilterState): Promise<Product[]> {
    const results = await this.listProducts(filters)
    return sortProducts(results, sort)
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.find((p) => p.id === id)
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return this.products.find((p) => p.slug === slug)
  }

  async searchProducts(filters: FilterState): Promise<Product[]> {
    return this.listProducts(filters)
  }

  async listShipments(): Promise<Shipment[]> {
    return getShipments()
  }
}

/** Default repository instance */
export const productRepository = new DemoProductRepository()

