import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, User, Heart, ShoppingBag, Menu } from 'lucide-react'
import Logo from '../common/Logo'
import Navbar from './Navbar'
import { useUI } from '../../context/UIContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useAuth } from '../../context/AuthContext'

function Badge({ n }) {
  if (!n) return null
  return (
    <span className="absolute -right-1.5 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-cocoa px-1 text-[10px] font-medium leading-none text-white">
      {n > 99 ? '99+' : n}
    </span>
  )
}

const iconBtn = 'relative flex h-10 w-10 items-center justify-center text-ink transition-colors hover:text-cocoa'

export default function Header() {
  const { openSearch, openCart, openMenu } = useUI()
  const { count } = useCart()
  const { count: wishCount } = useWishlist()
  const { user } = useAuth()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-[0_4px_20px_-10px_rgba(36,36,36,0.25)]' : 'border-b border-line'}`}>
      <div className="relative">
        {/* Mobile / tablet header */}
        <div className="container-site grid h-16 grid-cols-[1fr_auto_1fr] items-center lg:hidden">
          <div className="-ml-2 flex items-center">
            <button className={iconBtn} onClick={openMenu} aria-label="Open menu"><Menu size={22} strokeWidth={1.4} /></button>
            <button className={iconBtn} onClick={openSearch} aria-label="Search"><Search size={20} strokeWidth={1.4} /></button>
          </div>
          <Logo className="scale-[0.82] sm:scale-90" />
          <div className="-mr-2 flex items-center justify-end">
            <Link to={user ? '/account' : '/login'} className={`${iconBtn} hidden sm:flex`} aria-label="Account"><User size={20} strokeWidth={1.4} /></Link>
            <Link to="/wishlist" className={`${iconBtn} hidden sm:flex`} aria-label={`Wishlist, ${wishCount} items`}><Heart size={20} strokeWidth={1.4} /><Badge n={wishCount} /></Link>
            <button className={iconBtn} onClick={openCart} aria-label={`Cart, ${count} items`}><ShoppingBag size={20} strokeWidth={1.4} /><Badge n={count} /></button>
          </div>
        </div>

        {/* Desktop header */}
        <div className="hidden lg:block">
          <div className={`container-site flex items-stretch justify-between gap-6 transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
            <Logo className="shrink-0 items-start self-center" />
            <Navbar className="hidden self-stretch 2xl:flex" />
            <div className="-mr-2 flex shrink-0 items-center gap-1 self-center">
              <button className={iconBtn} onClick={openSearch} aria-label="Search"><Search size={20} strokeWidth={1.4} /></button>
              <Link to={user ? '/account' : '/login'} className={iconBtn} aria-label={user ? 'My account' : 'Log in'}><User size={20} strokeWidth={1.4} /></Link>
              <Link to="/wishlist" className={iconBtn} aria-label={`Wishlist, ${wishCount} items`}><Heart size={20} strokeWidth={1.4} /><Badge n={wishCount} /></Link>
              <button className={iconBtn} onClick={openCart} aria-label={`Cart, ${count} items`}><ShoppingBag size={20} strokeWidth={1.4} /><Badge n={count} /></button>
            </div>
          </div>
          <Navbar className="border-t border-line 2xl:hidden" />
        </div>
      </div>
    </header>
  )
}
