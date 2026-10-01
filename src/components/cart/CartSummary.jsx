import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tag, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/currency'
import { COUPONS, SITE } from '../../data/site'

export function CouponField() {
  const { coupon, applyCoupon, removeCoupon } = useCart()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const res = applyCoupon(code)
    if (!res.ok) setError(res.error)
    else { setError(''); setCode('') }
  }

  if (coupon) {
    return (
      <div className="flex items-center justify-between bg-cream px-3 py-2.5 text-[13px]">
        <span className="flex items-center gap-2"><Tag size={14} strokeWidth={1.5} />{coupon} — {COUPONS[coupon].label}</span>
        <button onClick={removeCoupon} className="p-1 text-muted hover:text-ink" aria-label="Remove coupon"><X size={14} /></button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="coupon" className="label">Discount code</label>
      <div className="flex">
        <input id="coupon" value={code} onChange={(e) => { setCode(e.target.value); setError('') }} placeholder="Enter code" className={`input min-w-0 flex-1 uppercase ${error ? 'input-error' : ''}`} aria-invalid={!!error} aria-describedby={error ? 'coupon-err' : undefined} />
        <button type="submit" className="btn-dark shrink-0 px-5">Apply</button>
      </div>
      {error && <p id="coupon-err" className="field-error">{error}</p>}
    </form>
  )
}

export default function CartSummary({ shippingCost = null, showCheckout = true }) {
  const { subtotal, discount, freeShipping, savings } = useCart()
  const shipping = shippingCost == null ? null : (freeShipping && shippingCost === SITE.shipping.standard ? 0 : shippingCost)
  const total = subtotal - discount + (shipping || 0)

  return (
    <div className="space-y-3 text-[14px]">
      <div className="flex justify-between"><span className="text-muted">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
      {discount > 0 && <div className="flex justify-between text-rose-dark"><span>Discount</span><span>−{formatPrice(discount)}</span></div>}
      <div className="flex justify-between">
        <span className="text-muted">Shipping</span>
        <span>{shipping == null ? (freeShipping ? 'Free' : 'Calculated at checkout') : shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
      </div>
      <div className="flex justify-between border-t border-line pt-4 text-[16px] font-medium">
        <span>{shipping == null ? 'Estimated total' : 'Total'}</span>
        <span>{formatPrice(total)}</span>
      </div>
      {savings > 0 && <p className="text-[12px] text-rose-dark">You're saving {formatPrice(savings + discount)} on this order.</p>}
      <p className="text-[12px] text-muted">Taxes included. Free standard shipping in India on orders over {formatPrice(SITE.freeShippingThreshold)}.</p>
      {showCheckout && <Link to="/checkout" className="btn-dark mt-2 w-full">Checkout</Link>}
    </div>
  )
}
