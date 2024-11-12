import { SITE_URL } from '@/const';

/**
 * Returns the canonical url to given path and params
 *
 * @param path - URL path
 * @returns Canonical url relative to the site root
 */
export function canonicalURL(path: string) {
  const url = new URL(SITE_URL);
  url.pathname = path.endsWith('/') ? path : `${path}/`;
  return url.toString();
}

/**
 * Convert a string to a dash-separated string
 *
 * @example
 *   slugify('Google This'); // 'google-this'
 *
 * @link https://github.com/jonschlinkert/dashify
 */
export function slugify(string: string) {
  if (typeof string !== 'string') {
    throw new TypeError('expected a string');
  }
  return string
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\W/g, (m) => (/[À-ž]/.test(m) ? m : '-'))
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .toLowerCase();
}

/**
 * Sort entries by date
 *
 * @param dateA - Left date-time string
 * @param dateB - Right date-time string
 */
export function sortByDate(dateA: string, dateB: string) {
  return new Date(dateA).getTime() - new Date(dateB).getTime();
}
