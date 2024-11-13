import { describe, expect, it } from 'vitest';
import { slugify, sortByDate } from './helpers';

describe('slugify', () => {
  it('should return a slug string', () => {
    expect(slugify('Hello World')).toBe('hello-world');
    expect(slugify('React is Awesome')).toBe('react-is-awesome');
    expect(slugify('  leading and trailing spaces  ')).toBe('leading-and-trailing-spaces');
    expect(slugify('Multiple   spaces')).toBe('multiple-spaces');
    expect(slugify('Special chars*&^%$')).toBe('special-chars');
    expect(slugify('CamelCaseString')).toBe('camel-case-string');
    expect(slugify('Accented characters àéîôü')).toBe('accented-characters-àéîôü');
  });

  it('should handle strings with special characters', () => {
    expect(slugify('foo@bar.com')).toBe('foo-bar-com');
    expect(slugify('foo@bar.com/hello')).toBe('foo-bar-com-hello');
    expect(slugify('foo@bar.com#section')).toBe('foo-bar-com-section');
    expect(slugify('hello:world')).toBe('hello-world');
    expect(slugify('hello;world')).toBe('hello-world');
    expect(slugify('hello,world')).toBe('hello-world');
    expect(slugify('hello.world')).toBe('hello-world');
    expect(slugify('hello/world')).toBe('hello-world');
  });

  it('should handle strings with multiple dashes', () => {
    expect(slugify('a--b')).toBe('a-b');
    expect(slugify('a---b')).toBe('a-b');
    expect(slugify('a----b')).toBe('a-b');
  });

  it('should handle strings with leading and trailing dashes', () => {
    expect(slugify('-hello-')).toBe('hello');
    expect(slugify('--hello--')).toBe('hello');
    expect(slugify('---hello---')).toBe('hello');
  });

  it('should handle strings with no changes needed', () => {
    expect(slugify('hello-world')).toBe('hello-world');
    expect(slugify('simple-slug')).toBe('simple-slug');
  });
});

describe('sortByDate', () => {
  it('should return a positive number when the first date is later than the second', () => {
    const result = sortByDate('2023-08-08T10:00:00Z', '2023-08-07T10:00:00Z');
    expect(result).toBeGreaterThan(0);
  });
  it('should return a negative number when the first date is earlier than the second', () => {
    const result = sortByDate('2023-08-07T10:00:00Z', '2023-08-08T10:00:00Z');
    expect(result).toBeLessThan(0);
  });
  it('should return 0 when both dates are the same', () => {
    const result = sortByDate('2023-08-08T10:00:00Z', '2023-08-08T10:00:00Z');
    expect(result).toBe(0);
  });
  it('should handle different date formats correctly', () => {
    const result = sortByDate('2023-08-08', '2023-08-07T23:59:59Z');
    expect(result).toBeGreaterThan(0);
  });
  it('should handle date and time without timezone correctly', () => {
    const result = sortByDate('2023-08-08T10:00:00', '2023-08-07T10:00:00');
    expect(result).toBeGreaterThan(0);
  });
  it('should handle invalid date strings by returning NaN', () => {
    const result = sortByDate('invalid-date', '2023-08-08T10:00:00Z');
    expect(result).toBeNaN();
  });
  it('should return NaN when both dates are invalid', () => {
    const result = sortByDate('invalid-date', 'invalid-date');
    expect(result).toBeNaN();
  });
});
