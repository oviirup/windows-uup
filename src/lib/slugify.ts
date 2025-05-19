/**
 * Convert a string to a dash-separated string
 *
 * @example
 *   slugify('Google This') // 'google-this'
 *
 * @link https://github.com/jonschlinkert/dashify
 */
function slugify(string: string) {
  if (typeof string !== 'string') {
    throw new TypeError('expected a string')
  }
  return string
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\W/g, (m) => (/[À-ž]/.test(m) ? m : '-'))
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .toLowerCase()
}

export { slugify }
export default slugify
