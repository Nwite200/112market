import React from "react"
import { useProductContext } from "../context/ShopContext"
import { useFilterContext } from "../context/ShopContext"
import { useShippingContext } from "../context/ShopContext"
import {
  getAllCategories,
  getAllBrands,
  getSpecOptionsList,
  getCoverageOptionsList,
  formatPrice,
  getConditionGradeLabel,
} from "../services/sections"
import { productRepository } from "../services/catalogImpl"
import { ProductCard } from "../components/products/ProductCard"
import { AnnouncementBar } from "../layout/AnnouncementBar"
export default function Home() {
  const { products, loading, error } = useProductContext()
  const { filters, setFilters } = useFilterContext()
  const { shipments, loading: shipmentsLoading } = useShippingContext()

  React.useEffect(() => {
    productRepository.listProducts().then((p) => {
      // Products loaded via repository
    })
  }, [])

  const categories = getAllCategories()
  const brands = getAllBrands()
  const specOptions = getSpecOptionsList()
  const coverageOptions = getCoverageOptionsList()

  const filteredProducts = products || []

  return (
    <section className="py-12">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4">
        {announcement}

        <header className="mb-12">
          <h1 className="text-4xl font-bold text-text mb-3">
            Quality Pre-Owned Household Items
          </h1>
          <p className="text-lg text-muted-foreground">
            UK-sourced, carefully described delivery to Nigeria
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              onChange={(e) =>
                setFilters({ category: e.target.value || "all" })
              }
              className="w-full rounded border px-3 py-2"
            >
              <option value="all">All Categories</option>
              {Object.entries(categories).map(([slug, label]) => (
                <option key={slug} value={slug}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Condition</label>
            <select
              onChange={(e) =>
                setFilters({
                  grades:
                    e.target.value !== ""
                      ? [e.target.value as ConditionGrade]
                      : [],
                })
              }
              className="w-full rounded border px-3 py-2"
            >
              <option value="">All Conditions</option>
              <option value="A">{getConditionGradeLabel("A")}</option>
              <option value="B">{getConditionGradeLabel("B")}</option>
              <option value="C">{getConditionGradeLabel("C")}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Brand</label>
            <select
              onChange={(e) =>
                setFilters({
                  brands: e.target.value ? [e.target.value] : [],
                })
              }
              className="w-full rounded border px-3 py-2"
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price Range</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                step="100"
                onChange={(e) =>
                  setFilters({ minPrice: Number(e.target.value) || 0 })
                }
                className="rounded-l border px-3 py-2 flex-1"
              />
              <span className="text-sm text-muted-foreground">-</span>
              <input
                type="number"
                min="0"
                step="100"
                onChange={(e) =>
                  setFilters({ maxPrice: Number(e.target.value) || 999999 })
                }
                className="rounded-r border px-3 py-2"
              />
        </div>
            </div>
          </div>

        <section className="mb-12">
          <h2 className="text-xl font-medium text-text mb-4">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.entries(categories).map(([slug, label]) => (
              <button
                key={slug}
                className="group flex-1 flex flex-col items-center gap-2 rounded border px-4 py-3 text-sm font-medium hover:bg-primary/5 transition-colors"
              >
                <span className="text-primary">{label}</span>
                <p className="text-xs text-muted-foreground">{slug}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-medium text-text mb-6">
            Featured & Latest Arrivals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  No products match your filters. Try adjusting your search criteria.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-medium text-text mb-6">
            Why Shop with 112 Market?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 rounded border border-border hover:border-primary/30 transition-colors">
              <div className="text-3xl font-bold text-primary mb-2">Grade A-C</div>
              <p className="text-muted-foreground">
                Products graded honestly from Grade A (Like New) to Grade C (Value Tier), with detailed condition descriptions for every item.
              </p>
            </div>
            <div className="p-4 rounded border border-border hover:border-primary/30 transition-colors">
              <div className="text-3xl font-bold text-primary mb-2">NGN Pricing</div>
              <p className="text-muted-foreground">
                All prices displayed in Nigerian Naira (NGN) with transparent original pricing shown when applicable.
              </p>
            </div>
            <div className="p-4 rounded border border-border hover:border-primary/30 transition-colors">
              <div className="text-3xl font-bold text-primary mb-2">UK Source</div>
              <p className="text-muted-foreground">
                Items carefully sourced from the UK, with dispatch from our Lagos depot.
              </p>
            </div>
            <div className="p-4 rounded border border-border hover:border-primary/30 transition-colors">
              <div className="text-3xl font-bold text-primary mb-2">Delivery Options</div>
              <p className="text-muted-foreground">
                Multiple delivery options available including depot delivery and container-based shipping to major Nigerian cities.
              </p>
            </div>
          </div>
        </section>

      </div>
    </section>
  )
}