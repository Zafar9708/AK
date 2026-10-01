import ProductCard from './ProductCard'

export default function ProductGrid({ products, columns = 'default', eagerCount = 0 }) {
  const cols = columns === 'wide'
    ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5'
    : columns === 'three'
      ? 'grid-cols-2 md:grid-cols-3'
      : columns === 'three-lg'
        ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
        : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  return (
    <div className={`grid ${cols} gap-x-3 gap-y-9 sm:gap-x-5`}>
      {products.map((p, i) => <ProductCard key={p.id} product={p} eager={i < eagerCount} />)}
    </div>
  )
}
