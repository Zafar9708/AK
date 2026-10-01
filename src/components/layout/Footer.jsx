import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Globe2, Truck } from 'lucide-react'
import Logo from '../common/Logo'
import { InstagramIcon, FacebookIcon, PinterestIcon, WhatsAppIcon } from '../common/SocialIcons'
import { useUI } from '../../context/UIContext'
import { SITE } from '../../data/site'

const COLS = [
  { title: 'Shop', links: [['Hijabs', '/collections/hijabs'], ['Abayas', '/collections/abayas'], ['Clothing', '/collections/clothing'], ['Accessories', '/collections/accessories'], ['Jewellery', '/collections/jewellery'], ['Sale', '/collections/sale']] },
  { title: 'Information', links: [['About us', '/about'], ['Contact', '/contact'], ['FAQ', '/faq'], ['Shipping', '/shipping-policy'], ['Returns', '/return-policy']] },
  { title: 'Policies', links: [['Privacy policy', '/privacy-policy'], ['Terms & conditions', '/terms'], ['Shipping policy', '/shipping-policy'], ['Return policy', '/return-policy']] },
  { title: 'Account', links: [['Log in', '/login'], ['Register', '/register'], ['Wishlist', '/wishlist'], ['Cart', '/cart']] },
]

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())

export function NewsletterForm({ dark = false, id = 'footer-newsletter' }) {
  const { toast } = useUI()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!isEmail(email)) { setError('Enter a valid email address, like name@example.com.'); return }
    setError('')
    setDone(true)
    setEmail('')
    toast('Subscribed — welcome to the community')
  }

  if (done) {
    return <p className={`text-[14px] ${dark ? 'text-white' : 'text-ink'}`} role="status">Thank you for subscribing. Look out for new arrivals and early access in your inbox.</p>
  }

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <label htmlFor={id} className="sr-only">Email address</label>
      <div className={`flex border ${error ? 'border-red-400' : dark ? 'border-white/40' : 'border-ink'}`}>
        <input
          id={id}
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError('') }}
          placeholder="Your email address"
          className={`min-w-0 flex-1 bg-transparent px-4 py-3 outline-none ${dark ? 'text-white placeholder:text-white/60' : 'placeholder:text-[#a8a29e]'}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
        />
        <button type="submit" className={`shrink-0 px-5 text-[12px] font-medium uppercase tracking-[0.16em] ${dark ? 'bg-white text-ink hover:bg-sand' : 'bg-ink text-white hover:bg-cocoa'}`}>Subscribe</button>
      </div>
      {error && <p id={`${id}-err`} className={`mt-2 text-xs ${dark ? 'text-rose-soft' : 'text-red-600'}`}>{error}</p>}
    </form>
  )
}

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-cream">
      <div className="container-site grid grid-cols-1 gap-12 py-14 lg:grid-cols-12 lg:py-20">
        <div className="min-w-0 lg:col-span-4">
          <Logo className="items-start" />
          <p className="mt-5 max-w-sm text-[14px] leading-6 text-muted">Hijabs, abayas and modest essentials chosen for fabric, fit and everyday ease. Designed in Mumbai, shipped across India and worldwide.</p>
          <div className="mt-6 max-w-sm">
            <p className="mb-3 text-[13px] font-medium">Get new arrivals first</p>
            <NewsletterForm />
          </div>
          <div className="mt-6 flex gap-4 text-ink">
            <a href={SITE.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-cocoa"><InstagramIcon /></a>
            <a href={SITE.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-cocoa"><FacebookIcon /></a>
            <a href={SITE.social.pinterest} target="_blank" rel="noreferrer" aria-label="Pinterest" className="hover:text-cocoa"><PinterestIcon /></a>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:text-cocoa"><WhatsAppIcon /></a>
          </div>
        </div>
        <div className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-10 lg:col-span-8">
          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 font-sans text-[12px] font-medium uppercase tracking-[0.18em]">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map(([label, to]) => (
                  <li key={label}><Link to={to} className="link-underline text-[14px] text-muted hover:text-ink">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-4 py-6 text-[12px] text-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 AK Fashion Demo Store. All Rights Reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li className="flex items-center gap-1.5"><ShieldCheck size={15} strokeWidth={1.4} />Secure payments</li>
            <li className="flex items-center gap-1.5"><Globe2 size={15} strokeWidth={1.4} />Worldwide shipping</li>
            <li className="flex items-center gap-1.5"><Truck size={15} strokeWidth={1.4} />Free shipping over ₹1,499</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
