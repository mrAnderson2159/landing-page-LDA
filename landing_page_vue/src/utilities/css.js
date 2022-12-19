export function unitValidator(value) {
  return /^-?[\d.]+(px|em|vh|%|deg|vw)$/.test(value);
}
