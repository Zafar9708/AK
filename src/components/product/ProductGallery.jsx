import { useRef, useState } from 'react'
import SmartImage from '../common/SmartImage'

export default function ProductGallery({ images, name, label }) {
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState({ on: false, x: 50, y: 50 })
  const touchX = useRef(null)
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 40) setActive((a) => (dx < 0 ? (a + 1) % images.length : (a - 1 + images.length) % images.length))
    touchX.current = null
  }

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setZoom({ on: true, x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }

  return (
    <div className="flex flex-col-reverse gap-3 lg:flex-row lg:gap-4">
      <div className="no-scrollbar flex gap-2 overflow-x-auto lg:w-20 lg:flex-col lg:overflow-visible">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1} of ${images.length}`}
            aria-current={i === active}
            className={`w-16 shrink-0 border transition lg:w-full ${i === active ? 'border-ink' : 'border-transparent opacity-70 hover:opacity-100'}`}
          >
            <SmartImage src={src} alt="" className="aspect-[3/4] w-full" />
          </button>
        ))}
      </div>
      <div
        className="relative flex-1 cursor-zoom-in overflow-hidden"
        onMouseMove={onMove}
        onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <SmartImage
          key={active}
          src={images[active]}
          alt={`${name} — image ${active + 1}`}
          eager
          fallbackLabel={label}
          className="aspect-[3/4] w-full"
          imgClassName="transition-transform duration-200"
        />
        {zoom.on && (
          <div
            className="pointer-events-none absolute inset-0 hidden bg-no-repeat lg:block"
            style={{ backgroundImage: `url(${images[active]})`, backgroundSize: '200%', backgroundPosition: `${zoom.x}% ${zoom.y}%` }}
            aria-hidden="true"
          />
        )}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 lg:hidden">
          {images.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === active ? 'w-5 bg-ink' : 'w-1.5 bg-ink/30'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
