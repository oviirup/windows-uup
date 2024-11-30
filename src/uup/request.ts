export function uupPostRequest(url: string, body: string) {
  const headers = {
    'User-Agent': 'Windows-Update-Agent/10.0.10011.16384 Client-Protocol/2.50',
    'Content-Type': 'application/soap+xml; charset=utf-8',
  };
  return fetch(url, { method: 'POST', body, headers, redirect: 'follow' });
}
