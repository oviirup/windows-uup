import fs from 'node:fs'
import { parse, resolve } from 'node:path'
import { getCookie, CACHE_FILE } from '@/app/api/get-cookie/functions'
import 'dotenv/config'
// store cookies in next cache
;(async () => {
	// parse and sanitise path & filename
	let cachePath = resolve(process.cwd(), parse(CACHE_FILE).dir)
	let cacheFile = resolve(process.cwd(), CACHE_FILE)
	// get cookies from microsoft
	const { data } = await getCookie()
	if (data?.cookie) {
		// create folder if not exists
		if (!fs.existsSync(cachePath)) {
			fs.mkdirSync(cachePath, { recursive: true })
		}
		// write the response to cache
		fs.writeFileSync(cacheFile, JSON.stringify(data, null, 2))
	} else {
		console.error('Unable to detch cookies')
	}
})()
