export function ProductCardSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="aspect-[3/4] w-full animate-pulse bg-sand" />
      <div className="mt-3 h-3 w-3/4 animate-pulse bg-sand" />
      <div className="mt-2 h-3 w-1/3 animate-pulse bg-sand" />
    </div>
  )
}

export function GridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => <ProductCardSkeleton key={i} />)}
    </div>
  )
}
