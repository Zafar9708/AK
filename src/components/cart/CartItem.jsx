import { Link } from 'react-router-dom'
import SmartImage from '../common/SmartImage'
import QuantitySelector from '../product/QuantitySelector'
import { formatPrice } from '../../utils/currency'
import { useCart } from '../../context/CartContext'

export default function CartItem({ item, onNavigate }) {
  const { updateQty, removeItem } = useCart()
  const variant = [item.color, item.size].filter(Boolean).join(' / ')
  return (
    <li className="flex gap-4 py-5">
      <Link to={`/products/${item.slug}`} onClick={onNavigate} className="w-20 shrink-0 sm:w-24">
        <SmartImage src={item.image} alt={item.name} className="aspect-[3/4] w-full" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex justify-between gap-3">
          <Link to={`/products/${item.slug}`} onClick={onNavigate} className="text-[14px] leading-5 hover:text-cocoa">{item.name}</Link>
          <span className="shrink-0 text-[14px]">{formatPrice(item.price * item.qty)}</span>
        </div>
        {variant && <p className="mt-1 text-[12px] text-muted">{variant}</p>}
        <p className="mt-0.5 text-[12px] text-muted">
          {formatPrice(item.price)} each
          {item.compareAtPrice && <span className="ml-1.5 line-through">{formatPrice(item.compareAtPrice)}</span>}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantitySelector small value={item.qty} max={item.maxQty} onChange={(q) => updateQty(item.key, q)} label={`Quantity for ${item.name}`} />
          <button onClick={() => removeItem(item.key)} className="link-underline text-[12px] text-muted hover:text-ink">Remove</button>
        </div>
      </div>
    </li>
  )
}
