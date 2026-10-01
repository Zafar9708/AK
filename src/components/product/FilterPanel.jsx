import { useId } from 'react'
import { CATEGORIES } from '../../data/categories'

function Group({ title, children }) {
  return (
    <fieldset className="border-b border-line py-5 first:pt-0">
      <legend className="mb-3 float-left w-full text-[12px] font-medium uppercase tracking-[0.16em]">{title}</legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  )
}

function Check({ checked, onChange, label, count }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-[14px] text-ink">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 shrink-0 accent-[#242424]" />
      <span className="flex-1">{label}</span>
      {count != null && <span className="text-[12px] text-muted">{count}</span>}
    </label>
  )
}

export default function FilterPanel({ base, filters, setFilters, showCategory, onClear, activeCount }) {
  const uid = useId()
  const toggleIn = (key, val) =>
    setFilters((f) => ({ ...f, [key]: f[key].includes(val) ? f[key].filter((x) => x !== val) : [...f[key], val] }))

  const inStock = base.filter((p) => p.stock > 0).length
  const outStock = base.length - inStock

  const catCounts = CATEGORIES.map((c) => ({ ...c, count: base.filter((p) => p.category === c.slug).length })).filter((c) => c.count)

  const subMap = new Map()
  base.forEach((p) => { if (p.subcategory) subMap.set(p.subcategory, { label: p.subcategoryLabel, count: (subMap.get(p.subcategory)?.count || 0) + 1 }) })
  const subs = [...subMap.entries()]

  const colorMap = new Map()
  base.forEach((p) => p.colors.forEach((c) => colorMap.set(c.name, { hex: c.hex, count: (colorMap.get(c.name)?.count || 0) + 1 })))
  const colors = [...colorMap.entries()].sort((a, b) => b[1].count - a[1].count)

  const prices = base.map((p) => p.price)
  const maxPrice = prices.length ? Math.max(...prices) : 0

  return (
    <div>
      {activeCount > 0 && (
        <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
          <span className="text-[13px] text-muted">{activeCount} filter{activeCount > 1 ? 's' : ''} applied</span>
          <button onClick={onClear} className="text-[12px] uppercase tracking-[0.14em] underline underline-offset-4">Clear all</button>
        </div>
      )}

      <Group title="Availability">
        <Check label="In stock" count={inStock} checked={filters.availability === 'in'} onChange={() => setFilters((f) => ({ ...f, availability: f.availability === 'in' ? '' : 'in' }))} />
        <Check label="Out of stock" count={outStock} checked={filters.availability === 'out'} onChange={() => setFilters((f) => ({ ...f, availability: f.availability === 'out' ? '' : 'out' }))} />
      </Group>

      {showCategory && catCounts.length > 1 && (
        <Group title="Category">
          {catCounts.map((c) => (
            <Check key={c.slug} label={c.label} count={c.count} checked={filters.categories.includes(c.slug)} onChange={() => toggleIn('categories', c.slug)} />
          ))}
        </Group>
      )}

      {subs.length > 1 && (
        <Group title="Style">
          <div className="max-h-72 overflow-y-auto pr-1">
            {subs.map(([slug, s]) => (
              <Check key={slug} label={s.label} count={s.count} checked={filters.subcategories.includes(slug)} onChange={() => toggleIn('subcategories', slug)} />
            ))}
          </div>
        </Group>
      )}

      <Group title="Price">
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor={`${uid}-min`}>Minimum price</label>
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-muted">₹</span>
            <input id={`${uid}-min`} type="number" inputMode="numeric" min="0" placeholder="0" value={filters.minPrice} onChange={(e) => setFilters((f) => ({ ...f, minPrice: e.target.value }))} className="input py-2.5 pl-7" />
          </div>
          <span className="text-muted">–</span>
          <label className="sr-only" htmlFor={`${uid}-max`}>Maximum price</label>
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-muted">₹</span>
            <input id={`${uid}-max`} type="number" inputMode="numeric" min="0" placeholder={String(maxPrice)} value={filters.maxPrice} onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value }))} className="input py-2.5 pl-7" />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {[[0, 500], [500, 1000], [1000, 2500], [2500, '']].map(([a, b]) => {
            const active = String(filters.minPrice) === String(a) && String(filters.maxPrice) === String(b)
            return (
              <button key={`${a}-${b}`} onClick={() => setFilters((f) => ({ ...f, minPrice: active ? '' : String(a), maxPrice: active ? '' : String(b) }))} className={`border px-2.5 py-1 text-[12px] ${active ? 'border-ink bg-ink text-white' : 'border-line hover:border-ink'}`}>
                {b === '' ? `₹${a}+` : `₹${a}–${b}`}
              </button>
            )
          })}
        </div>
      </Group>

      {colors.length > 1 && (
        <Group title="Colour">
          <div className="flex flex-wrap gap-2">
            {colors.map(([name, c]) => {
              const active = filters.colors.includes(name)
              return (
                <button key={name} onClick={() => toggleIn('colors', name)} aria-pressed={active} className={`flex items-center gap-2 border px-2.5 py-1.5 text-[12px] transition ${active ? 'border-ink' : 'border-line hover:border-ink'}`}>
                  <span className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                  {name}
                </button>
              )
            })}
          </div>
        </Group>
      )}
    </div>
  )
}
