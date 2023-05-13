import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'node:fs/promises'
import type { CookieData } from './functions'
import { CACHE_FILE, getCookie } from './functions'

export async function GET(req: NextRequest) {
	// get cookies from microsoft
	const { data, ...res } = await getCookie()
	return NextResponse.json(data, res)
}
