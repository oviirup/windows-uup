import { randomBytes } from 'node:crypto'

const ALPHABETS =
  '_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-'

/**
 * Generate a secure nanoid string using Node.js crypto module.
 *
 * @param length - Length of the ID (default: 21)
 * @param alphabet - Custom alphabet (default: URL-safe characters)
 * @returns A cryptographically secure unique ID string
 */
function nanoid(length = 21, alphabet = ALPHABETS): string {
  const alphabetLength = alphabet.length

  if (alphabetLength === 0 || alphabetLength > 255) {
    throw new Error('Alphabet must contain between 1 and 255 symbols.')
  }

  const mask = (2 << Math.floor(Math.log2(alphabetLength - 1))) - 1
  const step = Math.ceil((1.6 * mask * length) / alphabetLength)

  let id = ''

  while (id.length < length) {
    const bytes = randomBytes(step)
    for (let i = 0; i < step && id.length < length; i++) {
      const index = bytes[i] & mask
      if (index < alphabetLength) {
        id += alphabet[index]
      }
    }
  }

  return id
}

export { nanoid }
export default nanoid
