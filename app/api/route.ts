import { NextResponse } from 'next/server'

export async function GET() {
	return NextResponse.json({
		ok: true,
		version: process.env.npm_package_version,
	})
}
