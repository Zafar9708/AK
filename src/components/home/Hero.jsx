import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { HERO_SLIDES } from '../../data/images'

export default function Hero() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [failed, setFailed] = useState({})
  const touchX = useRef(null)
  const n = HERO_SLIDES.length

  const go = useCallback((d) => setI((x) => (x + d + n) % n), [n])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => go(1), 6000)
    return () => clearInterval(t)
  }, [paused, go])

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative h-[78svh] max-h-[820px] min-h-[480px] w-full overflow-hidden bg-sand"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; setPaused(true) }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - (touchX.current ?? 0)
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        touchX.current = null
        setPaused(false)
      }}
    >
      {HERO_SLIDES.map((s, idx) => (
        <div
          key={s.title}
          role="group"
          aria-roledescription="slide"
          aria-label={`${idx + 1} of ${n}`}
          aria-hidden={idx !== i}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          {!failed[idx] ? (
            <picture>
              <source media="(max-width: 767px)" srcSet={s.mobileImage} />
              <img
                src={s.image}
                alt=""
                loading={idx === 0 ? 'eager' : 'lazy'}
                fetchpriority={idx === 0 ? 'high' : undefined}
                onError={() => setFailed((f) => ({ ...f, [idx]: true }))}
                className={`h-full w-full object-cover object-[center_30%] transition-transform duration-[7000ms] ease-out ${idx === i ? 'scale-105' : 'scale-100'}`}
              />
            </picture>
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-sand via-[#e9ddd3] to-rose-soft" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent md:bg-gradient-to-r md:from-black/50 md:via-black/15" />
          <div className="container-site absolute inset-0 flex items-end pb-16 md:items-center md:pb-0">
            <div className={`max-w-xl text-white transition-all delay-200 duration-700 ${idx === i ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <h2 className="font-serif text-[44px] font-normal leading-[0.95] sm:text-6xl lg:text-[84px]">{s.title}</h2>
              <p className="mt-5 max-w-md text-[15px] leading-6 text-white/90 sm:text-[16px]">{s.text}</p>
              <Link to={s.to} tabIndex={idx === i ? 0 : -1} className="btn-light mt-8">{s.cta}</Link>
            </div>
          </div>
        </div>
      ))}

      <button onClick={() => go(-1)} aria-label="Previous slide" className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 text-white backdrop-blur-sm transition hover:bg-white hover:text-ink md:flex">
        <ChevronLeft size={20} strokeWidth={1.4} />
      </button>
      <button onClick={() => go(1)} aria-label="Next slide" className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 text-white backdrop-blur-sm transition hover:bg-white hover:text-ink md:flex">
        <ChevronRight size={20} strokeWidth={1.4} />
      </button>
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {HERO_SLIDES.map((s, idx) => (
          <button key={s.title} onClick={() => setI(idx)} aria-label={`Go to slide ${idx + 1}`} aria-current={idx === i} className="flex h-6 items-center">
            <span className={`block h-[2px] transition-all duration-500 ${idx === i ? 'w-10 bg-white' : 'w-5 bg-white/50'}`} />
          </button>
        ))}
      </div>
    </section>
  )
}
