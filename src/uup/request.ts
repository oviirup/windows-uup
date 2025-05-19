import fs from 'fs'
import path from 'path'
import got from 'got'
import { composeCookieRequest } from './composer'
import { API_ENDPOINTS, UUP_STORE_PATH } from './const'
import { CookieData, zCookieData } from './schema'

export function uupPostRequest(requestURL: string, body: string) {
  return got.post(requestURL, {
    body,
    headers: {
      // user agent to mimic an windows device
      'User-Agent':
        'Windows-Update-Agent/10.0.10011.16384 Client-Protocol/2.50',
      'Content-Type': 'application/soap+xml; charset=utf-8',
    },
    https: {
      // disable ssl certificate verification
      rejectUnauthorized: false,
    },
  })
}

export async function getCookie() {
  // read cookie from file
  let cookie: CookieData | null = null
  const cookieCachePath = path.join(UUP_STORE_PATH, 'cookie.json')

  // get cookie from cache if possible
  try {
    if (fs.existsSync(cookieCachePath)) {
      const content = fs.readFileSync(cookieCachePath, 'utf-8')
      cookie = JSON.parse(content)
    }
  } catch {}

  // get new cookie if not cached or time expired
  if (!cookie || Date.now() > new Date(cookie.expires).getTime() - 300_000) {
    const body = composeCookieRequest()
    try {
      const res = await uupPostRequest(API_ENDPOINTS.client, body)
      if (!res.body) throw Error()
      const data = res.body
      // return null if could not match cookie's xml pattern
      if (!data?.match(/<(NewCookie|GetCookieResult)>.*?<\/\1>/)?.[0]) {
        return null
      }

      // parse cookie data
      const parsedCookie = zCookieData.safeParse({
        data: data.match(/<EncryptedData>(.*)<\/EncryptedData>/)?.[1],
        expires: data.match(/<Expiration>(.*)<\/Expiration>/)?.[1],
      })

      if (parsedCookie.success) {
        cookie = parsedCookie.data
        if (!fs.existsSync(UUP_STORE_PATH)) {
          fs.mkdirSync(UUP_STORE_PATH, { recursive: true })
        }
        fs.writeFileSync(cookieCachePath, JSON.stringify(cookie, null, 2))
      }
    } catch {}
  }

  return cookie
}
