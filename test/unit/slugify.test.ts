import { describe, expect, it } from 'vitest'
import slugify from '@/lib/slugify'

describe('slugify', () => {
  it('should return a slug string', () => {
    expect(slugify('Hello World')).toBe('hello-world')
    expect(slugify('React is Awesome')).toBe('react-is-awesome')
    expect(slugify('  leading and trailing spaces  ')).toBe(
      'leading-and-trailing-spaces',
    )
    expect(slugify('Multiple   spaces')).toBe('multiple-spaces')
    expect(slugify('Special chars*&^%$')).toBe('special-chars')
    expect(slugify('CamelCaseString')).toBe('camel-case-string')
    expect(slugify('Accented characters àéîôü')).toBe(
      'accented-characters-àéîôü',
    )
  })

  it('should handle strings with special characters', () => {
    expect(slugify('foo@bar.com')).toBe('foo-bar-com')
    expect(slugify('foo@bar.com/hello')).toBe('foo-bar-com-hello')
    expect(slugify('foo@bar.com#section')).toBe('foo-bar-com-section')
    expect(slugify('hello:world')).toBe('hello-world')
    expect(slugify('hello;world')).toBe('hello-world')
    expect(slugify('hello,world')).toBe('hello-world')
    expect(slugify('hello.world')).toBe('hello-world')
    expect(slugify('hello/world')).toBe('hello-world')
  })

  it('should handle strings with multiple dashes', () => {
    expect(slugify('a--b')).toBe('a-b')
    expect(slugify('a---b')).toBe('a-b')
    expect(slugify('a----b')).toBe('a-b')
  })

  it('should handle strings with leading and trailing dashes', () => {
    expect(slugify('-hello-')).toBe('hello')
    expect(slugify('--hello--')).toBe('hello')
    expect(slugify('---hello---')).toBe('hello')
  })

  it('should handle strings with no changes needed', () => {
    expect(slugify('hello-world')).toBe('hello-world')
    expect(slugify('simple-slug')).toBe('simple-slug')
  })
})
