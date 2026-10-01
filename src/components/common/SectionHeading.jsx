import { Link } from 'react-router-dom'

export default function SectionHeading({ title, subtitle, to, linkLabel = 'View all' }) {
  return (
    <div className="mb-8 flex flex-col items-center text-center sm:mb-10">
      <h2 className="section-title uppercase">{title}</h2>
      {subtitle && <p className="mt-3 max-w-xl text-[14px] text-muted">{subtitle}</p>}
      {to && (
        <Link to={to} className="link-underline mt-4 text-[12px] uppercase tracking-[0.18em] text-ink">{linkLabel}</Link>
      )}
    </div>
  )
}
