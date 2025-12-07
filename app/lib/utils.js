/**
 * Utility functions
 */

/**
 * Format price with currency
 */
export function formatPrice(amount, currencyCode = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount));
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(comparePrice, currentPrice) {
  if (!comparePrice || comparePrice <= currentPrice) {
    return 0;
  }
  return Math.round(((comparePrice - currentPrice) / comparePrice) * 100);
}

/**
 * Format date
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

/**
 * Truncate text
 */
export function truncate(text, length = 100) {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Get unique values from array
 */
export function getUniqueValues(array, key) {
  return [...new Set(array.map((item) => item[key]).filter(Boolean))];
}

