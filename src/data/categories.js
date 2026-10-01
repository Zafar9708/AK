import { img, IMG } from './images'

export const HIJAB_STYLES = [
  { slug: 'jersey', label: 'Jersey Hijabs', short: 'Jersey' },
  { slug: 'modal', label: 'Modal Hijabs', short: 'Modal' },
  { slug: 'malaysian-georgette', label: 'Malaysian Georgette', short: 'Georgette' },
  { slug: 'liquid-jersey', label: 'Liquid Jersey', short: 'Liquid Jersey' },
  { slug: 'pashmina', label: 'Pashmina', short: 'Pashmina' },
  { slug: 'corn-jersey', label: 'Corn Jersey', short: 'Corn Jersey' },
  { slug: 'stone-work', label: 'Stone Work Hijabs', short: 'Stone Work' },
  { slug: 'ribbed-jersey', label: 'Ribbed Jersey', short: 'Ribbed' },
  { slug: 'bamboo-jersey', label: 'Bamboo Jersey', short: 'Bamboo' },
  { slug: 'turkish-instant', label: 'Turkish Instant Hijabs', short: 'Turkish Instant' },
  { slug: 'makhna', label: 'Makhna', short: 'Makhna' },
  { slug: 'instant-scarf', label: 'Instant Scarves', short: 'Instant Scarf' },
  { slug: 'printed-chiffon', label: 'Printed Chiffon', short: 'Printed' },
]

export const CATEGORIES = [
  {
    slug: 'hijabs',
    label: 'Hijabs',
    description: 'Everyday jersey, airy modal, silky georgette and occasion-ready stone work — hijabs in fabrics that breathe and shades that go with everything.',
    image: img(IMG.H1, 700),
    subcategories: HIJAB_STYLES,
  },
  {
    slug: 'abayas',
    label: 'Abayas',
    description: 'Open, closed, kimono and embellished abayas in flowing nida, crepe and silk-touch fabrics, finished with considered details.',
    image: img(IMG.A4, 700),
    subcategories: [
      { slug: 'open', label: 'Open Abayas' },
      { slug: 'closed', label: 'Closed Abayas' },
      { slug: 'embellished', label: 'Embellished Abayas' },
    ],
  },
  {
    slug: 'clothing',
    label: 'Clothing',
    description: 'Maxi dresses, longline shirts, pleated skirts and kaftans designed with modest proportions and easy layering in mind.',
    image: img(IMG.A10, 700),
    subcategories: [
      { slug: 'dresses', label: 'Dresses' },
      { slug: 'tops', label: 'Tops & Shirts' },
      { slug: 'bottoms', label: 'Skirts' },
      { slug: 'layers', label: 'Layers' },
    ],
  },
  {
    slug: 'turkish-cord-sets',
    label: 'Turkish Cord Sets',
    description: 'Matching two-piece sets in ribbed knit, linen and pleated crepe — the easiest way to look put together.',
    image: img(IMG.A1, 700),
    subcategories: [],
  },
  {
    slug: 'accessories',
    label: 'Accessories',
    description: 'Hijab caps, undercaps, magnets and pins — the small essentials that keep every style secure and polished.',
    image: img(IMG.S9, 700),
    subcategories: [
      { slug: 'hijab-caps', label: 'Hijab Caps' },
      { slug: 'pins-magnets', label: 'Pins & Magnets' },
    ],
  },
  {
    slug: 'jewellery',
    label: 'Jewellery',
    description: 'Gold-tone bracelets, American diamond rings, pendants and hoops — everyday sparkle that layers beautifully.',
    image: img(IMG.J1, 700),
    subcategories: [
      { slug: 'rings', label: 'Rings' },
      { slug: 'bracelets', label: 'Bracelets & Kada' },
      { slug: 'necklaces', label: 'Necklaces' },
      { slug: 'earrings', label: 'Earrings' },
    ],
  },
  {
    slug: 'keychains',
    label: 'Keychains',
    description: 'Pearl, crescent and tassel charms for your keys and bags — small gifts that feel considered.',
    image: img(IMG.J14, 700),
    subcategories: [],
  },
  {
    slug: 'skincare',
    label: 'Skincare',
    description: 'Gentle cleansers, serums, mists and attars for a simple, effective daily routine.',
    image: img(IMG.S3, 700),
    subcategories: [],
  },
]

// Virtual collections built from product flags rather than a category field
export const VIRTUAL_COLLECTIONS = {
  sale: { slug: 'sale', label: 'Sale', description: 'Selected hijabs, abayas, jewellery and skincare at reduced prices while stock lasts.' },
  'new-arrivals': { slug: 'new-arrivals', label: 'New Arrivals', description: 'The latest fabrics, shades and silhouettes — added to the store this season.' },
  'best-sellers': { slug: 'best-sellers', label: 'Best Sellers', description: 'The pieces our customers reorder most, from everyday jersey to signature abayas.' },
  all: { slug: 'all', label: 'All Products', description: 'Everything in the AK Fashion store, in one place.' },
}

export const getCategory = (slug) =>
  CATEGORIES.find((c) => c.slug === slug) || VIRTUAL_COLLECTIONS[slug] || null

export const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Hijabs', to: '/collections/hijabs', mega: true },
  { label: 'Abayas', to: '/collections/abayas' },
  { label: 'Clothing', to: '/collections/clothing' },
  { label: 'Accessories', to: '/collections/accessories' },
  { label: 'Jewellery', to: '/collections/jewellery' },
  { label: 'Turkish Cord Sets', to: '/collections/turkish-cord-sets' },
  { label: 'Keychains', to: '/collections/keychains' },
  { label: 'Skincare', to: '/collections/skincare' },
  { label: 'Sale', to: '/collections/sale', accent: true },
]
