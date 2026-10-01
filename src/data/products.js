import { img, IMG } from './images'
import { CATEGORIES } from './categories'

export const COLORS = {
  Black: '#1f1f1f',
  Ivory: '#f4efe6',
  'Warm Beige': '#d9c4a9',
  Mocha: '#8a6a55',
  Taupe: '#a39182',
  'Dusty Rose': '#c9a1a0',
  Sage: '#a7b39a',
  Navy: '#2b3550',
  Olive: '#6f6d48',
  Grey: '#9a9a9a',
  Stone: '#bdb5a8',
  Lilac: '#b9a8c4',
  Bronze: '#8c6a43',
  Maroon: '#6e2d34',
  Sand: '#d8c7ad',
  Champagne: '#e7d6b8',
  'Floral Beige': '#dcc8b0',
  Gold: '#c9a55c',
  Silver: '#c4c4c4',
  'Rose Gold': '#d4a28f',
  Pearl: '#efe9df',
  White: '#ffffff',
}

const sw = (...names) => names.map((name) => ({ name, hex: COLORS[name] }))

// Fabric / product-type copy so each product reads differently
const COPY = {
  jersey: {
    blurb: 'A soft, stretchy cotton-blend jersey with a matte finish that grips gently, so it needs fewer pins and stays in place all day.',
    details: ['Fabric: Premium cotton-blend jersey', 'Size: approx. 180 × 70 cm', 'Finish: Matte, non-slip', 'Opacity: Fully opaque'],
    care: 'Hand wash cold or machine wash on a gentle cycle in a laundry bag. Dry flat in shade. Warm iron if needed.',
  },
  modal: {
    blurb: 'Modal is plant-based, breathable and silky to the touch. It drapes softly and keeps you cool through long, warm days.',
    details: ['Fabric: Modal viscose', 'Size: approx. 180 × 75 cm', 'Finish: Soft sheen, fluid drape', 'Opacity: Opaque'],
    care: 'Hand wash cold with mild detergent. Do not wring. Dry flat in shade and steam to remove creases.',
  },
  'malaysian-georgette': {
    blurb: 'Lightweight Malaysian georgette with a delicate crinkle that holds pleats beautifully — elegant for work, events and everything between.',
    details: ['Fabric: Malaysian georgette', 'Size: approx. 175 × 70 cm', 'Finish: Light texture, slight sheen', 'Opacity: Semi-opaque — pair with an undercap'],
    care: 'Hand wash cold. Do not tumble dry. Low iron on the reverse side.',
  },
  'liquid-jersey': {
    blurb: 'An instant hijab in liquid jersey with a fitted inner layer — slip it on, adjust, and go. No pins, no fuss.',
    details: ['Fabric: Liquid jersey (poly-spandex)', 'Style: Instant / slip-on', 'Fit: One size, stretch fit', 'Opacity: Fully opaque'],
    care: 'Machine wash cold on gentle in a laundry bag. Line dry. Do not iron directly.',
  },
  pashmina: {
    blurb: 'A generous, wrap-friendly pashmina-style shawl with fine tasselled ends. Warm without bulk and soft enough to wear all day.',
    details: ['Fabric: Viscose-wool blend', 'Size: approx. 200 × 70 cm', 'Finish: Brushed, tasselled ends', 'Season: Autumn / winter'],
    care: 'Dry clean recommended. Alternatively hand wash cold and dry flat.',
  },
  'corn-jersey': {
    blurb: 'Corn jersey has a subtle textured weave and a light stretch, giving a crisp, structured shape that is still easy to style.',
    details: ['Fabric: Textured corn jersey', 'Size: approx. 180 × 70 cm', 'Finish: Matte with fine texture', 'Opacity: Fully opaque'],
    care: 'Hand wash cold. Dry flat in shade. Cool iron if needed.',
  },
  'stone-work': {
    blurb: 'A refined georgette hijab finished with hand-set stone embellishment along the border — made for Eid, weddings and evenings out.',
    details: ['Fabric: Premium georgette', 'Embellishment: Hand-set stones', 'Size: approx. 180 × 70 cm', 'Occasion: Party / festive'],
    care: 'Dry clean only. Store folded in a pouch to protect the stonework.',
  },
  'ribbed-jersey': {
    blurb: 'A ribbed jersey with a soft, textured surface that adds dimension to the simplest outfit. Stretchy, breathable and easy to wrap.',
    details: ['Fabric: Ribbed cotton jersey', 'Size: approx. 175 × 70 cm', 'Finish: Vertical rib texture', 'Opacity: Fully opaque'],
    care: 'Machine wash cold, gentle cycle. Dry flat to keep the rib shape.',
  },
  'bamboo-jersey': {
    blurb: 'Bamboo jersey is naturally breathable and feels cool against the skin — our go-to for Indian summers. No pins needed.',
    details: ['Fabric: Bamboo viscose jersey', 'Size: approx. 180 × 70 cm', 'Finish: Silky matte', 'Feature: Breathable, no-pin grip'],
    care: 'Hand wash cold with mild detergent. Dry flat in shade.',
  },
  'turkish-instant': {
    blurb: 'A Turkish-style instant hijab with a built-in cap and pre-shaped front for a neat, structured look in seconds.',
    details: ['Fabric: Crepe jersey', 'Style: Instant with inner cap', 'Fit: One size', 'Origin: Turkish-inspired cut'],
    care: 'Hand wash cold. Do not bleach. Dry flat in shade.',
  },
  makhna: {
    blurb: 'A classic makhna that slips over the head and frames the face neatly — comfortable for daily wear, college and prayer.',
    details: ['Fabric: Soft crepe', 'Style: Slip-on makhna', 'Length: Mid-chest coverage', 'Fit: One size'],
    care: 'Machine wash cold on gentle. Line dry.',
  },
  'instant-scarf': {
    blurb: 'An easy instant scarf with a soft elastic back — throw it on for school runs, errands and travel.',
    details: ['Fabric: Viscose jersey', 'Style: Instant scarf with elastic back', 'Fit: One size', 'Opacity: Opaque'],
    care: 'Machine wash cold. Line dry.',
  },
  'printed-chiffon': {
    blurb: 'Airy chiffon printed with a soft floral, light enough to layer and pretty enough to wear on its own.',
    details: ['Fabric: Printed chiffon', 'Size: approx. 180 × 70 cm', 'Finish: Light sheen, floaty', 'Opacity: Sheer — pair with an undercap'],
    care: 'Hand wash cold separately. Do not wring. Low iron.',
  },
  abaya: {
    blurb: 'A flowing abaya cut with generous room through the body and sleeves, finished with clean seams and a weighted hem that falls beautifully.',
    details: ['Fabric: Premium nida / crepe', 'Length: Floor length (sizes 52–58)', 'Lining: Unlined, opaque', 'Includes: Matching sheila on select styles'],
    care: 'Dry clean recommended. Alternatively hand wash cold and steam.',
  },
  clothing: {
    blurb: 'A modest-proportioned essential designed for layering — full-length, relaxed through the body and easy to dress up or down.',
    details: ['Fit: Relaxed', 'Length: Full / ankle length', 'Sizes: S – XL', 'Modest: Long sleeves, high neckline'],
    care: 'Machine wash cold on gentle. Line dry. Warm iron.',
  },
  cordset: {
    blurb: 'A matching two-piece set — a longline top and wide-leg trousers — that looks polished with zero styling effort.',
    details: ['Includes: Top + trousers', 'Fit: Relaxed, longline top', 'Sizes: S – XL', 'Waist: Elasticated with drawcord'],
    care: 'Hand wash cold or gentle machine wash. Dry flat to keep shape.',
  },
  accessory: {
    blurb: 'A small essential that keeps your hijab secure and neat, without snagging delicate fabrics.',
    details: ['Use: Everyday hijab styling', 'Safe for: Jersey, chiffon and georgette', 'Comes in: Gift-ready pouch'],
    care: 'Wipe clean with a soft dry cloth. Store in the pouch provided.',
  },
  jewellery: {
    blurb: 'Gold-tone fashion jewellery with a tarnish-resistant finish — light enough for every day and pretty enough for occasions.',
    details: ['Material: Brass with gold-tone plating', 'Stones: American diamond (CZ) where shown', 'Finish: Tarnish-resistant', 'Packaging: Gift box included'],
    care: 'Avoid perfume, water and lotions. Wipe with a soft cloth and store in the box provided.',
  },
  keychain: {
    blurb: 'A pretty charm for your keys or handbag — a thoughtful little gift that feels anything but generic.',
    details: ['Material: Alloy with pearl / enamel details', 'Clasp: Lobster clasp with split ring', 'Packaging: Gift pouch'],
    care: 'Wipe clean with a dry cloth.',
  },
  skincare: {
    blurb: 'A gentle, dermatologically considered formula made for daily use and suitable for most skin types.',
    details: ['Skin type: All skin types', 'Free from: Parabens, sulphates', 'Cruelty-free', 'Made in India'],
    care: 'Store in a cool, dry place away from direct sunlight. Patch test before first use.',
  },
}

const slugify = (s) =>
  s.toLowerCase().replace(/–/g, '-').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const RAW = [
  // ——— Hijabs
  { name: 'Premium Jersey Hijab – Mocha', category: 'hijabs', sub: 'jersey', copy: 'jersey', price: 549, compare: 699, imgs: ['H8', 'H5'], colors: sw('Mocha', 'Black', 'Warm Beige', 'Dusty Rose', 'Navy'), flags: 'featured best', rating: 4.8, reviews: 214, stock: 42, tags: ['everyday', 'no-pin', 'bestseller'] },
  { name: 'Luxury Modal Hijab – Dusty Rose', category: 'hijabs', sub: 'modal', copy: 'modal', price: 699, compare: 899, imgs: ['H9', 'H1'], colors: sw('Dusty Rose', 'Ivory', 'Taupe', 'Sage'), flags: 'new best featured', rating: 4.9, reviews: 168, stock: 28, tags: ['breathable', 'summer', 'premium'] },
  { name: 'Malaysian Georgette Hijab – Black', category: 'hijabs', sub: 'malaysian-georgette', copy: 'malaysian-georgette', price: 649, imgs: ['H7', 'H14'], colors: sw('Black', 'Navy', 'Olive', 'Maroon'), flags: 'best', rating: 4.7, reviews: 132, stock: 35, tags: ['georgette', 'work', 'events'] },
  { name: 'Instant Liquid Jersey Hijab – Taupe', category: 'hijabs', sub: 'liquid-jersey', copy: 'liquid-jersey', price: 799, imgs: ['H6', 'H3'], colors: sw('Taupe', 'Black', 'Stone'), flags: 'new', rating: 4.6, reviews: 58, stock: 19, tags: ['instant', 'no-pin', 'travel'] },
  { name: 'Premium Pashmina Shawl – Bronze', category: 'hijabs', sub: 'pashmina', copy: 'pashmina', price: 560, compare: 800, imgs: ['H10', 'H13'], colors: sw('Bronze', 'Black', 'Maroon'), flags: 'best', rating: 4.8, reviews: 96, stock: 14, tags: ['winter', 'shawl', 'wrap'] },
  { name: 'Corn Jersey Hijab – Warm Beige', category: 'hijabs', sub: 'corn-jersey', copy: 'corn-jersey', price: 399, imgs: ['H3', 'H4'], colors: sw('Warm Beige', 'Black', 'Grey', 'Sage'), flags: '', rating: 4.5, reviews: 77, stock: 50, tags: ['everyday', 'textured'] },
  { name: 'Stone Work Hijab – Black', category: 'hijabs', sub: 'stone-work', copy: 'stone-work', price: 1099, compare: 1299, imgs: ['A5', 'H14'], colors: sw('Black', 'Navy'), flags: 'featured', rating: 4.9, reviews: 41, stock: 8, tags: ['party', 'eid', 'wedding', 'embellished'] },
  { name: 'Ribbed Jersey Hijab – Sage', category: 'hijabs', sub: 'ribbed-jersey', copy: 'ribbed-jersey', price: 449, imgs: ['H4', 'H6'], colors: sw('Sage', 'Warm Beige', 'Black', 'Grey'), flags: 'new', rating: 4.6, reviews: 64, stock: 31, tags: ['textured', 'everyday'] },
  { name: 'Soft Bamboo Jersey Hijab – Sage', category: 'hijabs', sub: 'bamboo-jersey', copy: 'bamboo-jersey', price: 599, imgs: ['H1', 'H9'], colors: sw('Sage', 'Ivory', 'Mocha', 'Lilac'), flags: 'new best', rating: 4.9, reviews: 189, stock: 37, tags: ['summer', 'breathable', 'no-pin'] },
  { name: 'Turkish Instant Hijab – Ivory', category: 'hijabs', sub: 'turkish-instant', copy: 'turkish-instant', price: 899, imgs: ['H2', 'H7'], colors: sw('Ivory', 'Black', 'Taupe'), flags: 'new featured', rating: 4.7, reviews: 52, stock: 22, tags: ['instant', 'turkish', 'structured'] },
  { name: 'Classic Makhna – Black', category: 'hijabs', sub: 'makhna', copy: 'makhna', price: 499, imgs: ['H14', 'H7'], colors: sw('Black', 'Navy', 'White'), flags: '', rating: 4.6, reviews: 88, stock: 45, tags: ['prayer', 'college', 'slip-on'] },
  { name: 'Everyday Instant Scarf – Stone', category: 'hijabs', sub: 'instant-scarf', copy: 'instant-scarf', price: 599, imgs: ['H12', 'H8'], colors: sw('Stone', 'Black', 'Dusty Rose'), flags: '', rating: 4.5, reviews: 39, stock: 26, tags: ['instant', 'travel'] },
  { name: 'Printed Chiffon Hijab – Floral Beige', category: 'hijabs', sub: 'printed-chiffon', copy: 'printed-chiffon', price: 529, compare: 699, imgs: ['H11', 'H13'], colors: sw('Floral Beige', 'Dusty Rose'), flags: 'new', rating: 4.4, reviews: 27, stock: 18, tags: ['printed', 'floral', 'summer'] },
  { name: 'Everyday Georgette Hijab – Navy', category: 'hijabs', sub: 'malaysian-georgette', copy: 'malaysian-georgette', price: 649, imgs: ['H13', 'H12'], colors: sw('Navy', 'Black', 'Taupe'), flags: '', rating: 4.6, reviews: 71, stock: 29, tags: ['georgette', 'work'] },
  { name: 'Luxury Modal Hijab – Ivory', category: 'hijabs', sub: 'modal', copy: 'modal', price: 699, imgs: ['H1', 'H2'], colors: sw('Ivory', 'Dusty Rose', 'Taupe'), flags: '', rating: 4.8, reviews: 103, stock: 24, tags: ['breathable', 'premium'] },
  { name: 'Ribbed Jersey Hijab – Grey', category: 'hijabs', sub: 'ribbed-jersey', copy: 'ribbed-jersey', price: 449, imgs: ['H6', 'H4'], colors: sw('Grey'), flags: '', rating: 4.5, reviews: 46, stock: 0, tags: ['textured', 'everyday'] },
  { name: 'Premium Jersey Hijab – Black', category: 'hijabs', sub: 'jersey', copy: 'jersey', price: 549, imgs: ['H7', 'H14'], colors: sw('Black', 'Mocha', 'Navy'), flags: 'best', rating: 4.9, reviews: 241, stock: 60, tags: ['everyday', 'no-pin', 'bestseller'] },
  { name: 'Paisley Pashmina Shawl – Black', category: 'hijabs', sub: 'pashmina', copy: 'pashmina', price: 560, compare: 800, imgs: ['H5', 'H10'], colors: sw('Black', 'Bronze'), flags: '', rating: 4.7, reviews: 54, stock: 12, tags: ['winter', 'printed', 'shawl'] },
  { name: 'Bamboo Jersey Hijab – Lilac', category: 'hijabs', sub: 'bamboo-jersey', copy: 'bamboo-jersey', price: 599, imgs: ['H9', 'H3'], colors: sw('Lilac', 'Sage', 'Ivory'), flags: 'new', rating: 4.8, reviews: 33, stock: 20, tags: ['summer', 'breathable'] },
  { name: 'Turkish Instant Hijab – Mocha', category: 'hijabs', sub: 'turkish-instant', copy: 'turkish-instant', price: 899, compare: 1099, imgs: ['H8', 'H2'], colors: sw('Mocha', 'Ivory', 'Black'), flags: '', rating: 4.6, reviews: 29, stock: 11, tags: ['instant', 'turkish'] },

  // ——— Abayas
  { name: 'Medina Silk Abaya – Midnight Black', category: 'abayas', sub: 'closed', copy: 'abaya', price: 2999, compare: 3499, imgs: ['A4', 'A12'], colors: sw('Black'), sizes: ['52', '54', '56', '58'], flags: 'featured best', rating: 4.9, reviews: 87, stock: 16, tags: ['silk-touch', 'occasion', 'black abaya'] },
  { name: 'Noor Embroidered Abaya – Taupe', category: 'abayas', sub: 'embellished', copy: 'abaya', price: 3799, imgs: ['A6', 'A9'], colors: sw('Taupe', 'Sand'), sizes: ['52', '54', '56', '58'], flags: 'new featured', rating: 4.8, reviews: 34, stock: 9, tags: ['embroidered', 'eid', 'occasion'] },
  { name: 'Classic Open Abaya – Mocha', category: 'abayas', sub: 'open', copy: 'abaya', price: 2299, imgs: ['A2', 'A8'], colors: sw('Mocha', 'Black', 'Stone'), sizes: ['52', '54', '56', '58'], flags: 'best', rating: 4.7, reviews: 112, stock: 21, tags: ['open abaya', 'everyday'] },
  { name: 'Pearl Sleeve Abaya – Black', category: 'abayas', sub: 'embellished', copy: 'abaya', price: 4499, compare: 4999, imgs: ['A12', 'A4'], colors: sw('Black'), sizes: ['54', '56', '58'], flags: 'new', rating: 5.0, reviews: 18, stock: 6, tags: ['pearl', 'embellished', 'luxury'] },
  { name: 'Dubai Kimono Abaya – Navy', category: 'abayas', sub: 'open', copy: 'abaya', price: 3299, imgs: ['A9', 'A11'], colors: sw('Navy', 'Black'), sizes: ['52', '54', '56', '58'], flags: '', rating: 4.7, reviews: 43, stock: 13, tags: ['kimono', 'dubai'] },
  { name: 'Everyday Nida Abaya – Black & White', category: 'abayas', sub: 'closed', copy: 'abaya', price: 1899, imgs: ['A13', 'A7'], colors: sw('Black', 'White'), sizes: ['52', '54', '56', '58'], flags: 'best', rating: 4.6, reviews: 129, stock: 33, tags: ['nida', 'everyday', 'work'] },
  { name: 'Zaina Butterfly Abaya – Sand', category: 'abayas', sub: 'closed', copy: 'abaya', price: 2799, imgs: ['A11', 'A6'], colors: sw('Sand', 'Taupe'), sizes: ['52', '54', '56'], flags: 'new', rating: 4.7, reviews: 22, stock: 10, tags: ['butterfly', 'flowy'] },

  // ——— Clothing
  { name: 'Linen Blend Maxi Dress – Olive', category: 'clothing', sub: 'dresses', copy: 'clothing', price: 1899, imgs: ['A10', 'A3'], colors: sw('Olive', 'Sand'), sizes: ['S', 'M', 'L', 'XL'], flags: 'new', rating: 4.7, reviews: 31, stock: 17, tags: ['linen', 'maxi', 'summer'] },
  { name: 'Pleated Modest Skirt – Black', category: 'clothing', sub: 'bottoms', copy: 'clothing', price: 1299, imgs: ['H2', 'H14'], colors: sw('Black', 'Taupe', 'Navy'), sizes: ['S', 'M', 'L', 'XL'], flags: 'best', rating: 4.6, reviews: 58, stock: 25, tags: ['pleated', 'skirt', 'work'] },
  { name: 'Relaxed Longline Shirt – Ivory', category: 'clothing', sub: 'tops', copy: 'clothing', price: 1499, imgs: ['H7', 'H1'], colors: sw('Ivory', 'Sage', 'Black'), sizes: ['S', 'M', 'L', 'XL'], flags: '', rating: 4.5, reviews: 26, stock: 19, tags: ['shirt', 'longline', 'office'] },
  { name: 'Satin Kaftan Dress – Champagne', category: 'clothing', sub: 'dresses', copy: 'clothing', price: 2699, compare: 3299, imgs: ['A3', 'A10'], colors: sw('Champagne', 'Dusty Rose'), sizes: ['S', 'M', 'L', 'XL'], flags: 'featured', rating: 4.8, reviews: 19, stock: 7, tags: ['kaftan', 'satin', 'occasion'] },
  { name: 'Everyday Kimono Cardigan – Taupe', category: 'clothing', sub: 'layers', copy: 'clothing', price: 1699, imgs: ['H9', 'A1'], colors: sw('Taupe', 'Black'), sizes: ['S/M', 'L/XL'], flags: '', rating: 4.6, reviews: 37, stock: 14, tags: ['kimono', 'layer', 'cardigan'] },

  // ——— Turkish cord sets
  { name: 'Turkish Ribbed Co-ord Set – Beige', category: 'turkish-cord-sets', sub: null, copy: 'cordset', price: 2499, imgs: ['A1', 'H12'], colors: sw('Warm Beige', 'Black', 'Sage'), sizes: ['S', 'M', 'L', 'XL'], flags: 'new best featured', rating: 4.8, reviews: 64, stock: 18, tags: ['co-ord', 'ribbed', 'turkish', 'two-piece'] },
  { name: 'Istanbul Knit Co-ord Set – Mocha', category: 'turkish-cord-sets', sub: null, copy: 'cordset', price: 2799, imgs: ['H8', 'A8'], colors: sw('Mocha', 'Stone'), sizes: ['S', 'M', 'L', 'XL'], flags: '', rating: 4.7, reviews: 23, stock: 12, tags: ['co-ord', 'knit', 'turkish'] },
  { name: 'Turkish Pleated Co-ord Set – Sage', category: 'turkish-cord-sets', sub: null, copy: 'cordset', price: 2599, compare: 2999, imgs: ['A11', 'H3'], colors: sw('Sage', 'Dusty Rose'), sizes: ['S', 'M', 'L', 'XL'], flags: 'new', rating: 4.6, reviews: 15, stock: 9, tags: ['co-ord', 'pleated', 'turkish'] },
  { name: 'Ezra Linen Co-ord Set – Black', category: 'turkish-cord-sets', sub: null, copy: 'cordset', price: 2299, imgs: ['H14', 'A13'], colors: sw('Black', 'Ivory'), sizes: ['S', 'M', 'L', 'XL'], flags: '', rating: 4.7, reviews: 28, stock: 0, tags: ['co-ord', 'linen'] },

  // ——— Accessories
  { name: 'Pearl Hijab Magnet Set', category: 'accessories', sub: 'pins-magnets', copy: 'accessory', price: 349, compare: 449, imgs: ['J7', 'J9'], colors: sw('Pearl', 'Gold'), flags: 'best', rating: 4.8, reviews: 156, stock: 80, tags: ['magnet', 'pearl', 'no-snag'] },
  { name: 'Luxury Hijab Pin Set', category: 'accessories', sub: 'pins-magnets', copy: 'accessory', price: 249, imgs: ['J4', 'J14'], colors: sw('Gold', 'Silver'), flags: '', rating: 4.6, reviews: 92, stock: 120, tags: ['pins', 'set of 12'] },
  { name: 'Daily Wear Hijab Cap – Cotton', category: 'accessories', sub: 'hijab-caps', copy: 'accessory', price: 199, imgs: ['S9', 'H1'], colors: sw('Black', 'White', 'Warm Beige', 'Dusty Rose'), flags: 'best', rating: 4.7, reviews: 203, stock: 150, tags: ['undercap', 'tube cap', 'everyday'] },
  { name: 'Party Wear Hijab Cap – Shimmer', category: 'accessories', sub: 'hijab-caps', copy: 'accessory', price: 299, imgs: ['S9', 'A5'], colors: sw('Black', 'Champagne'), flags: '', rating: 4.5, reviews: 44, stock: 38, tags: ['undercap', 'party', 'shimmer'] },
  { name: 'Satin Hijab Undercap Trio', category: 'accessories', sub: 'hijab-caps', copy: 'accessory', price: 449, imgs: ['S9', 'H9'], colors: sw('Black', 'Ivory', 'Mocha'), flags: 'new', rating: 4.8, reviews: 21, stock: 40, tags: ['undercap', 'satin', 'hair care'] },

  // ——— Jewellery
  { name: 'Minimal Gold Bracelet', category: 'jewellery', sub: 'bracelets', copy: 'jewellery', price: 699, imgs: ['J12', 'J15'], colors: sw('Gold', 'Rose Gold'), flags: 'best', rating: 4.8, reviews: 76, stock: 30, tags: ['bracelet', 'chain', 'gift'] },
  { name: 'American Diamond Solitaire Ring', category: 'jewellery', sub: 'rings', copy: 'jewellery', price: 499, compare: 699, imgs: ['J13', 'J8'], colors: sw('Silver', 'Gold'), sizes: ['6', '7', '8'], flags: '', rating: 4.6, reviews: 48, stock: 22, tags: ['ring', 'american diamond', 'cz'] },
  { name: 'Crescent Pendant Necklace', category: 'jewellery', sub: 'necklaces', copy: 'jewellery', price: 899, imgs: ['J2', 'J10'], colors: sw('Gold'), flags: 'new best featured', rating: 4.9, reviews: 61, stock: 18, tags: ['crescent', 'pendant', 'gift'] },
  { name: 'Twisted Gold Hoop Earrings', category: 'jewellery', sub: 'earrings', copy: 'jewellery', price: 599, imgs: ['J3', 'J11'], colors: sw('Gold'), flags: 'new', rating: 4.7, reviews: 25, stock: 27, tags: ['hoops', 'earrings'] },
  { name: 'Stacking Rings Trio', category: 'jewellery', sub: 'rings', copy: 'jewellery', price: 799, imgs: ['J4', 'J8'], colors: sw('Gold'), sizes: ['6', '7', '8'], flags: '', rating: 4.7, reviews: 39, stock: 15, tags: ['rings', 'stacking', 'set'] },
  { name: 'AD Chain Bracelet', category: 'jewellery', sub: 'bracelets', copy: 'jewellery', price: 1299, compare: 1499, imgs: ['J15', 'J12'], colors: sw('Gold', 'Silver'), flags: '', rating: 4.8, reviews: 17, stock: 11, tags: ['american diamond', 'kada', 'bracelet'] },

  // ——— Keychains
  { name: 'Pearl Charm Keychain', category: 'keychains', sub: null, copy: 'keychain', price: 199, imgs: ['J7', 'J14'], colors: sw('Pearl'), flags: 'new', rating: 4.7, reviews: 18, stock: 60, tags: ['keychain', 'pearl', 'gift'] },
  { name: 'Gold Crescent Keychain', category: 'keychains', sub: null, copy: 'keychain', price: 249, imgs: ['J10', 'J2'], colors: sw('Gold'), flags: '', rating: 4.6, reviews: 12, stock: 45, tags: ['keychain', 'crescent'] },
  { name: 'Tassel Bag Charm Keychain', category: 'keychains', sub: null, copy: 'keychain', price: 179, compare: 249, imgs: ['J14', 'J1'], colors: sw('Mocha', 'Dusty Rose', 'Black'), flags: '', rating: 4.5, reviews: 9, stock: 70, tags: ['bag charm', 'tassel'] },

  // ——— Skincare
  { name: 'Rose Water Facial Mist', category: 'skincare', sub: null, copy: 'skincare', price: 399, imgs: ['S3', 'S7'], colors: [], flags: 'best', rating: 4.7, reviews: 84, stock: 55, tags: ['toner', 'mist', 'hydrating'] },
  { name: 'Vitamin C Glow Serum', category: 'skincare', sub: null, copy: 'skincare', price: 699, compare: 899, imgs: ['S2', 'S5'], colors: [], flags: 'new featured', rating: 4.8, reviews: 47, stock: 32, tags: ['serum', 'brightening'] },
  { name: 'Ceramide Daily Moisturiser', category: 'skincare', sub: null, copy: 'skincare', price: 549, imgs: ['S4', 'S6'], colors: [], flags: '', rating: 4.6, reviews: 38, stock: 40, tags: ['moisturiser', 'barrier'] },
  { name: 'Oud & Amber Attar – 10 ml', category: 'skincare', sub: null, copy: 'skincare', price: 899, imgs: ['S8', 'S1'], colors: [], flags: 'new', rating: 4.9, reviews: 26, stock: 20, tags: ['attar', 'fragrance', 'alcohol-free'] },
  { name: 'Gentle Foaming Cleanser', category: 'skincare', sub: null, copy: 'skincare', price: 449, imgs: ['S1', 'S8'], colors: [], flags: '', rating: 4.5, reviews: 31, stock: 48, tags: ['cleanser', 'face wash'] },
]

const catLabel = (slug) => CATEGORIES.find((c) => c.slug === slug)?.label || slug
const subLabel = (cat, sub) => CATEGORIES.find((c) => c.slug === cat)?.subcategories.find((s) => s.slug === sub)?.label || null
const skuPrefix = { hijabs: 'HJB', abayas: 'ABY', clothing: 'CLO', 'turkish-cord-sets': 'TCS', accessories: 'ACC', jewellery: 'JWL', keychains: 'KEY', skincare: 'SKN' }

export const PRODUCTS = RAW.map((r, i) => {
  const id = i + 1
  const copy = COPY[r.copy]
  const base = r.name.split(' – ')[0]
  const isSale = Boolean(r.compare && r.compare > r.price)
  return {
    id,
    slug: slugify(r.name),
    name: r.name,
    category: r.category,
    categoryLabel: catLabel(r.category),
    subcategory: r.sub,
    subcategoryLabel: r.sub ? subLabel(r.category, r.sub) : null,
    shortDescription: copy.blurb.split('. ')[0] + '.',
    description: `${copy.blurb} The ${base.toLowerCase()} is one of our most considered pieces — chosen for fabric quality first, then finished in shades that work across your wardrobe.`,
    details: copy.details,
    care: copy.care,
    price: r.price,
    compareAtPrice: isSale ? r.compare : null,
    images: r.imgs.map((k) => img(IMG[k], 900)),
    colors: r.colors,
    sizes: r.sizes || [],
    stock: r.stock,
    sku: `NRH-${skuPrefix[r.category]}-${String(1000 + id * 7)}`,
    isNew: r.flags.includes('new'),
    isFeatured: r.flags.includes('featured'),
    isBestSeller: r.flags.includes('best'),
    isSale,
    rating: r.rating,
    reviewCount: r.reviews,
    tags: r.tags,
  }
})

export const getProductBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug)

export function getCollectionProducts(slug) {
  switch (slug) {
    case 'sale': return PRODUCTS.filter((p) => p.isSale)
    case 'new-arrivals': return PRODUCTS.filter((p) => p.isNew)
    case 'best-sellers': return PRODUCTS.filter((p) => p.isBestSeller)
    case 'all': return PRODUCTS
    default: return PRODUCTS.filter((p) => p.category === slug)
  }
}

export function getRelated(product, n = 4) {
  const same = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category)
  const sameSub = same.filter((p) => p.subcategory && p.subcategory === product.subcategory)
  const rest = same.filter((p) => !sameSub.includes(p))
  const pool = [...sameSub, ...rest]
  if (pool.length < n) pool.push(...PRODUCTS.filter((p) => p.isBestSeller && p.id !== product.id && !pool.includes(p)))
  return pool.slice(0, n)
}
