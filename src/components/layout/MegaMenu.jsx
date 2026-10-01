import { Link } from 'react-router-dom'
import { HIJAB_STYLES, CATEGORIES } from '../../data/categories'
import { EDITORIAL } from '../../data/images'
import SmartImage from '../common/SmartImage'

export default function MegaMenu({ onNavigate }) {
  const accessories = CATEGORIES.find((c) => c.slug === 'accessories').subcategories
  return (
    <div className="absolute inset-x-0 top-full z-40 animate-slideDown border-t border-line bg-white shadow-[0_12px_30px_-12px_rgba(36,36,36,0.18)]">
      <div className="container-site grid grid-cols-12 gap-10 py-10">
        <div className="col-span-6">
          <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-muted">Shop hijabs by fabric</p>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 xl:grid-cols-3">
            {HIJAB_STYLES.map((s) => (
              <li key={s.slug}>
                <Link to={`/collections/hijabs?sub=${s.slug}`} onClick={onNavigate} className="link-underline text-[14px] text-ink hover:text-cocoa">{s.label}</Link>
              </li>
            ))}
            <li><Link to="/collections/hijabs" onClick={onNavigate} className="text-[14px] font-medium underline underline-offset-4">All hijabs</Link></li>
          </ul>
        </div>
        <div className="col-span-2">
          <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-muted">Hijab essentials</p>
          <ul className="space-y-2.5">
            {accessories.map((s) => (
              <li key={s.slug}><Link to={`/collections/accessories?sub=${s.slug}`} onClick={onNavigate} className="link-underline text-[14px]">{s.label}</Link></li>
            ))}
            <li><Link to="/collections/new-arrivals" onClick={onNavigate} className="link-underline text-[14px]">New arrivals</Link></li>
            <li><Link to="/collections/best-sellers" onClick={onNavigate} className="link-underline text-[14px]">Best sellers</Link></li>
          </ul>
        </div>
        <Link to="/collections/hijabs?sub=modal" onClick={onNavigate} className="group col-span-4 grid grid-cols-2 items-end gap-5 bg-cream">
          <SmartImage src={EDITORIAL.megaMenu} alt="Woman wearing a soft ivory modal hijab" className="aspect-[3/4] w-full" imgClassName="transition-transform duration-700 group-hover:scale-105" />
          <div className="pb-6 pr-5">
            <p className="font-serif text-2xl leading-tight">The modal edit</p>
            <p className="mt-2 text-[13px] leading-5 text-muted">Silky, breathable and made for long days.</p>
            <span className="mt-4 inline-block border-b border-ink pb-0.5 text-[11px] uppercase tracking-[0.18em]">Shop modal</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
