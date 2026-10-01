import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Stars from '../common/Stars'
import { REVIEWS } from '../../data/reviews'

export default function Testimonials() {
  const ref = useRef(null)
  const scroll = (d) => ref.current?.scrollBy({ left: d * (ref.current.clientWidth * 0.8), behavior: 'smooth' })

  return (
    <section className="container-site py-16 sm:py-20">
      <div className="mb-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <div>
          <h2 className="section-title uppercase">In their words</h2>
          <p className="mt-3 text-[13px] text-muted">Sample customer reviews, shown for demonstration.</p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button onClick={() => scroll(-1)} aria-label="Previous reviews" className="flex h-11 w-11 items-center justify-center rounded-full border border-line hover:border-ink"><ChevronLeft size={18} strokeWidth={1.4} /></button>
          <button onClick={() => scroll(1)} aria-label="Next reviews" className="flex h-11 w-11 items-center justify-center rounded-full border border-line hover:border-ink"><ChevronRight size={18} strokeWidth={1.4} /></button>
        </div>
      </div>
      <div ref={ref} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {REVIEWS.map((r) => (
          <figure key={r.name} className="flex w-[85%] shrink-0 snap-start flex-col bg-cream p-7 sm:w-[46%] lg:w-[31.5%]">
            <Stars rating={r.rating} size={14} />
            <blockquote className="mt-5 flex-1 font-serif text-[21px] leading-snug">“{r.text}”</blockquote>
            <figcaption className="mt-6 text-[13px]">
              <span className="font-medium">{r.name}</span>
              <span className="text-muted"> — {r.city} · {r.product}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
