// CTR - Counter AES encryption
import * as aes from 'aes-js';

const key = [
  3,
  1,
  1,
  8,
  1,
  7,
  6,
  3,
  3,
  4,
  9,
  6,
  8,
  6,
  7,
  3,
  7,
  7,
  6,
  7,
  0,
  2,
  2,
  5,
  6,
  7,
  0,
  5,
  8,
  5,
  0,
  1
];

function aesCtr() {
  return new aes.ModeOfOperation.ctr(key, new aes.Counter(7));
}

export function encrypt(value) {
  const encryptedBytes = aesCtr().encrypt(aes.utils.utf8.toBytes(value));
  return aes.utils.hex.fromBytes(encryptedBytes);
}

export function decrypt(hexValue) {
  const decryptedBytes = aesCtr().decrypt(aes.utils.hex.toBytes(hexValue));
  return aes.utils.utf8.fromBytes(decryptedBytes);
}
