import { Link } from 'react-router-dom'
import SmartImage from '../common/SmartImage'
import SectionHeading from '../common/SectionHeading'
import { CATEGORIES } from '../../data/categories'

const SHOW = ['hijabs', 'abayas', 'clothing', 'accessories', 'jewellery', 'turkish-cord-sets', 'skincare']

export default function CategoryGrid() {
  const cats = SHOW.map((s) => CATEGORIES.find((c) => c.slug === s))
  return (
    <section className="container-site py-16 sm:py-20">
      <SectionHeading title="Shop by category" />
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:-mx-6 sm:gap-4 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-7 lg:overflow-visible lg:px-0">
        {cats.map((c) => (
          <Link key={c.slug} to={`/collections/${c.slug}`} className="group w-[40%] shrink-0 snap-start sm:w-[28%] lg:w-auto">
            <SmartImage src={c.image} alt={c.label} fallbackLabel={c.label} className="aspect-[3/4] w-full" imgClassName="transition-transform duration-700 group-hover:scale-105" />
            <p className="mt-3 text-center text-[12px] uppercase tracking-[0.16em] sm:text-[13px]">
              <span className="link-underline">{c.label}</span>
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
