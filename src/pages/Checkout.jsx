import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, ShoppingBag, Smartphone, CreditCard, Landmark, Info } from 'lucide-react'
import SmartImage from '../components/common/SmartImage'
import EmptyState from '../components/common/EmptyState'
import LoadingSpinner from '../components/common/LoadingSpinner'
import Logo from '../components/common/Logo'
import { CouponField } from '../components/cart/CartSummary'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useUI } from '../context/UIContext'
import { formatPrice } from '../utils/currency'
import { SITE } from '../data/site'
import useDocumentTitle from '../utils/useDocumentTitle'

const STATES = ['Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal']
const COUNTRIES = ['India', 'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'United Kingdom', 'United States', 'Canada', 'Malaysia']

function Field({ id, label, error, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label">{label}</label>
      {children}
      {error && <p id={`${id}-err`} className="field-error">{error}</p>}
    </div>
  )
}

export default function Checkout() {
  useDocumentTitle('Checkout')
  const { items, subtotal, discount, freeShipping, clearCart, note, coupon } = useCart()
  const { user, addOrder } = useAuth()
  const { toast } = useUI()
  const navigate = useNavigate()

  const a = user?.address || {}
  const [form, setForm] = useState({
    email: user?.email || '', phone: user?.phone || '',
    firstName: user?.firstName || '', lastName: user?.lastName || '',
    address: a.line1 || '', apartment: a.line2 || '', city: a.city || '', state: a.state || '', pin: a.pin || '', country: a.country || 'India',
  })
  const [shipping, setShipping] = useState('standard')
  const [payment, setPayment] = useState('upi')
  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)

  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setErrors((er) => ({ ...er, [k]: undefined })) }

  const intl = form.country !== 'India'
  const shippingCost = useMemo(() => {
    if (intl) return shipping === 'express' ? 1499 : 899
    if (shipping === 'express') return SITE.shipping.express
    return freeShipping ? 0 : SITE.shipping.standard
  }, [shipping, freeShipping, intl])
  const total = subtotal - discount + shippingCost

  if (!items.length) {
    return (
      <div className="container-site">
        <EmptyState icon={ShoppingBag} title="There's nothing to check out yet" text="Add a few pieces to your cart and come back here to place your order." cta="Shop best sellers" to="/collections/best-sellers" />
      </div>
    )
  }

  const validate = () => {
    const e = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = 'Enter a valid email address.'
    if (!/^[+\d][\d\s-]{9,15}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number with at least 10 digits.'
    if (!form.firstName.trim()) e.firstName = 'Enter your first name.'
    if (!form.lastName.trim()) e.lastName = 'Enter your last name.'
    if (form.address.trim().length < 5) e.address = 'Enter your street address.'
    if (!form.city.trim()) e.city = 'Enter your city.'
    if (!form.state.trim()) e.state = intl ? 'Enter your state or region.' : 'Select your state.'
    if (intl ? form.pin.trim().length < 3 : !/^\d{6}$/.test(form.pin.trim())) e.pin = intl ? 'Enter your postal code.' : 'Enter a 6-digit PIN code.'
    return e
  }

  const placeOrder = async (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0]
      document.getElementById(`co-${first}`)?.focus()
      return
    }
    setPlacing(true)
    await new Promise((r) => setTimeout(r, 1600))
    const order = {
      id: `NRH-DEMO-${Math.floor(10000 + Math.random() * 89999)}`,
      date: new Date().toISOString().slice(0, 10),
      status: 'Processing',
      email: form.email.trim().toLowerCase(),
      name: `${form.firstName} ${form.lastName}`.trim(),
      address: [form.address, form.apartment, form.city, form.state, form.pin, form.country].filter(Boolean).join(', '),
      items: items.map((i) => ({ name: i.name, qty: i.qty, price: i.price, image: i.image, variant: [i.color, i.size].filter(Boolean).join(' / ') })),
      subtotal, discount, shipping: shippingCost, total, payment, shippingMethod: shipping, coupon, note,
    }
    addOrder(order)
    try { sessionStorage.setItem('AK Fashion_last_order', JSON.stringify(order)) } catch { /* ignore */ }
    clearCart()
    toast('Order placed successfully')
    navigate('/order-success', { state: { order }, replace: true })
  }

  const inputCls = (k) => `input ${errors[k] ? 'input-error' : ''}`
  const aria = (k) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `co-${k}-err` : undefined })

  const PayOption = ({ value, icon: Icon, title, children }) => (
    <div className={`border ${payment === value ? 'border-ink' : 'border-line'} -mt-px first:mt-0`}>
      <label className="flex cursor-pointer items-center gap-3 px-4 py-4">
        <input type="radio" name="payment" value={value} checked={payment === value} onChange={() => setPayment(value)} className="h-4 w-4 accent-[#242424]" />
        <Icon size={18} strokeWidth={1.4} className="text-cocoa" />
        <span className="text-[14px]">{title}</span>
      </label>
      {payment === value && <div className="border-t border-line bg-cream px-4 py-4 text-[13px] text-muted">{children}</div>}
    </div>
  )

  return (
    <div className="bg-white">
      <div className="border-b border-line bg-cream">
        <div className="container-site flex items-center justify-between py-3">
          <p className="flex items-center gap-2 text-[12px] text-cocoa"><Info size={15} strokeWidth={1.5} />Demo checkout — no payment is taken and no card details are collected.</p>
        </div>
      </div>
      <div className="container-site grid gap-10 py-10 lg:grid-cols-[1fr_420px] lg:gap-16">
        <form onSubmit={placeOrder} noValidate className="order-2 lg:order-1">
          <div className="mb-8 hidden lg:block"><Logo className="items-start" /></div>
          <nav aria-label="Checkout steps" className="mb-8 text-[12px] text-muted">
            <Link to="/cart" className="hover:text-ink">Cart</Link> <span aria-hidden="true">›</span> <span className="text-ink">Information & payment</span> <span aria-hidden="true">›</span> Confirmation
          </nav>

          <section aria-labelledby="h-contact">
            <div className="flex items-baseline justify-between">
              <h2 id="h-contact" className="font-serif text-2xl">Contact information</h2>
              {!user && <Link to="/login" className="text-[13px] underline underline-offset-4">Log in</Link>}
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field id="co-email" label="Email" error={errors.email}><input id="co-email" type="email" autoComplete="email" value={form.email} onChange={set('email')} className={inputCls('email')} {...aria('email')} /></Field>
              <Field id="co-phone" label="Phone" error={errors.phone}><input id="co-phone" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} placeholder="+91" className={inputCls('phone')} {...aria('phone')} /></Field>
            </div>
          </section>

          <section aria-labelledby="h-ship" className="mt-10">
            <h2 id="h-ship" className="font-serif text-2xl">Shipping address</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field id="co-country" label="Country / region" className="sm:col-span-2">
                <select id="co-country" value={form.country} onChange={(e) => { set('country')(e); setForm((f) => ({ ...f, state: '' })) }} className="input">
                  {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field id="co-firstName" label="First name" error={errors.firstName}><input id="co-firstName" autoComplete="given-name" value={form.firstName} onChange={set('firstName')} className={inputCls('firstName')} {...aria('firstName')} /></Field>
              <Field id="co-lastName" label="Last name" error={errors.lastName}><input id="co-lastName" autoComplete="family-name" value={form.lastName} onChange={set('lastName')} className={inputCls('lastName')} {...aria('lastName')} /></Field>
              <Field id="co-address" label="Address" error={errors.address} className="sm:col-span-2"><input id="co-address" autoComplete="address-line1" value={form.address} onChange={set('address')} placeholder="House number and street" className={inputCls('address')} {...aria('address')} /></Field>
              <Field id="co-apartment" label="Apartment, suite, etc. (optional)" className="sm:col-span-2"><input id="co-apartment" autoComplete="address-line2" value={form.apartment} onChange={set('apartment')} className="input" /></Field>
              <Field id="co-city" label="City" error={errors.city}><input id="co-city" autoComplete="address-level2" value={form.city} onChange={set('city')} className={inputCls('city')} {...aria('city')} /></Field>
              <Field id="co-state" label="State" error={errors.state}>
                {intl ? (
                  <input id="co-state" autoComplete="address-level1" value={form.state} onChange={set('state')} className={inputCls('state')} {...aria('state')} />
                ) : (
                  <select id="co-state" value={form.state} onChange={set('state')} className={inputCls('state')} {...aria('state')}>
                    <option value="">Select state</option>
                    {STATES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                )}
              </Field>
              <Field id="co-pin" label={intl ? 'Postal code' : 'PIN code'} error={errors.pin}><input id="co-pin" inputMode={intl ? 'text' : 'numeric'} autoComplete="postal-code" value={form.pin} onChange={set('pin')} className={inputCls('pin')} {...aria('pin')} /></Field>
            </div>
          </section>

          <section aria-labelledby="h-method" className="mt-10">
            <h2 id="h-method" className="font-serif text-2xl">Shipping method</h2>
            <div className="mt-5">
              {[
                { v: 'standard', t: intl ? 'International standard' : 'Standard shipping', d: intl ? '7–14 working days' : '4–7 working days', c: intl ? 899 : freeShipping ? 0 : SITE.shipping.standard },
                { v: 'express', t: intl ? 'International express' : 'Express shipping', d: intl ? '4–6 working days' : '2–3 working days', c: intl ? 1499 : SITE.shipping.express },
              ].map((o) => (
                <label key={o.v} className={`-mt-px flex cursor-pointer items-center gap-3 border px-4 py-4 first:mt-0 ${shipping === o.v ? 'relative border-ink' : 'border-line'}`}>
                  <input type="radio" name="shipping" checked={shipping === o.v} onChange={() => setShipping(o.v)} className="h-4 w-4 accent-[#242424]" />
                  <span className="flex-1 text-[14px]">{o.t}<span className="block text-[12px] text-muted">{o.d}</span></span>
                  <span className="text-[14px]">{o.c === 0 ? 'Free' : formatPrice(o.c)}</span>
                </label>
              ))}
            </div>
          </section>

          <section aria-labelledby="h-pay" className="mt-10">
            <h2 id="h-pay" className="font-serif text-2xl">Payment</h2>
            <p className="mt-1 flex items-center gap-1.5 text-[13px] text-muted"><Lock size={13} />All transactions are secure and encrypted.</p>
            <div className="mt-5">
              <PayOption value="upi" icon={Smartphone} title="UPI (GPay, PhonePe, Paytm)">
                After placing the order you would normally be redirected to your UPI app to approve the payment. In this demo the order is confirmed instantly.
              </PayOption>
              <PayOption value="card" icon={CreditCard} title="Credit / debit card">
                <div className="grid gap-3 sm:grid-cols-2" aria-label="Card form preview">
                  <input disabled placeholder="Card number" className="input cursor-not-allowed bg-white/70 sm:col-span-2" />
                  <input disabled placeholder="MM / YY" className="input cursor-not-allowed bg-white/70" />
                  <input disabled placeholder="CVV" className="input cursor-not-allowed bg-white/70" />
                </div>
                <p className="mt-3">Card fields are disabled in this demo. A live store would use the payment gateway's secure hosted fields.</p>
              </PayOption>
              <PayOption value="netbanking" icon={Landmark} title="Net banking">
                You would choose your bank on the next screen and complete payment there. Not active in this demo.
              </PayOption>
            </div>
          </section>

          <button type="submit" disabled={placing} className="btn-dark mt-10 w-full py-4 sm:w-auto sm:min-w-[280px]">
            {placing ? <><LoadingSpinner size={15} /> Placing order…</> : `Place demo order · ${formatPrice(total)}`}
          </button>
          <p className="mt-4 text-[12px] text-muted">By placing this order you agree to our <Link to="/terms" className="underline">terms</Link> and <Link to="/privacy-policy" className="underline">privacy policy</Link>.</p>
        </form>

        <aside className="order-1 h-fit bg-cream p-5 sm:p-8 lg:sticky lg:top-36 lg:order-2" aria-label="Order summary">
          <h2 className="mb-5 font-sans text-[13px] font-medium uppercase tracking-[0.16em]">Order summary</h2>
          <ul className="space-y-4">
            {items.map((i) => (
              <li key={i.key} className="flex items-center gap-4">
                <div className="relative w-16 shrink-0">
                  <SmartImage src={i.image} alt={i.name} className="aspect-[3/4] w-full" />
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-ink px-1 text-[11px] text-white">{i.qty}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] leading-5">{i.name}</p>
                  <p className="text-[12px] text-muted">{[i.color, i.size].filter(Boolean).join(' / ')}</p>
                </div>
                <span className="text-[14px]">{formatPrice(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="my-6 border-y border-line py-5"><CouponField /></div>
          <dl className="space-y-3 text-[14px]">
            <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            {discount > 0 && <div className="flex justify-between text-rose-dark"><dt>Discount ({coupon})</dt><dd>−{formatPrice(discount)}</dd></div>}
            <div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</dd></div>
            <div className="flex justify-between border-t border-line pt-4 text-[17px] font-medium"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  )
}
