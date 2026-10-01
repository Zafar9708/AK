export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'best', label: 'Best selling' },
  { value: 'price-asc', label: 'Price, low to high' },
  { value: 'price-desc', label: 'Price, high to low' },
  { value: 'newest', label: 'Newest' },
]

export function sortProducts(list, sort) {
  const arr = [...list]
  switch (sort) {
    case 'best': return arr.sort((a, b) => (b.isBestSeller - a.isBestSeller) || b.reviewCount - a.reviewCount)
    case 'price-asc': return arr.sort((a, b) => a.price - b.price)
    case 'price-desc': return arr.sort((a, b) => b.price - a.price)
    case 'newest': return arr.sort((a, b) => (b.isNew - a.isNew) || b.id - a.id)
    default: return arr.sort((a, b) => (b.isFeatured - a.isFeatured) || a.id - b.id)
  }
}

export function applyFilters(list, f) {
  return list.filter((p) => {
    if (f.availability === 'in' && p.stock <= 0) return false
    if (f.availability === 'out' && p.stock > 0) return false
    if (f.categories?.length && !f.categories.includes(p.category)) return false
    if (f.subcategories?.length && !f.subcategories.includes(p.subcategory)) return false
    if (f.colors?.length && !p.colors.some((c) => f.colors.includes(c.name))) return false
    if (f.minPrice !== '' && f.minPrice != null && p.price < Number(f.minPrice)) return false
    if (f.maxPrice !== '' && f.maxPrice != null && p.price > Number(f.maxPrice)) return false
    return true
  })
}

export function searchProducts(list, q) {
  const term = q.trim().toLowerCase()
  if (!term) return []
  const words = term.split(/\s+/)
  return list
    .map((p) => {
      const hay = `${p.name} ${p.categoryLabel} ${p.subcategoryLabel || ''} ${p.tags.join(' ')} ${p.colors.map((c) => c.name).join(' ')}`.toLowerCase()
      const hits = words.filter((w) => hay.includes(w)).length
      return { p, hits, score: hits + (p.name.toLowerCase().includes(term) ? 2 : 0) }
    })
    .filter((x) => x.hits === words.length)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p)
}
