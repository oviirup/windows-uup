import { NextRequest, NextResponse } from 'next/server'
import { getCookie } from './functions'

export async function GET(req: NextRequest) {
	// get cookies from microsoft
	const cookie = await getCookie()
	return NextResponse.json(cookie)
}
