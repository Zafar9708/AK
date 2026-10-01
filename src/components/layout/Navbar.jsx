import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { NAV_ITEMS } from '../../data/categories'
import MegaMenu from './MegaMenu'

export default function Navbar({ className = '' }) {
  const [megaOpen, setMegaOpen] = useState(false)

  return (
    <nav aria-label="Main" className={className}>
      <ul className="flex h-full flex-wrap items-stretch justify-center gap-x-4 xl:gap-x-7">
        {NAV_ITEMS.map((item) => (
          <li
            key={item.label}
            className="flex"
            onMouseEnter={item.mega ? () => setMegaOpen(true) : undefined}
            onMouseLeave={item.mega ? () => setMegaOpen(false) : undefined}
          >
            <NavLink
              to={item.to}
              end={item.to === '/'}
              onClick={() => setMegaOpen(false)}
              onFocus={item.mega ? () => setMegaOpen(true) : undefined}
              aria-haspopup={item.mega ? 'true' : undefined}
              aria-expanded={item.mega ? megaOpen : undefined}
              className={({ isActive }) =>
                `link-underline flex items-center gap-1 whitespace-nowrap py-4 text-[11px] uppercase xl:text-[12px] tracking-[0.14em] transition-colors ${item.accent ? 'text-rose-dark' : 'text-ink'} ${isActive ? 'after:scale-x-100' : ''}`
              }
            >
              {item.label}
              {item.mega && <ChevronDown size={13} strokeWidth={1.5} className={`transition-transform ${megaOpen ? 'rotate-180' : ''}`} />}
            </NavLink>
            {item.mega && megaOpen && (
              <div onKeyDown={(e) => e.key === 'Escape' && setMegaOpen(false)}>
                <MegaMenu onNavigate={() => setMegaOpen(false)} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
