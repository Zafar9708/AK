import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AnnouncementBar from './AnnouncementBar'
import Header from './Header'
import Footer from './Footer'
import MobileMenu from './MobileMenu'
import SearchOverlay from './SearchOverlay'
import CartDrawer from '../cart/CartDrawer'
import Toasts from '../common/Toasts'
import { useUI } from '../../context/UIContext'

export default function Layout() {
  const { pathname, search } = useLocation()
  const { closeMenu, closeSearch } = useUI()

  useEffect(() => { closeMenu(); closeSearch() }, [pathname, search]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
      <AnnouncementBar />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />
      <Toasts />
    </div>
  )
}
