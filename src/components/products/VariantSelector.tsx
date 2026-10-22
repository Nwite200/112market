import type { Product, ProductVariant } from "../../types"

/** Find the variant that matches the current option selection. */
export const findVariant = (
  product: Product,
  selection: Record<string, string>
): ProductVariant | undefined => {
  if (!product.variants?.length) return undefined
  return product.variants.find((variant) =>
    Object.entries(selection).every(([optionId, valueId]) => variant.optionValues[optionId] === valueId)
  )
}

/** True when every option has a value chosen. */
export const isSelectionComplete = (
  product: Product,
  selection: Record<string, string>
): boolean =>
  Boolean(product.variantOptions?.length) &&
  product.variantOptions!.every((option) => Boolean(selection[option.id]))

interface VariantSelectorProps {
  product: Product
  selection: Record<string, string>
  onChange: (optionId: string, valueId: string) => void
}

/**
 * Variant picker. Renders only when the product genuinely carries variant
 * options — no fake colour or size choices are ever created.
 */
export default function VariantSelector({
  product,
  selection,
  onChange,
}: VariantSelectorProps) {
  if (!product.variantOptions?.length) return null

  return (
    <div className="space-y-5">
      {product.variantOptions.map((option) => {
        const selectedValue = selection[option.id]
        return (
          <fieldset key={option.id}>
            <legend className="mb-2 text-sm font-semibold text-ink">
              {option.name}
              {selectedValue ? (
                <span className="ml-2 font-normal text-muted">
                  {
                    option.values.find((value) => value.id === selectedValue)?.label
                  }
                </span>
              ) : null}
            </legend>
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => {
                const isSelected = selectedValue === value.id
                return (
                  <button
                    key={value.id}
                    type="button"
                    onClick={() => onChange(option.id, value.id)}
                    aria-pressed={isSelected}
                    className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors ${
                      isSelected
                        ? "border-brand-700 bg-brand-50 text-brand-800"
                        : "border-line bg-white text-ink hover:border-brand-300"
                    }`}
                  >
                    {value.color ? (
                      <span
                        className="h-4 w-4 rounded-full ring-1 ring-black/10"
                        style={{ backgroundColor: value.color }}
                        aria-hidden="true"
                      />
                    ) : null}
                    {value.label}
                  </button>
                )
              })}
            </div>
          </fieldset>
        )
      })}
    </div>
  )
}
