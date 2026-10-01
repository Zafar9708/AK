import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { storage } from '../utils/storage'
import { COUPONS, SITE } from '../data/site'
import { useUI } from './UIContext'

const CartContext = createContext(null)
const KEY = 'AK Fashion_cart_v1'

const lineKey = (id, color, size) => `${id}__${color || ''}__${size || ''}`

export function CartProvider({ children }) {
  const { toast, openCart } = useUI()
  const [items, setItems] = useState(() => storage.get(KEY, {}).items || [])
  const [coupon, setCoupon] = useState(() => storage.get(KEY, {}).coupon || null)
  const [note, setNote] = useState(() => storage.get(KEY, {}).note || '')

  useEffect(() => { storage.set(KEY, { items, coupon, note }) }, [items, coupon, note])

  const addItem = useCallback((product, { color, size, qty = 1, silent = false, open = true } = {}) => {
    const c = color ?? product.colors[0]?.name ?? null
    const s = size ?? product.sizes[0] ?? null
    const key = lineKey(product.id, c, s)
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key)
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: Math.min(i.qty + qty, product.stock || 99) } : i))
      }
      return [...prev, {
        key, id: product.id, slug: product.slug, name: product.name, image: product.images[0],
        price: product.price, compareAtPrice: product.compareAtPrice, color: c, size: s, qty, maxQty: product.stock || 99,
      }]
    })
    if (!silent) toast(`Added to cart — ${product.name}`)
    if (open) openCart()
  }, [toast, openCart])

  const updateQty = useCallback((key, qty) => {
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, Math.min(qty, i.maxQty)) } : i)))
  }, [])

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key))
    toast('Removed from cart', { type: 'info' })
  }, [toast])

  const clearCart = useCallback(() => { setItems([]); setCoupon(null); setNote('') }, [])

  const applyCoupon = useCallback((code) => {
    const c = code.trim().toUpperCase()
    if (!c) return { ok: false, error: 'Enter a coupon code.' }
    if (!COUPONS[c]) return { ok: false, error: 'This code isn\u2019t valid. Try WELCOME10.' }
    setCoupon(c)
    toast(`Coupon ${c} applied`)
    return { ok: true }
  }, [toast])

  const removeCoupon = useCallback(() => setCoupon(null), [])

  const totals = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0)
    const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0)
    const savings = items.reduce((n, i) => n + (i.compareAtPrice ? (i.compareAtPrice - i.price) * i.qty : 0), 0)
    const def = coupon ? COUPONS[coupon] : null
    const discount = def ? Math.round((subtotal * def.value) / 100) : 0
    const freeShipping = subtotal - discount >= SITE.freeShippingThreshold
    return { count, subtotal, savings, discount, freeShipping }
  }, [items, coupon])

  const value = useMemo(() => ({
    items, coupon, note, setNote, addItem, updateQty, removeItem, clearCart, applyCoupon, removeCoupon, ...totals,
  }), [items, coupon, note, addItem, updateQty, removeItem, clearCart, applyCoupon, removeCoupon, totals])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
