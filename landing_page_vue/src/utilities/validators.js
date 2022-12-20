export function unitValidator(value) {
  return /^-?[\d.]+(px|em|vh|%|deg|vw)$/.test(value);
}

export function arrayValidator(type) {
  const condition = ((type) => {
    if (typeof type === "string") return (x) => typeof x === type;
    else return (x) => x instanceof type;
  })(type);

  return function (value) {
    return value.every(condition);
  };
}

export function ratioValidator(value) {
  return value >= 0 && value <= 1;
}
