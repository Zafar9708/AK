# AK Fashion — Modest Fashion Store (Client Demo)

Frontend-only ecommerce demo built with React 18, Vite 5, Tailwind CSS 3, React Router 6, Lucide React and the Context API. All catalog, account and order data is local; cart, wishlist, recently viewed and demo login persist in localStorage.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build
```

For hosting (Netlify/Vercel), add an SPA fallback so deep links like /products/... resolve to index.html.

## Demo access

- Login: demo@example.com / Demo@123
- Coupon: WELCOME10 (10% off)
- Checkout is a demo: no payment details are collected, stored or sent.

## Where to edit content

| What | File |
|---|---|
| Brand name, contact, socials, demo user | src/data/site.js |
| Logo | src/components/common/Logo.jsx, public/favicon.svg |
| All images (Unsplash IDs, hot-linked) | src/data/images.js |
| Products (55) | src/data/products.js |
| Categories & menu | src/data/categories.js |
| Demo reviews & demo orders | src/data/reviews.js |
| Policy text | src/data/policies.js |
| Colors & fonts | tailwind.config.js, index.html |
