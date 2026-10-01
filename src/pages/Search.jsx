import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search as SearchIcon, SearchX } from 'lucide-react'
import ProductGrid from '../components/product/ProductGrid'
import EmptyState from '../components/common/EmptyState'
import Breadcrumb from '../components/common/Breadcrumb'
import { PRODUCTS } from '../data/products'
import { searchProducts, sortProducts, SORT_OPTIONS } from '../utils/filters'
import { POPULAR_SEARCHES } from '../components/layout/SearchOverlay'
import useDocumentTitle from '../utils/useDocumentTitle'

export default function Search() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const [input, setInput] = useState(q)
  const [sort, setSort] = useState('featured')
  useEffect(() => setInput(q), [q])
  useDocumentTitle(q ? `Search: ${q}` : 'Search')

  const results = useMemo(() => sortProducts(searchProducts(PRODUCTS, q), sort), [q, sort])

  const submit = (e) => {
    e.preventDefault()
    const v = input.trim()
    if (v) setParams({ q: v })
  }

  return (
    <div className="container-site py-10 sm:py-14">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Search' }]} />
      <h1 className="mt-5 font-serif text-4xl sm:text-5xl">{q ? <>Results for “{q}”</> : 'Search'}</h1>
      <form onSubmit={submit} role="search" className="mt-6 flex max-w-xl border border-ink">
        <label htmlFor="search-page" className="sr-only">Search products</label>
        <input id="search-page" type="search" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search hijabs, abayas, jewellery…" className="min-w-0 flex-1 px-4 py-3 outline-none" />
        <button type="submit" className="flex w-12 items-center justify-center bg-ink text-white" aria-label="Search"><SearchIcon size={18} strokeWidth={1.5} /></button>
      </form>

      {!q.trim() ? (
        <div className="mt-8">
          <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-muted">Popular searches</p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SEARCHES.map((s) => <button key={s} onClick={() => setParams({ q: s })} className="border border-line px-4 py-2 text-[13px] hover:border-ink">{s}</button>)}
          </div>
        </div>
      ) : results.length === 0 ? (
        <EmptyState icon={SearchX} title="No products found" text={`Nothing matched “${q}”. Check the spelling, or browse a popular search instead.`} cta="Browse all products" to="/collections/all" />
      ) : (
        <>
          <div className="mb-6 mt-10 flex items-center justify-between border-b border-line pb-4">
            <p className="text-[13px] text-muted" aria-live="polite">{results.length} {results.length === 1 ? 'result' : 'results'}</p>
            <select aria-label="Sort results" value={sort} onChange={(e) => setSort(e.target.value)} className="border border-line bg-white py-2.5 pl-3 pr-8 text-[13px] outline-none focus:border-ink">
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <ProductGrid products={results} />
        </>
      )}
    </div>
  )
}
