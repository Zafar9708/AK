import { Link } from 'react-router-dom'
import { Heart, X } from 'lucide-react'
import SmartImage from '../components/common/SmartImage'
import EmptyState from '../components/common/EmptyState'
import Breadcrumb from '../components/common/Breadcrumb'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { PRODUCTS } from '../data/products'
import { formatPrice } from '../utils/currency'
import useDocumentTitle from '../utils/useDocumentTitle'

export default function Wishlist() {
  const { ids, remove } = useWishlist()
  const { addItem } = useCart()
  useDocumentTitle('Wishlist')
  const items = ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean)

  const moveToCart = (p) => {
    addItem(p)
    remove(p.id, true)
  }

  return (
    <div className="container-site py-10 sm:py-14">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]} />
      <h1 className="mt-5 font-serif text-4xl sm:text-5xl">Wishlist</h1>
      {items.length === 0 ? (
        <EmptyState icon={Heart} title="Your wishlist is empty" text="Tap the heart on any product to save it here for later." cta="Discover new arrivals" to="/collections/new-arrivals" />
      ) : (
        <>
          <p className="mt-2 text-[14px] text-muted">{items.length} saved {items.length === 1 ? 'item' : 'items'}</p>
          <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
            {items.map((p) => {
              const soldOut = p.stock <= 0
              return (
                <li key={p.id} className="flex flex-col">
                  <div className="relative">
                    <Link to={`/products/${p.slug}`}><SmartImage src={p.images[0]} alt={p.name} className="aspect-[3/4] w-full" /></Link>
                    <button onClick={() => remove(p.id)} aria-label={`Remove ${p.name} from wishlist`} className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm hover:bg-sand">
                      <X size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                  <Link to={`/products/${p.slug}`} className="mt-3 text-[14px] leading-5 hover:text-cocoa">{p.name}</Link>
                  <p className="mt-1 text-[14px]">{formatPrice(p.price)}{p.compareAtPrice && <span className="ml-2 text-[12px] text-muted line-through">{formatPrice(p.compareAtPrice)}</span>}</p>
                  <button onClick={() => moveToCart(p)} disabled={soldOut} className="btn-outline mt-4 w-full px-2 py-2.5 text-[11px]">
                    {soldOut ? 'Sold out' : 'Move to cart'}
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}
