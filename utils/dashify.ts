/**
 * dashify()
 * @description Convert a string to a dash-separated string
 * @example dashify('Google This') ==> 'google-this'
 * @link https://github.com/jonschlinkert/dashify
 */
export function dashify(
	string: string,
	condense: boolean = true
) {
	if (typeof string !== 'string') throw new TypeError('expected a string')
	return string
		.trim()
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/\W/g, (m) => (/[À-ž]/.test(m) ? m : '-'))
		.replace(/^-+|-+$/g, '')
		.replace(/-{2,}/g, (m) => (condense ? '-' : m))
		.toLowerCase()
}
export default dashify
