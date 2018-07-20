// CTR - Counter AES encryption
import * as aes from 'aes-js';

const key = [
  4, 0, 7, 9, 7, 3, 2, 4,
  4, 1, 0, 7, 2, 4, 9, 4,
  4, 4, 0, 6, 9, 3, 8, 6,
  9, 4, 7, 5, 4, 6, 6, 5
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
