import type { UrlObject } from 'url'

/** creates a formatted className from given arguments */
export function cn(...args: any[]): string {
	if (!args.length) throw new Error('No argument is used')
	let names: string[] = []
	args.forEach((arg) => {
		if (!arg) return
		const argType = arg?.constructor
		if (argType === String || argType === Number) {
			names.push(arg.toString())
		} else if (argType === Array) {
			let inner = cn.apply(null, arg)
			if (inner) names.push(inner)
		} else if (argType === Object) {
			let hasClassName = typeof arg.className === 'string'
			let entries = Object.entries(hasClassName ? arg.className : arg)
			entries.map(([key, value]) => value && names.push(key))
		}
		return
	})
	return names.join(' ')
}

/** Detects if string url is external url */
export function isExternal(href: string | UrlObject) {
	if (!href) return false
	href = href.toString()
	return /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(href)
}
