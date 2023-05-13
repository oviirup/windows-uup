import { randomBytes } from 'node:crypto'
import { Buffer } from 'node:buffer'

export function num(str: string | null) {
	return str ? Number(str) : null
}

export function getUUID() {
	const bytes = randomBytes(16)
	bytes[6] = (bytes[6] & 0x0f) | 0x40
	bytes[8] = (bytes[8] & 0x3f) | 0x80
	const hexString = bytes.toString('hex')
	const uuid = hexString.match(/.{8}|.{4}/g)!.join('-')
	return uuid
}

export function toBinary(hex: string): string {
	return Buffer.from(hex, 'hex').toString('binary')
}
export function encodeB64(string: string): string {
	return Buffer.from(string).toString('base64')
}
export function decodeB64(string: string): string {
	return Buffer.from(string, 'base64').toString('utf-8')
}

export function getTime(date?: string | number | Date) {
	date = date ? new Date(date) : new Date()
	const now = Math.floor(date.getTime() / 1000)

	const TimeObject = {
		time: now,
		differ(min: number) {
			if (min > 0) this.time = this.time + min
			else this.time = this.time - min
			console.log(this.time)
			return this
		},
		toGMT() {
			const date = new Date(this.time * 1000)
			return date.toISOString()
		},
	}
	return Object.assign(now, TimeObject)
}

export function isUUID(updateId: string): boolean {
	const regex = /^[\da-fA-F]{8}-([\da-fA-F]{4}-){3}[\da-fA-F]{12}(_rev\.\d+)?$/
	return regex.test(updateId)
}
