import { Link } from 'react-router-dom'
import SmartImage from '../common/SmartImage'
import SectionHeading from '../common/SectionHeading'
import { img, IMG } from '../../data/images'

const STYLES = [
  { label: 'Jersey', sub: 'jersey', image: IMG.H8, note: 'Everyday, no-pin grip' },
  { label: 'Modal', sub: 'modal', image: IMG.H9, note: 'Silky and breathable' },
  { label: 'Georgette', sub: 'malaysian-georgette', image: IMG.H7, note: 'Light, holds pleats' },
  { label: 'Pashmina', sub: 'pashmina', image: IMG.H10, note: 'Warm, wrap-friendly' },
  { label: 'Bamboo', sub: 'bamboo-jersey', image: IMG.H1, note: 'Cool for summer' },
  { label: 'Instant', sub: 'turkish-instant', image: IMG.H2, note: 'Slip on in seconds' },
  { label: 'Printed', sub: 'printed-chiffon', image: IMG.H11, note: 'Soft florals' },
]

export default function HijabStyles() {
  return (
    <section className="container-site py-16 sm:py-20">
      <SectionHeading title="Shop hijabs by style" subtitle="Every fabric wears differently. Find the one that suits your day." to="/collections/hijabs" linkLabel="All hijabs" />
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:-mx-6 sm:gap-4 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-7 lg:overflow-visible lg:px-0">
        {STYLES.map((s) => (
          <Link key={s.sub} to={`/collections/hijabs?sub=${s.sub}`} className="group relative w-[44%] shrink-0 snap-start sm:w-[30%] lg:w-auto">
            <SmartImage src={img(s.image, 600)} alt={`${s.label} hijab`} fallbackLabel={s.label} className="aspect-[2/3] w-full" imgClassName="transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12 text-white">
              <p className="font-serif text-2xl leading-none">{s.label}</p>
              <p className="mt-1.5 text-[12px] text-white/85">{s.note}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
