import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, User, Heart, Mail, FileText, X } from 'lucide-react'
import Drawer from '../common/Drawer'
import Logo from '../common/Logo'
import { CATEGORIES } from '../../data/categories'
import { useUI } from '../../context/UIContext'
import { useAuth } from '../../context/AuthContext'
import { InstagramIcon, FacebookIcon, PinterestIcon, WhatsAppIcon } from '../common/SocialIcons'
import { SITE } from '../../data/site'

const ORDER = ['hijabs', 'abayas', 'clothing', 'accessories', 'jewellery', 'turkish-cord-sets', 'keychains', 'skincare']

export default function MobileMenu() {
  const { menuOpen, closeMenu } = useUI()
  const { user } = useAuth()
  const [expanded, setExpanded] = useState('hijabs')

  const cats = ORDER.map((s) => CATEGORIES.find((c) => c.slug === s))

  return (
    <Drawer open={menuOpen} onClose={closeMenu} side="left" widthClass="w-[88%] max-w-[380px]" labelledBy="mobile-menu-title">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <span id="mobile-menu-title" className="sr-only">Menu</span>
        <Logo onClick={closeMenu} className="scale-90 items-start" />
        <button onClick={closeMenu} className="-mr-2 p-2" aria-label="Close menu"><X size={22} strokeWidth={1.4} /></button>
      </div>
      <nav aria-label="Mobile" className="px-5">
        <ul className="divide-y divide-line">
          <li><Link to="/" onClick={closeMenu} className="block py-4 text-[14px] uppercase tracking-[0.12em]">Home</Link></li>
          <li><Link to="/collections/new-arrivals" onClick={closeMenu} className="block py-4 text-[14px] uppercase tracking-[0.12em]">New arrivals</Link></li>
          {cats.map((c) => {
            const hasSubs = c.subcategories.length > 0
            const open = expanded === c.slug
            return (
              <li key={c.slug}>
                {hasSubs ? (
                  <>
                    <button
                      onClick={() => setExpanded(open ? null : c.slug)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between py-4 text-left text-[14px] uppercase tracking-[0.12em]"
                    >
                      {c.label}
                      <ChevronDown size={17} strokeWidth={1.4} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <ul className="overflow-hidden">
                        <li><Link to={`/collections/${c.slug}`} onClick={closeMenu} className="block py-2 pl-3 text-[14px] font-medium">Shop all {c.label.toLowerCase()}</Link></li>
                        {c.subcategories.map((s) => (
                          <li key={s.slug}><Link to={`/collections/${c.slug}?sub=${s.slug}`} onClick={closeMenu} className="block py-2 pl-3 text-[14px] text-muted hover:text-ink">{s.label}</Link></li>
                        ))}
                        <li className="h-3" />
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link to={`/collections/${c.slug}`} onClick={closeMenu} className="block py-4 text-[14px] uppercase tracking-[0.12em]">{c.label}</Link>
                )}
              </li>
            )
          })}
          <li><Link to="/collections/sale" onClick={closeMenu} className="block py-4 text-[14px] uppercase tracking-[0.12em] text-rose-dark">Sale</Link></li>
        </ul>
      </nav>
      <div className="mt-4 space-y-1 bg-cream px-5 py-5 text-[14px]">
        <Link to={user ? '/account' : '/login'} onClick={closeMenu} className="flex items-center gap-3 py-2"><User size={18} strokeWidth={1.4} />{user ? `My account (${user.firstName})` : 'Log in / Create account'}</Link>
        <Link to="/wishlist" onClick={closeMenu} className="flex items-center gap-3 py-2"><Heart size={18} strokeWidth={1.4} />Wishlist</Link>
        <Link to="/contact" onClick={closeMenu} className="flex items-center gap-3 py-2"><Mail size={18} strokeWidth={1.4} />Contact us</Link>
        <Link to="/shipping-policy" onClick={closeMenu} className="flex items-center gap-3 py-2"><FileText size={18} strokeWidth={1.4} />Shipping & returns</Link>
        <div className="flex gap-4 pt-4 text-ink">
          <a href={SITE.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a>
          <a href={SITE.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookIcon /></a>
          <a href={SITE.social.pinterest} target="_blank" rel="noreferrer" aria-label="Pinterest"><PinterestIcon /></a>
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsAppIcon /></a>
        </div>
      </div>
    </Drawer>
  )
}
