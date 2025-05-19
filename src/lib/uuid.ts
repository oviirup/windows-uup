/**
 * Generates a cryptographically secure UUID v4 string.
 *
 * This implementation uses the Web Crypto API to ensure cryptographically
 * secure random number generation.
 *
 * @returns A UUID v4 compliant string.
 */
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export { uuid }
export default uuid
