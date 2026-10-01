// Inline brand icons — Lucide no longer ships brand marks.
const base = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

export const InstagramIcon = (p) => (
  <svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></svg>
)
export const FacebookIcon = (p) => (
  <svg {...base} {...p}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5Z" /></svg>
)
export const PinterestIcon = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M10.5 20.5 12 14m0 0c.4 1 1.3 1.5 2.3 1.5 2.2 0 3.7-2 3.7-4.6C18 8.2 15.6 6 12.4 6 8.8 6 7 8.5 7 10.7c0 1.3.5 2.4 1.5 2.8M12 14l1.2-5" /></svg>
)
export const WhatsAppIcon = (p) => (
  <svg {...base} {...p}><path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3.2 3.1Z" /><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 1c-1-.4-2.6-2-3-3l1-1-1-2Z" /></svg>
)
