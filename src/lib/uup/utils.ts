import { randomBytes } from 'crypto';

/** Generate random uuid */
export function generateUUID() {
  let d = Date.now();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return c === 'x' ? r.toString(16) : ((r & 0x3) | 0x8).toString(16);
  });
}

/** Generates a device-specific encoded string based on random and fixed values. */
export function uupDevice() {
  const start = `13003002c377040014d5bcac7a66de0d50beddf9bba16c87edb9e019898000`;
  const rand = randomBytes(1054 / 2).toString('hex');
  const end = `b401`;

  const valueHex = hexToBinary(start + rand + end);
  const value = Buffer.from(valueHex, 'binary').toString('base64');
  const data = `t=${value}&p=`;

  const segments = `${data.split('').join('\0')}\0`;
  return Buffer.from(segments).toString('base64');
}

/**
 * Converts a hexadecimal string to its binary representation.
 *
 * @param hex - The hexadecimal string to convert.
 */
export function hexToBinary(hex: string) {
  // Validate the hex string
  if (hex.trim() === '') {
    return '';
  } else if (!/^[a-fA-F0-9]+$/.test(hex) || hex.length % 2 !== 0) {
    throw new Error('Provided hex string is invalid');
  }
  // Convert hex to binary
  let bytes = [];
  for (var i = 0; i < hex.length - 1; i += 2) {
    const char = hex.slice(i, i + 2);
    bytes.push(parseInt(char, 16));
  }
  return String.fromCharCode(...bytes);
}
