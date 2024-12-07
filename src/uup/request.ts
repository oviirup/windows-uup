import got from 'got';

export function uupPostRequest(requestURL: string, body: string) {
  return got.post(requestURL, {
    body,
    headers: {
      // user agent to mimic an windows device
      'User-Agent': 'Windows-Update-Agent/10.0.10011.16384 Client-Protocol/2.50',
      'Content-Type': 'application/soap+xml; charset=utf-8',
    },
    https: {
      // disable ssl certificate verification
      rejectUnauthorized: false,
    },
  });
}
