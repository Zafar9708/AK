import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const dismissToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), [])

  const toast = useCallback((message, opts = {}) => {
    const id = ++idRef.current
    setToasts((t) => [...t.slice(-2), { id, message, type: opts.type || 'success', action: opts.action }])
    setTimeout(() => dismissToast(id), opts.duration || 3200)
  }, [dismissToast])

  const value = useMemo(() => ({
    cartOpen, openCart: () => setCartOpen(true), closeCart: () => setCartOpen(false),
    searchOpen, openSearch: () => setSearchOpen(true), closeSearch: () => setSearchOpen(false),
    menuOpen, openMenu: () => setMenuOpen(true), closeMenu: () => setMenuOpen(false),
    toasts, toast, dismissToast,
  }), [cartOpen, searchOpen, menuOpen, toasts, toast, dismissToast])

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export const useUI = () => useContext(UIContext)
