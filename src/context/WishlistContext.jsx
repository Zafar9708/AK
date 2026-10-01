import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { storage } from '../utils/storage'
import { useUI } from './UIContext'

const WishlistContext = createContext(null)
const KEY = 'AK Fashion_wishlist_v1'

export function WishlistProvider({ children }) {
  const { toast } = useUI()
  const [ids, setIds] = useState(() => storage.get(KEY, []))

  useEffect(() => { storage.set(KEY, ids) }, [ids])

  const has = useCallback((id) => ids.includes(id), [ids])

  const toggle = useCallback((product) => {
    if (ids.includes(product.id)) {
      setIds((prev) => prev.filter((x) => x !== product.id))
      toast('Removed from wishlist', { type: 'info' })
    } else {
      setIds((prev) => (prev.includes(product.id) ? prev : [...prev, product.id]))
      toast('Added to wishlist')
    }
  }, [ids, toast])

  const remove = useCallback((id, silent) => {
    setIds((prev) => prev.filter((x) => x !== id))
    if (!silent) toast('Removed from wishlist', { type: 'info' })
  }, [toast])

  const value = useMemo(() => ({ ids, has, toggle, remove, count: ids.length }), [ids, has, toggle, remove])
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export const useWishlist = () => useContext(WishlistContext)
