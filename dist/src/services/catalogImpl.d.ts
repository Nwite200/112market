import { type Product, type FilterState } from "./catalog";
/** Repository interface for product catalogue */
export interface ProductRepository {
    listProducts(filters?: FilterState): Promise<Product[]>;
    getProductById(id: string): Promise<Product | undefined>;
    getProductBySlug(slug: string): Promise<Product | undefined>;
    searchProducts(filters: FilterState): Promise<Product[]>;
    listShipments(): Promise<Shipment[]>;
}
/** In-memory product repository using the demo data set */
export declare class DemoProductRepository implements ProductRepository {
    private products;
    constructor();
    listProducts(filters?: FilterState): Promise<Product[]>;
    getProductById(id: string): Promise<Product | undefined>;
    getProductBySlug(slug: string): Promise<Product | undefined>;
    searchProducts(filters: FilterState): Promise<Product[]>;
    listShipments(): Promise<Shipment[]>;
}
/** Default repository instance */
export declare const productRepository: DemoProductRepository;
/** Type exports */
export type { ProductRepository };
