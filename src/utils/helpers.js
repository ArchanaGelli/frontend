export function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function calculateDiscount(mrp, price) {
  return Math.round(((mrp - price) / mrp) * 100);
}

export function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function truncate(str, maxLen = 60) {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen).trim() + '...';
}
