import { Link } from 'react-router-dom'

export default function Logo({ className = '', onClick }) {
  return (
    <Link to="/" onClick={onClick} className={`inline-flex flex-col items-center leading-none ${className}`} aria-label="AK Fashion home">
      <span className="font-serif text-[26px] font-medium tracking-[0.32em] sm:text-[30px]">AK Fashion</span>
      <span className="mt-1 text-[8.5px] uppercase tracking-[0.42em] text-muted">Modest Studio</span>
    </Link>
  )
}
