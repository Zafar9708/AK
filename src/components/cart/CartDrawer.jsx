import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Truck } from 'lucide-react'
import Drawer from '../common/Drawer'
import CartItem from './CartItem'
import EmptyState from '../common/EmptyState'
import { useCart } from '../../context/CartContext'
import { useUI } from '../../context/UIContext'
import { formatPrice } from '../../utils/currency'
import { SITE } from '../../data/site'

export default function CartDrawer() {
  const { cartOpen, closeCart } = useUI()
  const { items, count, subtotal, discount } = useCart()
  const navigate = useNavigate()
  const remaining = SITE.freeShippingThreshold - (subtotal - discount)
  const pct = Math.min(100, ((subtotal - discount) / SITE.freeShippingThreshold) * 100)

  const go = (to) => { closeCart(); navigate(to) }

  const footer = items.length ? (
    <div className="space-y-4 p-5">
      <div className="flex items-center justify-between text-[15px]">
        <span>Subtotal</span>
        <span className="font-medium">{formatPrice(subtotal)}</span>
      </div>
      <p className="text-[12px] text-muted">Shipping and discount codes are calculated at checkout.</p>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => go('/cart')} className="btn-outline px-2">View cart</button>
        <button onClick={() => go('/checkout')} className="btn-dark px-2">Checkout</button>
      </div>
    </div>
  ) : null

  return (
    <Drawer open={cartOpen} onClose={closeCart} title={`Your cart (${count})`} footer={footer}>
      {items.length === 0 ? (
        <div className="px-6">
          <EmptyState icon={ShoppingBag} compact title="Your cart is empty" text="Browse our hijabs and abayas to find something you love." cta="Shop new arrivals" onClick={() => go('/collections/new-arrivals')} />
        </div>
      ) : (
        <div className="px-5">
          <div className="border-b border-line py-4">
            <p className="flex items-center gap-2 text-[12px] text-ink">
              <Truck size={15} strokeWidth={1.5} />
              {remaining > 0 ? <>You're {formatPrice(remaining)} away from free shipping</> : <>Your order ships free within India</>}
            </p>
            <div className="mt-2 h-1 w-full bg-sand"><div className="h-1 bg-cocoa transition-all duration-500" style={{ width: `${pct}%` }} /></div>
          </div>
          <ul className="divide-y divide-line">
            {items.map((it) => <CartItem key={it.key} item={it} onNavigate={closeCart} />)}
          </ul>
          <Link to="/collections/accessories" onClick={closeCart} className="mb-6 mt-2 block bg-cream p-4 text-[13px] text-ink hover:bg-sand">
            Complete the look — hijab caps, pins and magnets from {formatPrice(199)}
          </Link>
        </div>
      )}
    </Drawer>
  )
}
