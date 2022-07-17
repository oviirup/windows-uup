/** checks if the site is running in development mode */
export const isDev = process.env.NODE_ENV === 'development'
/** gets the site url from environment variables */
export const siteURL = isDev ? 'http://localhost:3000/' : process.env.NEXT_PUBLIC_VERCEL_URL
/** author url */
export const authorURL = 'https://avirup-dev.vercel.app'

/**
 * is-external
 * @description check if any string or URL is external link
 * @example isExtrnal('/page') ==> false
 */
export function isExternal(href: string | URL): boolean {
	if (!href) return false
	href = href.toString()
	return /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(href)
}

/**
 * perma-url
 * @description defines the perma url from a url or url segment
 * @example permaURL('/posts') ==> https://site-url.any/posts
 */
export function permaURL(href: string | URL = '', tailing = false): string {
	if (isExternal(href)) return href.toString()
	href = href.toString().replace(/^\//, '')
	return (siteURL + href).replace(/\/?$/, tailing ? '/' : '')
}

export { classes } from './classes'
export { dashify } from './dashify'
export { pick } from './pick'
