const fmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

export const formatPrice = (n) => fmt.format(Math.round(n || 0))

export const discountPercent = (price, compare) =>
  compare && compare > price ? Math.round(((compare - price) / compare) * 100) : 0
