// Adjust the path as needed
import { describe, expect, it, vi } from 'vitest';
import { generateUUID, hexToBinary, uupDevice } from './utils';

describe('generateUUID', () => {
  it('should generate a UUID of correct length', () => {
    const uuid = generateUUID();
    expect(uuid).toHaveLength(36);
  });

  it('should generate a UUID with correct structure', () => {
    const uuid = generateUUID();
    expect(uuid[8]).toBe('-');
    expect(uuid[13]).toBe('-');
    expect(uuid[18]).toBe('-');
    expect(uuid[23]).toBe('-');
  });

  it('should generate a UUID with correct version (4) at position 14', () => {
    const uuid = generateUUID();
    expect(uuid[14]).toBe('4');
  });

  it('should generate a UUID with correct variant (8, 9, a, or b) at position 19', () => {
    const uuid = generateUUID();
    const variant = uuid[19];
    expect(['8', '9', 'a', 'b']).toContain(variant);
  });

  it('should generate valid UUIDs', () => {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    const isValidUUID = (uuid: string) => regex.test(uuid);

    for (let i = 0; i < 1000; i++) {
      const uuid = generateUUID();
      expect(isValidUUID(uuid)).toBe(true);
    }
  });

  it('should generate unique UUIDs', () => {
    const uuidSet = new Set();
    for (let i = 0; i < 1000; i++) {
      const uuid = generateUUID();
      expect(uuidSet.has(uuid)).toBe(false);
      uuidSet.add(uuid);
    }
  });
});

describe('hexToBinary', () => {
  it('should convert a valid hexadecimal string to its binary representation', () => {
    expect(hexToBinary('48656c6c6f')).toBe('Hello');
    expect(hexToBinary('776f726c64')).toBe('world');
  });

  it('should throw an error for an invalid hexadecimal string', () => {
    const errorText = 'Provided hex string is invalid';
    expect(() => hexToBinary('123g')).toThrow(errorText);
    expect(() => hexToBinary('123')).toThrow(errorText);
    expect(() => hexToBinary('invalid')).toThrow(errorText);
  });

  it('should handle an empty string', () => {
    expect(hexToBinary('')).toBe('');
  });

  it('should handle a single byte (2 hex digits) correctly', () => {
    expect(hexToBinary('41')).toBe('A');
    expect(hexToBinary('7a')).toBe('z');
  });
});

describe('uupDevice', () => {
  // Mock the randomBytes function to return a predictable result for testing
  vi.mock('crypto', () => ({
    randomBytes: vi.fn(() => Buffer.from('a'.repeat(1054 / 2), 'hex')),
  }));

  it('should generate a base64 encoded string', () => {
    const result = uupDevice();
    expect(result).toBeTypeOf('string');
    expect(() => Buffer.from(result, 'base64').toString()).not.toThrow();
  });

  it('should have consistent format', () => {
    const result1 = uupDevice();
    const result2 = uupDevice();
    expect(result1).toBe(result2); // Assuming deterministic behavior with mock
  });

  it('should produce a valid base64 string', () => {
    const result = uupDevice();
    expect(() => Buffer.from(result, 'base64').toString()).not.toThrow();
  });

  it('should handle an empty hex string gracefully in hexToBinary', () => {
    expect(hexToBinary('')).toBe('');
  });

  it('should throw an error for an invalid hex string in hexToBinary', () => {
    expect(() => hexToBinary('invalid')).toThrow('Provided hex string is invalid');
  });
});
