import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Heart, ShieldCheck, Gem, Globe2, Truck, RotateCcw, Check } from 'lucide-react'
import Breadcrumb from '../components/common/Breadcrumb'
import ProductGallery from '../components/product/ProductGallery'
import ColorSelector from '../components/product/ColorSelector'
import SizeSelector from '../components/product/SizeSelector'
import QuantitySelector from '../components/product/QuantitySelector'
import ProductGrid from '../components/product/ProductGrid'
import Accordion from '../components/common/Accordion'
import Stars from '../components/common/Stars'
import { getProductBySlug, getRelated, PRODUCTS } from '../data/products'
import { formatPrice, discountPercent } from '../utils/currency'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useRecentlyViewed } from '../context/RecentlyViewedContext'
import useDocumentTitle from '../utils/useDocumentTitle'
import { SITE } from '../data/site'
import NotFound from './NotFound'

export default function ProductDetails() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()
  const { ids: recentIds, track } = useRecentlyViewed()

  const [color, setColor] = useState(product?.colors[0]?.name ?? null)
  const [size, setSize] = useState(product?.sizes[0] ?? null)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useDocumentTitle(product?.name || 'Product not found', product?.shortDescription)

  useEffect(() => {
    if (!product) return
    setColor(product.colors[0]?.name ?? null)
    setSize(product.sizes[0] ?? null)
    setQty(1)
    track(product.id)
  }, [product, track])

  useEffect(() => {
    document.body.classList.add('has-sticky-bar')
    return () => document.body.classList.remove('has-sticky-bar')
  }, [])

  const related = useMemo(() => (product ? getRelated(product, 4) : []), [product])
  const recent = useMemo(
    () => (product ? recentIds.filter((id) => id !== product.id).map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean).slice(0, 4) : []),
    [recentIds, product]
  )

  if (!product) return <NotFound message="This product is no longer available or the link is incorrect." />

  const soldOut = product.stock <= 0
  const lowStock = !soldOut && product.stock <= 10
  const off = discountPercent(product.price, product.compareAtPrice)
  const wished = has(product.id)

  const onAdd = () => {
    addItem(product, { color, size, qty })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }
  const onBuyNow = () => {
    addItem(product, { color, size, qty, silent: true, open: false })
    navigate('/checkout')
  }

  const crumbs = [
    { label: 'Home', to: '/' },
    { label: product.categoryLabel, to: `/collections/${product.category}` },
    ...(product.subcategory ? [{ label: product.subcategoryLabel, to: `/collections/${product.category}?sub=${product.subcategory}` }] : []),
    { label: product.name },
  ]

  const accordion = [
    { title: 'Description', content: <p>{product.description}</p>, defaultOpen: true },
    { title: 'Product details', content: <ul className="list-disc space-y-1 pl-5">{product.details.map((d) => <li key={d}>{d}</li>)}</ul> },
    { title: 'Shipping', content: <p>Orders are packed within 1–2 working days. Standard delivery in India takes 4–7 working days ({formatPrice(SITE.shipping.standard)}, free over {formatPrice(SITE.freeShippingThreshold)}); express takes 2–3 working days ({formatPrice(SITE.shipping.express)}). International orders arrive in 7–14 working days. <Link to="/shipping-policy" className="underline">Shipping policy</Link></p> },
    { title: 'Care instructions', content: <p>{product.care}</p> },
    { title: 'Returns & exchanges', content: <p>Exchanges are accepted within 7 days of delivery for unused items with tags attached. An unboxing video is required for damage claims. Skincare and jewellery are final sale for hygiene reasons. <Link to="/return-policy" className="underline">Return policy</Link></p> },
  ]

  return (
    <div>
      <div className="container-site pt-6">
        <Breadcrumb items={crumbs} />
      </div>

      <section className="container-site grid gap-8 py-6 lg:grid-cols-[1.15fr_1fr] lg:gap-14 lg:py-10">
        <ProductGallery images={product.images} name={product.name} label={product.categoryLabel} />

        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">{product.subcategoryLabel || product.categoryLabel}</p>
          <h1 className="mt-2 font-serif text-[32px] leading-tight sm:text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2">
            <Stars rating={product.rating} showValue count={product.reviewCount} />
            <span className="text-[12px] text-muted">reviews</span>
          </div>

          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className={`text-2xl ${off ? 'text-rose-dark' : ''}`}>{formatPrice(product.price)}</span>
            {off > 0 && (
              <>
                <span className="text-[16px] text-muted line-through">{formatPrice(product.compareAtPrice)}</span>
                <span className="bg-rose-dark px-2 py-0.5 text-[11px] uppercase tracking-[0.12em] text-white">Save {off}%</span>
              </>
            )}
          </div>
          <p className="mt-1 text-[12px] text-muted">Inclusive of all taxes</p>

          <p className="mt-5 text-[15px] leading-7 text-[#555]">{product.shortDescription}</p>

          <div className="mt-7 space-y-6">
            <ColorSelector colors={product.colors} value={color} onChange={setColor} />
            <SizeSelector sizes={product.sizes} value={size} onChange={setSize} label={product.category === 'jewellery' ? 'Ring size' : 'Size'} />
            <div>
              <p className="mb-2.5 text-[13px]">Quantity</p>
              <div className="flex flex-wrap items-center gap-4">
                <QuantitySelector value={qty} onChange={setQty} max={Math.max(1, product.stock)} />
                <p className={`flex items-center gap-2 text-[13px] ${soldOut ? 'text-red-700' : lowStock ? 'text-cocoa' : 'text-[#4d7a52]'}`}>
                  <span className={`h-2 w-2 rounded-full ${soldOut ? 'bg-red-600' : lowStock ? 'bg-cocoa' : 'bg-[#4d7a52]'}`} />
                  {soldOut ? 'Sold out — back soon' : lowStock ? `Only ${product.stock} left in stock` : 'In stock, ready to ship'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-[1fr_auto] gap-2">
            <button onClick={onAdd} disabled={soldOut} className="btn-outline">
              {soldOut ? 'Sold out' : added ? <><Check size={16} /> Added</> : 'Add to cart'}
            </button>
            <button onClick={() => toggle(product)} aria-pressed={wished} aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'} className="flex w-12 items-center justify-center border border-line transition hover:border-ink">
              <Heart size={18} strokeWidth={1.4} className={wished ? 'fill-rose-dark text-rose-dark' : ''} />
            </button>
            <button onClick={onBuyNow} disabled={soldOut} className="btn-dark col-span-2">Buy it now</button>
          </div>
          <button onClick={() => toggle(product)} className="mt-3 text-[12px] uppercase tracking-[0.14em] text-muted underline-offset-4 hover:text-ink hover:underline">
            {wished ? 'Saved to wishlist' : 'Add to wishlist'}
          </button>

          <ul className="mt-7 grid grid-cols-3 gap-2 border-y border-line py-5 text-center text-[11px] uppercase tracking-[0.1em] text-ink">
            <li className="flex flex-col items-center gap-2"><ShieldCheck size={20} strokeWidth={1.2} className="text-cocoa" />Secure checkout</li>
            <li className="flex flex-col items-center gap-2"><Gem size={20} strokeWidth={1.2} className="text-cocoa" />Premium quality</li>
            <li className="flex flex-col items-center gap-2"><Globe2 size={20} strokeWidth={1.2} className="text-cocoa" />Worldwide shipping</li>
          </ul>

          <div className="mt-5 space-y-2 text-[13px] text-muted">
            <p className="flex items-center gap-2"><Truck size={15} strokeWidth={1.4} />Dispatched in 1–2 working days. Free shipping in India over {formatPrice(SITE.freeShippingThreshold)}.</p>
            <p className="flex items-center gap-2"><RotateCcw size={15} strokeWidth={1.4} />7-day exchange on unused items.</p>
          </div>

          <dl className="mt-5 grid grid-cols-[90px_1fr] gap-y-1.5 text-[13px]">
            <dt className="text-muted">SKU</dt><dd>{product.sku}</dd>
            <dt className="text-muted">Category</dt>
            <dd>
              <Link to={`/collections/${product.category}`} className="underline-offset-4 hover:underline">{product.categoryLabel}</Link>
              {product.subcategory && <>, <Link to={`/collections/${product.category}?sub=${product.subcategory}`} className="underline-offset-4 hover:underline">{product.subcategoryLabel}</Link></>}
            </dd>
            <dt className="text-muted">Tags</dt><dd className="capitalize">{product.tags.join(', ')}</dd>
          </dl>

          <div className="mt-8"><Accordion items={accordion} /></div>
        </div>
      </section>

      <section className="container-site py-14">
        <h2 className="section-title mb-8 text-center uppercase">You may also like</h2>
        <ProductGrid products={related} />
      </section>

      {recent.length > 0 && (
        <section className="container-site pb-6 pt-4">
          <h2 className="section-title mb-8 text-center uppercase">Recently viewed</h2>
          <ProductGrid products={recent} />
        </section>
      )}

      {/* Mobile sticky purchase bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-line bg-white px-4 py-3 shadow-[0_-6px_20px_-12px_rgba(0,0,0,0.2)] lg:hidden" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px]">{product.name}</p>
          <p className="text-[13px] text-muted">{formatPrice(product.price)}{color ? ` · ${color}` : ''}{size ? ` · ${size}` : ''}</p>
        </div>
        <button onClick={onAdd} disabled={soldOut} className="btn-dark shrink-0 px-5 py-3">{soldOut ? 'Sold out' : 'Add to cart'}</button>
      </div>
    </div>
  )
}
