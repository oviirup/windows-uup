import axios, { AxiosRequestConfig } from 'axios'

export { CookieRequest } from './_Cookies'

export default async function sendRequest<Response = any>(
	url: string,
	payload: string,
) {
	const headers = {
		'User-Agent': 'Windows-Update-Agent/10.0.10011.16384 Client-Protocol/2.50',
		'Content-Type': 'application/soap+xml; charset=utf-8',
		'Accept': 'application/soap+xml',
	}

	const axiosConfig: AxiosRequestConfig = {
		method: 'POST',
		url,
		data: payload,
		headers,
	}

	// send request with tls disabled
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
	const response = await axios<Response>(axiosConfig)
		.then((res) => res.data)
		.catch((error) => ({ data: null, error }))
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1'

	return response
}
