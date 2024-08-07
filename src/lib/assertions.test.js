import { describe, expect, it } from 'vitest';
import {
  isArray,
  isEmpty,
  isEmptyArray,
  isEmptyObject,
  isFunction,
  isObject,
} from './assertions';

// Adjust the path as needed

describe('assertions', () => {
  describe('isArray', () => {
    it('should return true for arrays', () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
    });

    it('should return false for non-arrays', () => {
      expect(isArray({})).toBe(false);
      expect(isArray('string')).toBe(false);
      expect(isArray(123)).toBe(false);
      expect(isArray(null)).toBe(false);
      expect(isArray(undefined)).toBe(false);
    });
  });

  describe('isEmptyArray', () => {
    it('should return true for empty arrays', () => {
      expect(isEmptyArray([])).toBe(true);
    });

    it('should return false for non-empty arrays', () => {
      expect(isEmptyArray([1])).toBe(false);
      expect(isEmptyArray([1, 2])).toBe(false);
    });

    it('should return false for non-array values', () => {
      expect(isEmptyArray({})).toBe(false);
      expect(isEmptyArray('string')).toBe(false);
      expect(isEmptyArray(123)).toBe(false);
      expect(isEmptyArray(null)).toBe(false);
      expect(isEmptyArray(undefined)).toBe(false);
    });
  });

  describe('isObject', () => {
    it('should return true for objects (excluding arrays)', () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ key: 'value' })).toBe(true);
      expect(isObject(new Date())).toBe(true);
    });

    it('should return false for arrays', () => {
      expect(isObject([])).toBe(false);
    });

    it('should return false for non-object values', () => {
      expect(isObject('string')).toBe(false);
      expect(isObject(123)).toBe(false);
      expect(isObject(null)).toBe(false);
      expect(isObject(undefined)).toBe(false);
      expect(isObject(() => {})).toBe(false); // Functions are excluded
    });
  });

  describe('isEmptyObject', () => {
    it('should return true for empty objects', () => {
      expect(isEmptyObject({})).toBe(true);
    });

    it('should return false for non-empty objects', () => {
      expect(isEmptyObject({ key: 'value' })).toBe(false);
    });

    it('should return false for non-object values', () => {
      expect(isEmptyObject([])).toBe(false);
      expect(isEmptyObject('string')).toBe(false);
      expect(isEmptyObject(123)).toBe(false);
      expect(isEmptyObject(null)).toBe(false);
      expect(isEmptyObject(undefined)).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('should return true for empty values', () => {
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
      expect(isEmpty('')).toBe(true);
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
    });

    it('should return false for non-empty values', () => {
      expect(isEmpty([1])).toBe(false);
      expect(isEmpty({ key: 'value' })).toBe(false);
      expect(isEmpty('string')).toBe(false);
    });

    it('should return false for non-array and non-object values', () => {
      expect(isEmpty(123)).toBe(false);
      expect(isEmpty(true)).toBe(false);
    });
  });

  describe('isFunction', () => {
    it('should return true for functions', () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(function () {})).toBe(true);
    });

    it('should return false for non-function values', () => {
      expect(isFunction([])).toBe(false);
      expect(isFunction({})).toBe(false);
      expect(isFunction('string')).toBe(false);
      expect(isFunction(123)).toBe(false);
      expect(isFunction(null)).toBe(false);
      expect(isFunction(undefined)).toBe(false);
    });
  });
});
