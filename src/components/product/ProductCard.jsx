import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Plus } from 'lucide-react'
import SmartImage from '../common/SmartImage'
import { formatPrice, discountPercent } from '../../utils/currency'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

function ProductCard({ product, eager = false }) {
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()
  const [hoverImgOk, setHoverImgOk] = useState(true)
  const soldOut = product.stock <= 0
  const off = discountPercent(product.price, product.compareAtPrice)
  const wished = has(product.id)
  const url = `/products/${product.slug}`

  const quickAdd = (e) => {
    e.preventDefault()
    if (!soldOut) addItem(product)
  }

  return (
    <article className="group relative flex flex-col">
      <div className="relative">
        <Link to={url} aria-label={product.name} className="block">
          <SmartImage
            src={product.images[0]}
            alt={product.name}
            eager={eager}
            fallbackLabel={product.categoryLabel}
            className="aspect-[3/4] w-full"
            imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {product.images[1] && hoverImgOk && (
            <img
              src={product.images[1]}
              alt=""
              aria-hidden="true"
              loading="lazy"
              onError={() => setHoverImgOk(false)}
              className="absolute inset-0 hidden h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:block"
            />
          )}
        </Link>

        <div className="pointer-events-none absolute left-2 top-2 flex flex-col items-start gap-1 sm:left-3 sm:top-3">
          {soldOut && <span className="bg-white px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-ink">Sold out</span>}
          {!soldOut && off > 0 && <span className="bg-rose-dark px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white">-{off}%</span>}
          {!soldOut && product.isNew && <span className="bg-ink px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white">New</span>}
        </div>

        <button
          onClick={() => toggle(product)}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wished}
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm transition hover:bg-white sm:right-3 sm:top-3"
        >
          <Heart size={16} strokeWidth={1.5} className={wished ? 'fill-rose-dark text-rose-dark' : ''} />
        </button>

        {/* Desktop quick add */}
        <button
          onClick={quickAdd}
          disabled={soldOut}
          className="absolute inset-x-3 bottom-3 hidden translate-y-2 bg-white/95 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-ink opacity-0 shadow-sm transition-all duration-300 hover:bg-ink hover:text-white group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 disabled:cursor-not-allowed disabled:hover:bg-white/95 disabled:hover:text-muted lg:block"
        >
          {soldOut ? 'Sold out' : 'Quick add'}
        </button>

        {/* Touch quick add */}
        {!soldOut && (
          <button
            onClick={quickAdd}
            aria-label={`Quick add ${product.name} to cart`}
            className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink shadow-md active:scale-95 lg:hidden"
          >
            <Plus size={18} strokeWidth={1.5} />
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="font-sans text-[13px] leading-5 text-ink sm:text-[14px]">
          <Link to={url} className="hover:text-cocoa">{product.name}</Link>
        </h3>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2 text-[13px] sm:text-[14px]">
          <span className={off ? 'text-rose-dark' : 'text-ink'}>{formatPrice(product.price)}</span>
          {off > 0 && <span className="text-[12px] text-muted line-through">{formatPrice(product.compareAtPrice)}</span>}
        </div>
        {product.colors.length > 1 && (
          <div className="mt-2 flex items-center gap-1.5" aria-label={`Available in ${product.colors.map((c) => c.name).join(', ')}`}>
            {product.colors.slice(0, 5).map((c) => (
              <span key={c.name} title={c.name} className="h-3 w-3 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
            ))}
            {product.colors.length > 5 && <span className="text-[11px] text-muted">+{product.colors.length - 5}</span>}
          </div>
        )}
      </div>
    </article>
  )
}

export default memo(ProductCard)
