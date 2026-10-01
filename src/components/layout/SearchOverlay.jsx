import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, X, ArrowUpRight } from 'lucide-react'
import { useUI } from '../../context/UIContext'
import { PRODUCTS } from '../../data/products'
import { searchProducts } from '../../utils/filters'
import { formatPrice } from '../../utils/currency'
import SmartImage from '../common/SmartImage'

export const POPULAR_SEARCHES = ['Jersey hijab', 'Modal hijab', 'Abaya', 'Instant hijab', 'Pashmina', 'Co-ord set']

export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useUI()
  const [q, setQ] = useState('')
  const [debounced, setDebounced] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => setDebounced(q), 120)
    return () => clearTimeout(t)
  }, [q])

  useEffect(() => {
    if (!searchOpen) return
    const t = setTimeout(() => inputRef.current?.focus(), 80)
    const onKey = (e) => e.key === 'Escape' && closeSearch()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { clearTimeout(t); document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [searchOpen, closeSearch])

  const results = useMemo(() => searchProducts(PRODUCTS, debounced), [debounced])
  const suggestions = useMemo(() => {
    if (!debounced.trim()) return []
    const set = new Set()
    results.forEach((p) => { set.add(p.subcategoryLabel || p.categoryLabel) })
    return [...set].slice(0, 4)
  }, [results, debounced])

  const submit = (e) => {
    e.preventDefault()
    if (!q.trim()) return
    closeSearch()
    navigate(`/search?q=${encodeURIComponent(q.trim())}`)
  }

  const close = () => { closeSearch() }

  return (
    <div
      className={`fixed inset-0 z-[70] ${searchOpen ? '' : 'pointer-events-none'}`}
      style={{ visibility: searchOpen ? 'visible' : 'hidden', transition: searchOpen ? 'visibility 0s' : 'visibility 0s linear .3s' }}
      aria-hidden={!searchOpen}
    >
      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${searchOpen ? 'opacity-100' : 'opacity-0'}`} onClick={close} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        className={`absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto bg-white shadow-xl transition-transform duration-300 ease-out ${searchOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="container-site py-5 sm:py-8">
          <form onSubmit={submit} role="search" className="flex items-center gap-3 border-b border-ink pb-3">
            <Search size={20} strokeWidth={1.4} className="shrink-0" aria-hidden="true" />
            <label htmlFor="site-search" className="sr-only">Search products</label>
            <input
              ref={inputRef}
              id="site-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search hijabs, abayas, jewellery…"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent py-2 font-serif text-xl outline-none placeholder:text-[#b3aba5] sm:text-2xl"
            />
            {q && <button type="button" onClick={() => setQ('')} className="text-[12px] uppercase tracking-[0.14em] text-muted hover:text-ink">Clear</button>}
            <button type="button" onClick={close} className="-mr-2 p-2" aria-label="Close search"><X size={22} strokeWidth={1.4} /></button>
          </form>

          {!debounced.trim() ? (
            <div className="py-6">
              <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-muted">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((s) => (
                  <button key={s} onClick={() => setQ(s)} className="border border-line px-4 py-2 text-[13px] transition hover:border-ink">{s}</button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-serif text-2xl">No results for “{debounced}”</p>
              <p className="mt-2 text-[14px] text-muted">Check the spelling or try a broader term like “hijab” or “abaya”.</p>
            </div>
          ) : (
            <div className="grid gap-8 py-6 md:grid-cols-[200px_1fr]">
              <div>
                <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-muted">Suggestions</p>
                <ul className="space-y-2">
                  {suggestions.map((s) => (
                    <li key={s}><button onClick={() => setQ(s)} className="text-left text-[14px] hover:text-cocoa">{s}</button></li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Products ({results.length})</p>
                  <Link to={`/search?q=${encodeURIComponent(debounced)}`} onClick={close} className="flex items-center gap-1 text-[12px] uppercase tracking-[0.14em] underline-offset-4 hover:underline">
                    View all <ArrowUpRight size={14} />
                  </Link>
                </div>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {results.slice(0, 6).map((p) => (
                    <li key={p.id}>
                      <Link to={`/products/${p.slug}`} onClick={close} className="flex items-center gap-3 p-1.5 transition hover:bg-cream">
                        <SmartImage src={p.images[0]} alt={p.name} className="aspect-[3/4] w-14 shrink-0" />
                        <div className="min-w-0">
                          <p className="truncate text-[14px]">{p.name}</p>
                          <p className="text-[13px] text-muted">{formatPrice(p.price)}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
