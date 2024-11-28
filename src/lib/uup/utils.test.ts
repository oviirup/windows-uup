// Adjust the path as needed
import { describe, expect, it, vi } from 'vitest';
import { generateUUID, uupDevice } from './utils';

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

describe('uupDevice', () => {
  // Mock the randomBytes function to return a predictable result for testing
  // TODO: fix error "vi.mock is not a function"
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
});
