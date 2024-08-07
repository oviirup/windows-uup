/**
 * Checks if the given value is an array
 *
 * @template Type
 * @param {any} value
 * @returns {value is (Type)[]}
 */
export function isArray(value) {
  return Array.isArray(value);
}

/**
 * Checks if the given value is an empty array
 *
 * @param {any} value
 */
export function isEmptyArray(value) {
  return isArray(value) && value.length === 0;
}

/**
 * Checks if a value is an object (excluding arrays)
 *
 * @param {any} value
 * @returns {value is Record<string, any>}
 */
export function isObject(value) {
  return value !== null && typeof value === 'object' && !isArray(value);
}

/**
 * Checks if a given value is an empty object
 *
 * @param {any} value
 * @returns {boolean}
 */
export function isEmptyObject(value) {
  return isObject(value) && Object.keys(value).length === 0;
}

/**
 * The function checks if a value (object/array) is empty
 *
 * @param {any} value
 * @returns {boolean}
 */
export function isEmpty(value) {
  if (isArray(value)) return isEmptyArray(value);
  if (typeof value === 'object' && value !== null) return isEmptyObject(value);
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  return false;
}

/**
 * Check if the given object is a function
 *
 * @param {any} value
 * @returns {value is Function}
 */
export function isFunction(value) {
  return typeof value === 'function';
}
