import { describe, expect, it } from 'vitest'
import nanoid from '@/lib/nanoid'

describe('nanoid', () => {
  it('generates a string of default length (21)', () => {
    const id = nanoid()
    expect(typeof id).toBe('string')
    expect(id.length).toBe(21)
  })

  it('generates unique IDs', () => {
    const ids = new Set<string>()
    for (let i = 0; i < 10000; i++) {
      ids.add(nanoid())
    }
    expect(ids.size).toBe(10000)
  })

  it('respects custom length', () => {
    const lengths = [1, 10, 50, 100, 256]
    for (const len of lengths) {
      const id = nanoid(len)
      expect(id.length).toBe(len)
    }
  })

  it('uses custom alphabet correctly', () => {
    const alphabet = 'abcdefgh12356'
    const id = nanoid(100, alphabet)
    for (const char of id) {
      expect(alphabet.includes(char)).toBe(true)
    }
  })

  it('throws error if alphabet is empty', () => {
    expect(() => nanoid(10, '')).toThrow(
      'Alphabet must contain between 1 and 255 symbols',
    )
  })

  it('throws error if alphabet is too long (>255)', () => {
    const longAlphabet = Array.from({ length: 256 }, (_, i) =>
      String.fromCharCode(i),
    ).join('')
    expect(() => nanoid(10, longAlphabet)).toThrow(
      'Alphabet must contain between 1 and 255 symbols.',
    )
  })

  it('covers all characters in the alphabet over time', () => {
    const alphabet = 'abcde'
    const seen = new Set<string>()
    for (let i = 0; i < 1000; i++) {
      const id = nanoid(10, alphabet)
      for (const char of id) seen.add(char)
    }
    for (const char of alphabet) {
      expect(seen.has(char)).toBe(true)
    }
  })

  it('generates ID with symbols from URL-safe default alphabet', () => {
    const defaultAlphabet =
      '_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-'
    const id = nanoid(50)
    for (const char of id) {
      expect(defaultAlphabet.includes(char)).toBe(true)
    }
  })
})
