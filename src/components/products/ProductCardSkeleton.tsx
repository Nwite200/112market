/** Loading placeholder that mirrors the product card layout. */
export default function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl2 border border-line bg-surface">
      <div className="skeleton aspect-[4/5] w-full" />
      <div className="flex flex-1 flex-col p-4">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton mt-3 h-4 w-full rounded" />
        <div className="skeleton mt-2 h-4 w-2/3 rounded" />
        <div className="skeleton mt-4 h-3 w-24 rounded" />
        <div className="skeleton mt-3 h-6 w-20 rounded" />
        <div className="skeleton mt-4 h-9 w-full rounded-full" />
      </div>
    </div>
  )
}
