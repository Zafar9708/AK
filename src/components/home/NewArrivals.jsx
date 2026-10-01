import { Link } from 'react-router-dom'
import SectionHeading from '../common/SectionHeading'
import ProductGrid from '../product/ProductGrid'
import { PRODUCTS } from '../../data/products'

export default function NewArrivals() {
  const items = PRODUCTS.filter((p) => p.isNew).slice(0, 8)
  return (
    <section className="container-site pb-16 sm:pb-20">
      <SectionHeading title="New arrivals" subtitle="Fresh fabrics and new shades, added this season." />
      <ProductGrid products={items} />
      <div className="mt-12 text-center"><Link to="/collections/new-arrivals" className="btn-outline">View all</Link></div>
    </section>
  )
}
