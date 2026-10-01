// All imagery lives here so it can be swapped for the client's own photography in one place.
// Current images are free-to-use photos from Unsplash (unsplash.com/license), hot-linked from their CDN.
// Replace each value with a local import (e.g. import hero1 from '../assets/hero-1.jpg') before launch.

export const img = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`

export const IMG = {
  // Hijab / model photography
  H1: '1585728748176-455ac5eed962',
  H2: '1552874869-5c39ec9288dc',
  H3: '1708151729245-fa18bd75727e',
  H4: '1708151729075-89f1fc21e19e',
  H5: '1574297500578-afae55026ff3',
  H6: '1640154852340-9de73a0643a8',
  H7: '1613611927458-3ddd4b0afdb9',
  H8: '1613447895817-e617a4093f50',
  H9: '1652473291442-7a2e034a00d1',
  H10: '1662806407800-56793fa8e924',
  H11: '1651828855150-ba40f6870a53',
  H12: '1684894059566-25ca8b8007bd',
  H13: '1680125437968-80b0c794f0b1',
  H14: '1668028554854-245f8ccae15b',
  // Abaya / clothing
  A1: '1736342182213-6c037467cb38',
  A2: '1728487235101-664d87965931',
  A3: '1736342182642-e2042084f47c',
  A4: '1772474500365-c2c520545f44',
  A5: '1724412665971-114bd351a42d',
  A6: '1760083545495-b297b1690672',
  A7: '1505339805025-a5ec452332d9',
  A8: '1510495631661-903668f58af2',
  A9: '1762605135326-5c4bcc5ef006',
  A10: '1762376128087-bc29c6df08c0',
  A11: '1762605135376-ae5af70a5628',
  A12: '1772474578035-bebcd90b355d',
  A13: '1772474557170-4818d01d7bca',
  A14: '1682195721373-93bf6c181938',
  // Jewellery
  J1: '1633934542430-0905ccb5f050',
  J2: '1599643478518-a784e5dc4c8f',
  J3: '1617038220319-276d3cfab638',
  J4: '1543294001-f7cd5d7fb516',
  J5: '1585960622850-ed33c41d6418',
  J6: '1616837874254-8d5aaa63e273',
  J7: '1722410180687-b05b50922362',
  J8: '1631982690223-8aa4be0a2497',
  J9: '1611652022419-a9419f74343d',
  J10: '1569397288884-4d43d6738fbd',
  J11: '1535632066927-ab7c9ab60908',
  J12: '1602173574767-37ac01994b2a',
  J13: '1605100804763-247f67b3557e',
  J14: '1561828995-aa79a2db86dd',
  J15: '1655255114527-d0a834d9a774',
  // Skincare / personal care
  S1: '1598440947619-2c35fc9aa908',
  S2: '1515377905703-c4788e51af15',
  S3: '1629380108599-ea06489d66f5',
  S4: '1629732097571-b042b35aa3ed',
  S5: '1564594326930-17381130fd2e',
  S6: '1629732047356-30c7e14e712b',
  S7: '1629380107895-bb31e18bdc64',
  S8: '1556228720-210aabb357b7',
  S9: '1608625100285-e95b9f843bce',
}

export const HERO_SLIDES = [
  {
    image: img(IMG.A11, 1800),
    mobileImage: img(IMG.A11, 900),
    title: 'The Autumn Abaya Edit',
    text: 'Fluid silhouettes in midnight, taupe and sand — cut for movement, made for every occasion.',
    cta: 'Shop abayas',
    to: '/collections/abayas',
    align: 'left',
  },
  {
    image: img(IMG.H13, 1800),
    mobileImage: img(IMG.H13, 900),
    title: 'Hijabs that stay put',
    text: 'Breathable jersey, airy modal and silky georgette in over forty everyday shades.',
    cta: 'Shop hijabs',
    to: '/collections/hijabs',
    align: 'left',
  },
  {
    image: img(IMG.A1, 1800),
    mobileImage: img(IMG.A1, 900),
    title: 'Turkish cord sets',
    text: 'Easy two-piece dressing in ribbed knits and soft linens — newly arrived from Istanbul.',
    cta: 'Shop cord sets',
    to: '/collections/turkish-cord-sets',
    align: 'left',
  },
]

export const EDITORIAL = {
  promo: img(IMG.A9, 1800),
  featured: img(IMG.A6, 1200),
  about1: img(IMG.H12, 1400),
  about2: img(IMG.A3, 1000),
  about3: img(IMG.H9, 1000),
  megaMenu: img(IMG.H1, 600),
  login: img(IMG.A2, 1200),
}

export const SOCIAL_GRID = [IMG.H6, IMG.A4, IMG.H3, IMG.A10, IMG.H8, IMG.A12].map((id) => img(id, 600))
