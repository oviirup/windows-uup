import { describe, expect, it } from 'vitest'
import uuid from '@/lib/uuid'

describe('uuid', () => {
  it('should return a string', () => {
    const result = uuid()
    expect(typeof result).toBe('string')
  })

  it('should match UUID v4 format', () => {
    const result = uuid()
    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    expect(result).toMatch(regex)
  })

  it('should generate unique UUIDs', () => {
    const results = new Set<string>()
    for (let i = 0; i < 1000; i++) {
      results.add(uuid())
    }
    expect(results.size).toBe(1000)
  })
})
