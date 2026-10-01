import { Link } from 'react-router-dom'
import SectionHeading from '../common/SectionHeading'
import ProductGrid from '../product/ProductGrid'
import { PRODUCTS } from '../../data/products'

export default function BestSellers() {
  const items = PRODUCTS.filter((p) => p.isBestSeller).sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8)
  return (
    <section className="bg-cream">
      <div className="container-site py-16 sm:py-20">
        <SectionHeading title="Best sellers" subtitle="The pieces our customers come back for, again and again." />
        <ProductGrid products={items} />
        <div className="mt-12 text-center"><Link to="/collections/best-sellers" className="btn-outline">View all</Link></div>
      </div>
    </section>
  )
}
