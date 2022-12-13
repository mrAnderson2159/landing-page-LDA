export function isIterable(object) {
  return object !== null && typeof object[Symbol.iterator] === "function";
}
