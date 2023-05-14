import { encodeB64, getTime, getUUID, toBinary } from '@/library/utils'
import axios from 'axios'
import { randomBytes } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import sendRequest, { CookieRequest } from '@/library/request'

export const CACHE_FILE = '.cache/cookies.json'

export type CookieData = {
	device: string
	expires: string
	cookie: string
}

export async function getCookie() {
	try {
		// do not check for cache in dev mode
		if (process.env.NODE_ENV === 'development') throw Error()
		let cacheData = await getCache()
		if (cacheData) return cacheData
	} catch {}
	// create a new request
	const device = uupDevice()
	const payload = CookieRequest({ device })
	// send request to microsoft server
	const data = await sendRequest(
		'https://fe3.delivery.mp.microsoft.com/ClientWebService/client.asmx',
		payload,
	)

	return data ? parseCookie(data, device) : null
}

/** check if the cookie is stored in cache file */
export async function getCache() {
	let file = await readFile(CACHE_FILE, 'utf-8')
	let data: CookieData = JSON.parse(file)
	// validate stored cookie
	if (!data?.expires || !data.cookie) return
	let expirationDate = new Date(data.expires).getTime()
	if (new Date().getTime() >= expirationDate) return
	return data
}

/** generates a random hex string */
export function randomString(length: number = 4): string {
	return randomBytes(Math.ceil(length / 2))
		.toString('hex')
		.slice(0, length)
}

/** generates a unique id for the device */
export function uupDevice() {
	let value = ''
	// set the value
	value += '13003002c377040014d5bcac7a66de0d50beddf9bba16c87edb9e019898000'
	value += randomString(32)
	value += 'b401'
	//encode the value
	value = encodeB64(toBinary(value))
	// convert to parameter
	let data = `t=${value}&p=`.replace(/([\S|=])/g, '$1\0')
	return encodeB64(data)
}

/** parse the xml response to get cookie */
export function parseCookie(data: string, device: string) {
	if (!data) return null
	const wrapperRegex = /\<(GetCookieResult|NewCookie)\>(.*)?\<\/\1\>/
	const matched = data.match(wrapperRegex)?.[2]
	if (!matched) return null
	//  extract the cookie data
	const expires = matched.match(/\<(Expiration)\>([^<]*)\<\/\1\>/)?.[2]
	const cookie = matched.match(/\<(EncryptedData)\>([^<]*)\<\/\1\>/)?.[2]
	if (!expires || !cookie) return null
	return { device, expires, cookie }
}
