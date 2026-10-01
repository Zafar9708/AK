import { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { SlidersHorizontal, SearchX } from 'lucide-react'
import Breadcrumb from '../components/common/Breadcrumb'
import ProductGrid from '../components/product/ProductGrid'
import FilterPanel from '../components/product/FilterPanel'
import Drawer from '../components/common/Drawer'
import EmptyState from '../components/common/EmptyState'
import { GridSkeleton } from '../components/common/Skeleton'
import { getCategory } from '../data/categories'
import { getCollectionProducts } from '../data/products'
import { applyFilters, sortProducts, SORT_OPTIONS } from '../utils/filters'
import useDocumentTitle from '../utils/useDocumentTitle'
import NotFound from './NotFound'

const EMPTY = { availability: '', categories: [], subcategories: [], colors: [], minPrice: '', maxPrice: '' }

export default function Collection() {
  const { category } = useParams()
  const [params, setParams] = useSearchParams()
  const sub = params.get('sub')
  const cat = getCategory(category)

  const [filters, setFilters] = useState({ ...EMPTY, subcategories: sub ? [sub] : [] })
  const [sort, setSort] = useState(params.get('sort') || 'featured')
  const [drawer, setDrawer] = useState(false)
  const [loading, setLoading] = useState(true)

  // Reset filters when the collection or ?sub= changes
  useEffect(() => {
    setFilters({ ...EMPTY, subcategories: sub ? [sub] : [] })
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 350)
    return () => clearTimeout(t)
  }, [category, sub])

  const base = useMemo(() => (cat ? getCollectionProducts(category) : []), [category, cat])
  const results = useMemo(() => sortProducts(applyFilters(base, filters), sort), [base, filters, sort])

  const subLabel = sub && base.find((p) => p.subcategory === sub)?.subcategoryLabel
  useDocumentTitle(cat ? subLabel || cat.label : 'Collection not found', cat?.description)

  if (!cat) return <NotFound message="We couldn't find that collection. It may have been renamed or removed." />

  const activeCount =
    (filters.availability ? 1 : 0) + filters.categories.length + filters.subcategories.length + filters.colors.length + (filters.minPrice !== '' || filters.maxPrice !== '' ? 1 : 0)

  const clear = () => {
    setFilters(EMPTY)
    if (sub) { params.delete('sub'); setParams(params, { replace: true }) }
  }

  const onSort = (v) => {
    setSort(v)
    params.set('sort', v)
    setParams(params, { replace: true })
  }

  const isVirtual = !cat.subcategories
  const panel = <FilterPanel base={base} filters={filters} setFilters={setFilters} showCategory={isVirtual} onClear={clear} activeCount={activeCount} />

  const crumbs = [{ label: 'Home', to: '/' }, { label: cat.label, to: `/collections/${cat.slug}` }]
  if (subLabel) crumbs.push({ label: subLabel })

  return (
    <div>
      <section className="border-b border-line bg-cream">
        <div className="container-site py-10 sm:py-14">
          <Breadcrumb items={crumbs} />
          <h1 className="mt-5 font-serif text-4xl sm:text-5xl">{subLabel || cat.label}</h1>
          <p className="mt-3 max-w-2xl text-[14px] leading-6 text-muted sm:text-[15px]">{cat.description}</p>
          {cat.subcategories?.length > 0 && (
            <div className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
              <Link to={`/collections/${cat.slug}`} className={`shrink-0 border px-4 py-2 text-[12px] uppercase tracking-[0.12em] ${!sub ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink'}`}>All</Link>
              {cat.subcategories.filter((s) => base.some((p) => p.subcategory === s.slug)).map((s) => (
                <Link key={s.slug} to={`/collections/${cat.slug}?sub=${s.slug}`} className={`shrink-0 border px-4 py-2 text-[12px] uppercase tracking-[0.12em] ${sub === s.slug ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink'}`}>
                  {s.short || s.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="container-site py-8 sm:py-10">
        <div className="mb-6 flex items-center justify-between gap-3 border-b border-line pb-4">
          <button onClick={() => setDrawer(true)} className="flex items-center gap-2 border border-line px-4 py-2.5 text-[12px] uppercase tracking-[0.14em] lg:hidden">
            <SlidersHorizontal size={15} strokeWidth={1.4} /> Filter{activeCount > 0 && ` (${activeCount})`}
          </button>
          <p className="hidden text-[13px] text-muted lg:block" aria-live="polite">{results.length} {results.length === 1 ? 'product' : 'products'}</p>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="hidden text-[13px] text-muted sm:block">Sort by</label>
            <select id="sort" value={sort} onChange={(e) => onSort(e.target.value)} className="border border-line bg-white py-2.5 pl-3 pr-8 text-[13px] outline-none focus:border-ink">
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
        <p className="-mt-3 mb-5 text-[13px] text-muted lg:hidden" aria-live="polite">{results.length} {results.length === 1 ? 'product' : 'products'}</p>

        <div className="grid gap-10 lg:grid-cols-[250px_1fr]">
          <aside className="hidden lg:block" aria-label="Filters">
            <div className="sticky top-36">{panel}</div>
          </aside>
          <div>
            {loading ? (
              <GridSkeleton count={8} />
            ) : results.length === 0 ? (
              <EmptyState icon={SearchX} title="No products match these filters" text="Try removing a filter or widening the price range." cta="Clear filters" onClick={clear} />
            ) : (
              <ProductGrid products={results} columns="three-lg" eagerCount={4} />
            )}
          </div>
        </div>
      </div>

      <Drawer
        open={drawer}
        onClose={() => setDrawer(false)}
        side="left"
        title="Filter"
        widthClass="w-[88%] max-w-[380px]"
        footer={
          <div className="grid grid-cols-2 gap-2 p-4">
            <button onClick={clear} className="btn-outline px-2">Clear</button>
            <button onClick={() => setDrawer(false)} className="btn-dark px-2">Show {results.length}</button>
          </div>
        }
      >
        <div className="p-5">{panel}</div>
      </Drawer>
    </div>
  )
}
