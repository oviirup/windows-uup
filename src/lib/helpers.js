import { SITE_URL } from '@/const';

/**
 * Returns the canonical url to given path and params
 *
 * @param {string} path - URL path
 * @returns {string} Canonical url relative to the site root
 */
export function canonicalURL(path) {
  const url = new URL(SITE_URL);
  url.pathname = path;
  return url.toString();
}

/**
 * @param {Date | string} date
 * @param {Intl.DateTimeFormatOptions} opts
 * @returns
 */
export function formatDate(date, opts) {
  const timeZone = 'Asia/Calcutta';
  const fmt = Intl.DateTimeFormat('en-IN', { ...opts, timeZone });
  return fmt.format(new Date(date));
}

/**
 * Convert a string to a dash-separated string
 *
 * @example
 *   slugify('Google This'); // 'google-this'
 *
 * @param {string} string
 * @link https://github.com/jonschlinkert/dashify
 */
export function slugify(string) {
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
 * @param {string} dateA - Left date-time string
 * @param {string} dateB - Right date-time string
 */
export function sortByDate(dateA, dateB) {
  return new Date(dateA).getTime() - new Date(dateB).getTime();
}
