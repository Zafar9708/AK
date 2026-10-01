import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import SmartImage from '../components/common/SmartImage'
import QuantitySelector from '../components/product/QuantitySelector'
import CartSummary, { CouponField } from '../components/cart/CartSummary'
import EmptyState from '../components/common/EmptyState'
import ProductGrid from '../components/product/ProductGrid'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/currency'
import { PRODUCTS } from '../data/products'
import useDocumentTitle from '../utils/useDocumentTitle'

export default function Cart() {
  const { items, updateQty, removeItem, note, setNote, count } = useCart()
  useDocumentTitle('Your cart')

  if (!items.length) {
    return (
      <div className="container-site">
        <EmptyState icon={ShoppingBag} title="Your cart is empty" text="Looks like you haven't added anything yet. Start with our best sellers." cta="Continue shopping" to="/collections/best-sellers" />
        <section className="pb-6">
          <h2 className="section-title mb-8 text-center uppercase">Customer favourites</h2>
          <ProductGrid products={PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4)} />
        </section>
      </div>
    )
  }

  return (
    <div className="container-site py-10 sm:py-14">
      <div className="mb-8 flex items-end justify-between">
        <h1 className="font-serif text-4xl sm:text-5xl">Your cart</h1>
        <Link to="/collections/all" className="link-underline text-[13px]">Continue shopping</Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
        <div>
          {/* Desktop table header */}
          <div className="hidden grid-cols-[1fr_120px_140px_110px] gap-4 border-b border-line pb-3 text-[11px] uppercase tracking-[0.16em] text-muted md:grid">
            <span>Product</span><span>Price</span><span>Quantity</span><span className="text-right">Total</span>
          </div>
          <ul className="divide-y divide-line border-b border-line" aria-label={`${count} items in cart`}>
            {items.map((it) => {
              const variant = [it.color, it.size].filter(Boolean).join(' / ')
              return (
                <li key={it.key} className="grid grid-cols-[88px_1fr] gap-4 py-6 md:grid-cols-[1fr_120px_140px_110px] md:items-center">
                  <div className="contents md:flex md:items-center md:gap-5">
                    <Link to={`/products/${it.slug}`} className="row-span-3 w-[88px] shrink-0 md:row-span-1 md:w-24">
                      <SmartImage src={it.image} alt={it.name} className="aspect-[3/4] w-full" />
                    </Link>
                    <div className="min-w-0">
                      <Link to={`/products/${it.slug}`} className="text-[15px] leading-5 hover:text-cocoa">{it.name}</Link>
                      {variant && <p className="mt-1 text-[13px] text-muted">{variant}</p>}
                      <p className="mt-1 text-[13px] md:hidden">{formatPrice(it.price)}</p>
                      <button onClick={() => removeItem(it.key)} className="mt-2 hidden text-[12px] text-muted underline underline-offset-4 hover:text-ink md:inline">Remove</button>
                    </div>
                  </div>
                  <div className="hidden text-[14px] md:block">
                    {formatPrice(it.price)}
                    {it.compareAtPrice && <span className="block text-[12px] text-muted line-through">{formatPrice(it.compareAtPrice)}</span>}
                  </div>
                  <div className="col-start-2 flex items-center justify-between md:col-start-auto md:block">
                    <QuantitySelector small value={it.qty} max={it.maxQty} onChange={(q) => updateQty(it.key, q)} label={`Quantity for ${it.name}`} />
                    <button onClick={() => removeItem(it.key)} className="text-[12px] text-muted underline underline-offset-4 md:hidden">Remove</button>
                  </div>
                  <div className="col-start-2 text-[14px] font-medium md:col-start-auto md:text-right">
                    <span className="text-muted md:hidden">Total: </span>{formatPrice(it.price * it.qty)}
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="mt-8 max-w-md">
            <label htmlFor="order-note" className="label">Order notes</label>
            <textarea id="order-note" rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Gift message or delivery instructions" className="input resize-none" />
          </div>
        </div>

        <aside className="h-fit bg-cream p-6 sm:p-8 lg:sticky lg:top-36" aria-label="Order summary">
          <h2 className="mb-6 font-sans text-[13px] font-medium uppercase tracking-[0.16em]">Order summary</h2>
          <div className="mb-6"><CouponField /></div>
          <CartSummary />
        </aside>
      </div>
    </div>
  )
}
