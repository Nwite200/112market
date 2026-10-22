import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  ArrowLeft,
  BadgeCheck,
  ClipboardList,
  Info,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react"
import { useProductContext } from "../context/ShopContext"
import { useAddToCart } from "../hooks/useAddToCart"
import { useDocumentMeta } from "../hooks/useDocumentMeta"
import {
  formatPrice,
  getAvailability,
  getConditionGradeLabel,
  getDiscountPercent,
} from "../services/sections"
import ProductGallery, { type GalleryImage } from "../components/products/ProductGallery"
import VariantSelector, { findVariant, isSelectionComplete } from "../components/products/VariantSelector"
import QuantitySelector from "../components/products/QuantitySelector"
import ConditionBadge from "../components/ui/ConditionBadge"
import Breadcrumbs from "../components/ui/Breadcrumbs"
import EmptyState from "../components/ui/EmptyState"

const CONDITION_LABEL = {
  A: "https://schema.org/NewCondition",
  B: "https://schema.org/UsedCondition",
  C: "https://schema.org/UsedCondition",
} as const

export default function ProductDetail() {
  const { slug = "" } = useParams<{ slug: string }>()
  const { products, loading, error } = useProductContext()
  const { addToCart, isAdded } = useAddToCart()

  const [quantity, setQuantity] = useState(1)
  const [selection, setSelection] = useState<Record<string, string>>({})

  const product = useMemo(
    () => products.find((item) => item.slug === slug),
    [products, slug]
  )

  useEffect(() => {
    setQuantity(1)
    setSelection({})
  }, [slug])

  const variant = useMemo(
    () => (product ? findVariant(product, selection) : undefined),
    [product, selection]
  )

  const price = variant?.price ?? product?.price ?? 0
  const originalPrice = variant?.originalPrice ?? product?.originalPrice
  const currency = product?.currency ?? "NGN"
  const stock = variant?.stockQuantity ?? product?.stockQuantity ?? 0
  const images: GalleryImage[] = useMemo(() => {
    if (!product) return []
    if (product.imageAssets?.length) {
      return [...product.imageAssets]
        .sort((a, b) => a.position - b.position)
        .map((asset) => ({ id: asset.id, url: asset.url, alt: asset.alt }))
    }
    return product.images.map((url, index) => ({
      id: `${product.id}-${index}`,
      url,
      alt: `${product.name} — photo ${index + 1}`,
    }))
  }, [product])

  const effectiveImages = useMemo(() => {
    if (variant?.images?.length) {
      return [
        { id: `${variant.id}-primary`, url: variant.images[0], alt: `${product?.name} — ${variant.name ?? "selected option"}` },
        ...images.filter((image) => image.url !== variant.images[0]),
      ]
    }
    return images
  }, [variant, images, product])

  useDocumentMeta({
    title: product ? product.name : "Product",
    description: product
      ? product.description.slice(0, 155)
      : "Graded second-hand household items from 112 Market.",
    image: effectiveImages[0]?.url,
    canonical: product ? `/product/${product.slug}` : undefined,
    type: "product",
  })

  useEffect(() => {
    if (!product) return
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: product.images,
      sku: product.sku,
      brand: { "@type": "Brand", name: product.brand },
      category: product.category,
      itemCondition: CONDITION_LABEL[product.conditionGrade],
      offers: {
        "@type": "Offer",
        price,
        priceCurrency: currency,
        availability:
          stock > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        itemCondition: CONDITION_LABEL[product.conditionGrade],
        seller: { "@type": "Organization", name: "112 Market" },
      },
    }
    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.textContent = JSON.stringify(structuredData)
    script.dataset.productSchema = product.id
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [product, price, currency, stock])

  if (loading) {
    return (
      <div className="container-page py-12" aria-busy="true">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="skeleton aspect-square w-full rounded-xl2" />
          <div className="space-y-4">
            <div className="skeleton h-4 w-24 rounded" />
            <div className="skeleton h-10 w-full rounded" />
            <div className="skeleton h-6 w-40 rounded" />
            <div className="skeleton h-24 w-full rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-page py-16">
        <EmptyState
          title="We could not load this product"
          description={error}
          action={
            <Link to="/products" className="btn-primary btn-sm">
              Back to products
            </Link>
          }
        />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container-page py-16">
        <EmptyState
          title="Product not found"
          description="This item may have sold or been removed from the catalogue."
          action={
            <Link to="/products" className="btn-primary btn-sm">
              Browse all products
            </Link>
          }
        />
      </div>
    )
  }

  const availability = getAvailability(product)
  const discount = getDiscountPercent({ ...product, price })
  const soldOut = availability.tone === "out-of-stock" && stock <= 0
  const requiresVariant =
    Boolean(product.variantOptions?.length) && !isSelectionComplete(product, selection)
  const added = isAdded(product, variant?.id)

  return (
    <div className="container-page py-8 lg:py-12">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "All products", to: "/products" },
          { label: product.category, to: `/category/${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductGallery
          images={effectiveImages}
          productName={product.name}
          overlay={<ConditionBadge grade={product.conditionGrade} />}
        />

        <div>
          <p className="eyebrow">{product.brand}</p>
          <h1 className="mt-2 text-display-sm font-extrabold text-ink">{product.name}</h1>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-3xl font-extrabold tracking-tight text-ink">
              {formatPrice(price, currency)}
            </span>
            {originalPrice && originalPrice > price && (
              <>
                <span className="text-base font-medium text-muted line-through">
                  {formatPrice(originalPrice, currency)}
                </span>
                {discount !== null && (
                  <span className="rounded-full bg-accent-100 px-2.5 py-1 text-xs font-bold text-accent-800">
                    Save {discount}%
                  </span>
                )}
              </>
            )}
          </div>

          <p className="mt-2 text-sm text-muted">
            Condition:{" "}
            <span className="font-semibold text-ink">
              {getConditionGradeLabel(product.conditionGrade)}
            </span>
            {product.warrantyDays > 0 ? ` · ${product.warrantyDays}-day warranty` : ""}
          </p>

          <p className="mt-4 leading-relaxed text-muted">{product.description}</p>

          {product.variantOptions?.length ? (
            <div className="mt-7">
              <VariantSelector
                product={product}
                selection={selection}
                onChange={(optionId, valueId) =>
                  setSelection((current) => ({ ...current, [optionId]: valueId }))
                }
              />
            </div>
          ) : null}

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              max={Math.max(1, stock || 99)}
              disabled={soldOut}
            />
            <button
              type="button"
              onClick={() => addToCart(product, quantity, variant?.id)}
              disabled={soldOut || requiresVariant}
              className={`btn btn-lg flex-1 sm:flex-none ${added ? "bg-success text-white hover:bg-success" : "btn-primary"}`}
            >
              {soldOut
                ? "Out of stock"
                : requiresVariant
                  ? "Choose an option"
                  : added
                    ? "Added to cart"
                    : "Add to cart"}
            </button>
          </div>

          {soldOut ? (
            <p className="mt-3 text-sm font-semibold text-danger">
              This item is currently out of stock. Check back — new stock arrives regularly.
            </p>
          ) : null}

          <dl className="mt-8 grid gap-3 rounded-xl2 border border-line bg-white p-5 sm:grid-cols-2">
            <div className="flex items-start gap-2.5">
              <Package className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-muted">Stock</dt>
                <dd className="text-sm font-semibold text-ink">
                  {stock > 0 ? `${stock} available` : "Out of stock"}
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-muted">Dispatch</dt>
                <dd className="text-sm font-semibold text-ink">
                  {product.dispatchLocation}
                  {product.dispatchEta ? ` · ${product.dispatchEta}` : ""}
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-muted">Guarantee</dt>
                <dd className="text-sm font-semibold text-ink">
                  {product.warrantyDays}-day testing guarantee
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-muted">Reference</dt>
                <dd className="text-sm font-semibold text-ink">{product.sku}</dd>
              </div>
            </div>
          </dl>

          {product.estimatedArrival ? (
            <p className="mt-3 flex items-start gap-2 rounded-xl2 bg-brand-50 p-4 text-sm text-ink">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
              {product.estimatedArrival}
            </p>
          ) : null}

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <section>
              <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
                <ClipboardList className="h-4 w-4 text-brand-700" aria-hidden="true" />
                Specifications
              </h2>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {product.specifications.map((spec) => (
                  <li key={spec} className="flex gap-2">
                    <span className="text-brand-700" aria-hidden="true">
                      •
                    </span>
                    {spec}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
                <Info className="h-4 w-4 text-brand-700" aria-hidden="true" />
                What&apos;s included
              </h2>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {product.accessories.map((accessory) => (
                  <li key={accessory} className="flex gap-2">
                    <span className="text-brand-700" aria-hidden="true">
                      •
                    </span>
                    {accessory}
                  </li>
                ))}
              </ul>
              {product.meta?.length ? (
                <ul className="mt-4 space-y-1.5 text-sm text-muted">
                  {product.meta.map((note) => (
                    <li key={note} className="flex gap-2">
                      <span className="text-accent-600" aria-hidden="true">
                        •
                      </span>
                      {note}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          </div>

          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to all products
          </Link>
        </div>
      </div>
    </div>
  )
}
