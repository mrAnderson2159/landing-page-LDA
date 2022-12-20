export function isIterable(object) {
  return object !== null && typeof object[Symbol.iterator] === "function";
}

export function isOdd(number) {
  if (!Number.isInteger(number)) throw TypeError(`${number} is not an integer`);
  return Boolean(number % 2);
}

export function isEven(number) {
  return !isOdd(number);
}
