import { Star } from 'lucide-react'

export default function Stars({ rating, size = 13, showValue = false, count }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex" aria-label={`Rated ${rating} out of 5`} role="img">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={size}
            strokeWidth={1.3}
            className={n <= Math.round(rating) ? 'fill-cocoa text-cocoa' : 'fill-transparent text-[#cfc6bf]'}
          />
        ))}
      </div>
      {showValue && <span className="text-[12px] text-muted">{rating.toFixed(1)}{count != null && ` (${count})`}</span>}
    </div>
  )
}
