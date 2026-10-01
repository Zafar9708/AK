import { Link } from 'react-router-dom'
import SmartImage from '../common/SmartImage'
import ProductCard from '../product/ProductCard'
import { PRODUCTS } from '../../data/products'
import { EDITORIAL } from '../../data/images'

export default function FeaturedCollection() {
  const picks = PRODUCTS.filter((p) => p.category === 'abayas' && p.isFeatured).concat(PRODUCTS.filter((p) => p.slug === 'stone-work-hijab-black' || p.slug === 'crescent-pendant-necklace')).slice(0, 4)
  return (
    <section className="bg-sand/60">
      <div className="container-site grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <SmartImage src={EDITORIAL.featured} alt="Woman in an embroidered beige abaya" className="aspect-[4/5] w-full" />
        </div>
        <div>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Occasion dressing, quietly done</h2>
          <p className="mt-4 max-w-md text-[15px] leading-7 text-muted">Hand-finished embroidery, pearl-trimmed sleeves and stone-work hijabs for Eid, nikahs and evenings that call for something more.</p>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8">
            {picks.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <Link to="/collections/abayas?sub=embellished" className="btn-dark mt-10">Shop the occasion edit</Link>
        </div>
      </div>
    </section>
  )
}
