import type { ConditionGrade, FilterState } from "../../types"
import { LOCATION_OPTIONS } from "../../types"
import {
  getAllBrands,
  getAllCategories,
  getCoverageOptionsList,
  getSpecOptionsList,
} from "../../services/sections"

interface FilterPanelProps {
  filters: FilterState
  onChange: (patch: Partial<FilterState>) => void
  onReset: () => void
  /** Show the category checkbox group (used on the all-products page). */
  showCategories?: boolean
  className?: string
}

const GRADES: ConditionGrade[] = ["A", "B", "C"]

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

function Checkbox({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean
  onChange: () => void
  label: string
  hint?: string
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 py-1 text-sm text-ink transition-colors hover:text-brand-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-line text-brand-700 focus:ring-brand-600"
      />
      <span>
        {label}
        {hint ? <span className="block text-xs text-muted">{hint}</span> : null}
      </span>
    </label>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-5">
      <legend className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-ink">
        {title}
      </legend>
      <div className="space-y-0.5">{children}</div>
    </fieldset>
  )
}

/** Catalogue filter sidebar. Rendered inline on desktop and inside the mobile drawer. */
export default function FilterPanel({
  filters,
  onChange,
  onReset,
  showCategories = false,
  className = "",
}: FilterPanelProps) {
  const categories = getAllCategories()
  const brands = getAllBrands()
  const specs = getSpecOptionsList()
  const coverages = getCoverageOptionsList()

  return (
    <div className={`space-y-5 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-ink">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          className="rounded text-xs font-semibold text-brand-700 underline-offset-4 hover:underline"
        >
          Clear all
        </button>
      </div>

      <Group title="Availability">
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "All" },
            { id: "instock", label: "In stock" },
            { id: "preorder", label: "Pre-order" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange({ tab: tab.id as FilterState["tab"] })}
              aria-pressed={filters.tab === tab.id}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition-colors ${
                filters.tab === tab.id
                  ? "bg-brand-700 text-white ring-brand-700"
                  : "bg-white text-ink ring-line hover:ring-brand-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </Group>

      {showCategories && (
        <Group title="Category">
          {categories.map((category) => (
            <Checkbox
              key={category.slug}
              checked={filters.category === category.slug}
              onChange={() =>
                onChange({
                  category: filters.category === category.slug ? "all" : category.slug,
                })
              }
              label={category.label}
              hint={`${category.count} item${category.count === 1 ? "" : "s"}`}
            />
          ))}
        </Group>
      )}

      <Group title="Condition grade">
        {GRADES.map((grade) => (
          <Checkbox
            key={grade}
            checked={filters.grades.includes(grade)}
            onChange={() => onChange({ grades: toggle(filters.grades, grade) })}
            label={grade === "A" ? "Grade A – Like new" : grade === "B" ? "Grade B – Minor signs" : "Grade C – Value tier"}
          />
        ))}
      </Group>

      <Group title="Price (NGN)">
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="filter-min-price">
            Minimum price
          </label>
          <input
            id="filter-min-price"
            type="number"
            inputMode="numeric"
            min={0}
            step={500}
            value={filters.minPrice || ""}
            placeholder="Min"
            onChange={(event) => onChange({ minPrice: Number(event.target.value) || 0 })}
            className="h-10 w-full rounded-lg border border-line bg-white px-3 text-sm"
          />
          <span className="text-muted" aria-hidden="true">
            –
          </span>
          <label className="sr-only" htmlFor="filter-max-price">
            Maximum price
          </label>
          <input
            id="filter-max-price"
            type="number"
            inputMode="numeric"
            min={0}
            step={500}
            value={filters.maxPrice || ""}
            placeholder="Max"
            onChange={(event) => onChange({ maxPrice: Number(event.target.value) || 0 })}
            className="h-10 w-full rounded-lg border border-line bg-white px-3 text-sm"
          />
        </div>
      </Group>

      <Group title="Brand">
        {brands.map((brand) => (
          <Checkbox
            key={brand}
            checked={filters.brands.includes(brand)}
            onChange={() => onChange({ brands: toggle(filters.brands, brand) })}
            label={brand}
          />
        ))}
      </Group>

      <Group title="Dispatch from">
        {LOCATION_OPTIONS.map((location) => (
          <Checkbox
            key={location.id}
            checked={filters.locations.includes(location.id)}
            onChange={() => onChange({ locations: toggle(filters.locations, location.id) })}
            label={location.label}
          />
        ))}
      </Group>

      <Group title="Specifications">
        {specs.map((spec) => (
          <Checkbox
            key={spec.id}
            checked={filters.specs.includes(spec.id)}
            onChange={() => onChange({ specs: toggle(filters.specs, spec.id) })}
            label={spec.label}
          />
        ))}
      </Group>

      <Group title="Coverage">
        {coverages.map((coverage) => (
          <Checkbox
            key={coverage.id}
            checked={filters.coverages.includes(coverage.id)}
            onChange={() => onChange({ coverages: toggle(filters.coverages, coverage.id) })}
            label={coverage.label}
          />
        ))}
      </Group>
    </div>
  )
}
