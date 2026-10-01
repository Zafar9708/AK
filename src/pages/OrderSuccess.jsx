import { Link, useLocation } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { formatPrice } from '../utils/currency'
import useDocumentTitle from '../utils/useDocumentTitle'

export default function OrderSuccess() {
  useDocumentTitle('Order confirmed')
  const { state } = useLocation()
  let order = state?.order
  if (!order) {
    try { order = JSON.parse(sessionStorage.getItem('AK Fashion_last_order') || 'null') } catch { order = null }
  }

  if (!order) {
    return (
      <div className="container-site py-24 text-center">
        <h1 className="font-serif text-4xl">No recent order</h1>
        <p className="mt-3 text-muted">Place an order to see its confirmation here.</p>
        <Link to="/" className="btn-dark mt-8">Continue shopping</Link>
      </div>
    )
  }

  return (
    <div className="container-site py-14 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <CheckCircle2 size={56} strokeWidth={1} className="mx-auto text-cocoa" />
        <h1 className="mt-6 font-serif text-4xl uppercase tracking-wide sm:text-5xl">Thank you for your order</h1>
        <p className="mt-4 text-[15px] leading-7 text-muted">
          Your order <span className="font-medium text-ink">{order.id}</span> has been received. A confirmation would be sent to <span className="text-ink">{order.email}</span>. We'll let you know as soon as it ships.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl bg-cream p-6 sm:p-8">
        <div className="grid gap-4 border-b border-line pb-5 text-[13px] sm:grid-cols-3">
          <div><p className="text-muted">Order number</p><p className="mt-1 font-medium">{order.id}</p></div>
          <div><p className="text-muted">Date</p><p className="mt-1">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div>
          <div><p className="text-muted">Payment</p><p className="mt-1 uppercase">{order.payment === 'netbanking' ? 'Net banking' : order.payment}</p></div>
        </div>
        <ul className="divide-y divide-line">
          {order.items.map((i, n) => (
            <li key={n} className="flex justify-between gap-4 py-3 text-[14px]">
              <span>{i.name} <span className="text-muted">× {i.qty}</span>{i.variant && <span className="block text-[12px] text-muted">{i.variant}</span>}</span>
              <span>{formatPrice(i.price * i.qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="space-y-2 border-t border-line pt-4 text-[14px]">
          <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{formatPrice(order.subtotal)}</dd></div>
          {order.discount > 0 && <div className="flex justify-between"><dt className="text-muted">Discount</dt><dd>−{formatPrice(order.discount)}</dd></div>}
          <div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd>{order.shipping ? formatPrice(order.shipping) : 'Free'}</dd></div>
          <div className="flex justify-between pt-2 text-[16px] font-medium"><dt>Total</dt><dd>{formatPrice(order.total)}</dd></div>
        </dl>
        <p className="mt-5 text-[13px] text-muted">Shipping to {order.name}, {order.address}</p>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link to="/" className="btn-dark">Continue shopping</Link>
        <Link to="/account" className="btn-outline">View my orders</Link>
      </div>
    </div>
  )
}
