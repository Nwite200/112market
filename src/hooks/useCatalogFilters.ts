import { useCallback, useEffect, useMemo, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import type { ConditionGrade, FilterState, SortKey } from "../types"
import { DEFAULT_FILTERS, useFilterContext } from "../context/ShopContext"

const SORT_KEYS: SortKey[] = ["newest", "price-asc", "price-desc", "popularity", "grade"]

const parseGrades = (value: string | null): ConditionGrade[] =>
  value
    ? (value.split(",").filter((g): g is ConditionGrade => ["A", "B", "C"].includes(g)) as ConditionGrade[])
    : []

const parseList = (value: string | null): string[] => (value ? value.split(",").filter(Boolean) : [])

const parseNumber = (value: string | null): number => {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
}

/** Read the filter state out of the URL. */
export const parseFilters = (
  params: URLSearchParams,
  defaults: Partial<FilterState> = {}
): FilterState => {
  const tab = params.get("tab")
  return {
    ...DEFAULT_FILTERS,
    ...defaults,
    query: params.get("q") ?? "",
    category: params.get("category") ?? defaults.category ?? "all",
    grades: parseGrades(params.get("grades")),
    brands: parseList(params.get("brands")),
    specs: parseList(params.get("specs")),
    coverages: parseList(params.get("coverages")),
    locations: parseList(params.get("locations")),
    minPrice: parseNumber(params.get("minPrice")),
    maxPrice: parseNumber(params.get("maxPrice")),
    tab: tab === "instock" || tab === "preorder" ? tab : "all",
  }
}

/** Serialise the filter state back into the URL. */
export const buildParams = (filters: FilterState, extra?: Record<string, string>): URLSearchParams => {
  const params = new URLSearchParams()
  if (filters.query) params.set("q", filters.query)
  if (filters.category && filters.category !== "all") params.set("category", filters.category)
  if (filters.grades.length) params.set("grades", filters.grades.join(","))
  if (filters.brands.length) params.set("brands", filters.brands.join(","))
  if (filters.specs.length) params.set("specs", filters.specs.join(","))
  if (filters.coverages.length) params.set("coverages", filters.coverages.join(","))
  if (filters.locations.length) params.set("locations", filters.locations.join(","))
  if (filters.minPrice > 0) params.set("minPrice", String(filters.minPrice))
  if (filters.maxPrice > 0) params.set("maxPrice", String(filters.maxPrice))
  if (filters.tab !== "all") params.set("tab", filters.tab)
  Object.entries(extra ?? {}).forEach(([key, value]) => {
    if (value) params.set(key, value)
  })
  return params
}

/**
 * Keeps the shared filter context and the URL in sync so catalogue pages are
 * shareable and the browser back button behaves as expected.
 */
export function useCatalogFilters(defaults: Partial<FilterState> = {}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { filters, setFilters, replaceFilters } = useFilterContext()
  const lastWritten = useRef<string>("")

  // Hydrate from the URL whenever the URL changed outside of this hook.
  useEffect(() => {
    const key = searchParams.toString()
    if (key === lastWritten.current) return
    lastWritten.current = key
    replaceFilters(parseFilters(searchParams, defaults))
    // `defaults` is derived from the route and only changes with it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const update = useCallback(
    (patch: Partial<FilterState>) => {
      setFilters(patch)
      const next = buildParams({ ...filters, ...patch })
      lastWritten.current = next.toString()
      setSearchParams(next, { replace: true })
    },
    [filters, setFilters, setSearchParams]
  )

  const reset = useCallback(() => {
    const next = buildParams({ ...DEFAULT_FILTERS, ...defaults })
    lastWritten.current = next.toString()
    replaceFilters({ ...DEFAULT_FILTERS, ...defaults })
    setSearchParams(next, { replace: true })
  }, [defaults, replaceFilters, setSearchParams])

  const sort = useMemo<SortKey>(() => {
    const value = searchParams.get("sort")
    return value && SORT_KEYS.includes(value as SortKey) ? (value as SortKey) : "newest"
  }, [searchParams])

  const setSort = useCallback(
    (value: SortKey) => {
      const params = new URLSearchParams(searchParams)
      if (value === "newest") params.delete("sort")
      else params.set("sort", value)
      lastWritten.current = params.toString()
      setSearchParams(params, { replace: true })
    },
    [searchParams, setSearchParams]
  )

  const page = useMemo(() => {
    const value = Number(searchParams.get("page"))
    return Number.isFinite(value) && value > 0 ? value : 1
  }, [searchParams])

  const setPage = useCallback(
    (value: number) => {
      const params = new URLSearchParams(searchParams)
      if (value <= 1) params.delete("page")
      else params.set("page", String(value))
      lastWritten.current = params.toString()
      setSearchParams(params, { replace: true })
    },
    [searchParams, setSearchParams]
  )

  return { filters, update, reset, sort, setSort, page, setPage, searchParams }
}

export default useCatalogFilters
