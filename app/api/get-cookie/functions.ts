import { encodeB64, getTime, getUUID, toBinary } from '@/library/utils'
import axios from 'axios'
import { randomBytes } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import * as https from 'node:https'

export const CACHE_FILE = '.cache/cookies.json'

export type CookieData = {
	device: string
	expires?: string | undefined
	cookie?: string | undefined
}

export async function getCookie() {
	try {
		let cacheFile = await readFile(CACHE_FILE, 'utf-8')
		let cacheData: CookieData = JSON.parse(cacheFile)
		// catch error
		if (!cacheData?.expires || !cacheData.cookie) throw Error()
		let expirationDate = new Date(cacheData.expires).getTime()
		if (new Date().getTime() >= expirationDate) throw Error()
		// return the cached data
		return { data: cacheData, status: 200, statusText: 'OK' }
	} catch {}
	// create a new request
	const device = uupDevice()
	const requestBody = composeBody(device)
	// send request to microsoft server
	const res = await axios({
		method: 'POST',
		url: 'https://fe3.delivery.mp.microsoft.com/ClientWebService/client.asmx',
		// prettier-ignore
		headers: {
			'User-Agent': 'Windows-Update-Agent/10.0.10011.16384 Client-Protocol/2.50',
			'Content-Type': 'application/soap+xml; charset=utf-8',
			'Accept': 'application/soap+xml',
			'Accept-Encoding': 'gzip, deflate, br',
			'Connection':'keep-alive',
			'Cache-Control': '*'
		},
		data: requestBody,
		httpAgent: new https.Agent({ rejectUnauthorized: false }),
	})

	const cookieData = parseCookie(res.data)
	return {
		data: { ...cookieData, device },
		status: res.status,
		statusText: res.statusText,
	}
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
	value += randomString(1054)
	value += 'b401'
	//encode the value
	value = encodeB64(toBinary(value))
	// convert to parameter
	let data = `t=${value}&p=`.replace(/([\S|=])/g, '$1\0')
	return encodeB64(data)
}

/** Creates the request body to fetch cookies */
export function composeBody(device: string) {
	const uuid = getUUID()

	const created = getTime().toGMT()
	const expires = getTime().differ(+120).toGMT()

	const message = `
	<s:Envelope xmlns:a="http://www.w3.org/2005/08/addressing" xmlns:s="http://www.w3.org/2003/05/soap-envelope">
		<s:Header>
			<a:Action s:mustUnderstand="1">http://www.microsoft.com/SoftwareDistribution/Server/ClientWebService/GetCookie</a:Action>
			<a:MessageID>urn:uuid:${uuid}</a:MessageID>
			<a:To s:mustUnderstand="1">https://fe3.delivery.mp.microsoft.com/ClientWebService/client.asmx</a:To>
			<o:Security s:mustUnderstand="1" xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
				<Timestamp xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
					<Created>${created}</Created>
					<Expires>${expires}</Expires>
				</Timestamp>
					<wuws:WindowsUpdateTicketsToken wsu:id="ClientMSA" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" xmlns:wuws="http://schemas.microsoft.com/msus/2014/10/WindowsUpdateAuthorization">
						<TicketType Name="MSA" Version="1.0" Policy="MBI_SSL">
							<Device>${device}</Device>
						</TicketType>
					</wuws:WindowsUpdateTicketsToken>
			</o:Security>
		</s:Header>
		<s:Body>
			<GetCookie xmlns="http://www.microsoft.com/SoftwareDistribution/Server/ClientWebService">
				<oldCookie><Expiration>${created}</Expiration></oldCookie>
				<lastChange>${created}</lastChange>
				<currentTime>${created}</currentTime>
				<protocolVersion>2.0</protocolVersion>
			</GetCookie>
		</s:Body>
	</s:Envelope>`

	return message.replace(/\t|\n/g, '')
}

/** parse the xml response to get cookie */
export function parseCookie(data: string) {
	if (!data) return null
	const wrapperRegex = /\<(GetCookieResult|NewCookie)\>(.*)?\<\/\1\>/
	const matched = data.match(wrapperRegex)?.[2]
	if (matched) {
		const expires = matched.match(/\<(Expiration)\>([^<]*)\<\/\1\>/)![2]
		const cookie = matched.match(/\<(EncryptedData)\>([^<]*)\<\/\1\>/)![2]
		return { expires, cookie }
	}
	return null
}
