import { unitValidator, arrayValidator } from "./validators";

export const requiredString = {
  type: String,
  required: true,
};

export const notRequiredString = {
  type: String,
  required: false,
};

export const requiredNumber = {
  type: Number,
  required: true,
};

export const notRequiredNumber = {
  type: Number,
  required: false,
};

export const requiredCssUnit = {
  ...requiredString,
  validator: unitValidator,
};

export const notRequiredCssUnit = {
  ...notRequiredString,
  validator: unitValidator,
};

export function requiredArray(type) {
  return {
    type: Array,
    required: true,
    validator: arrayValidator(type),
  };
}

export function notRequiredArray(type) {
  return {
    ...requiredArray(type),
    required: false,
  };
}

export const requiredArrayOfStrings = requiredArray("string");

export const notRequiredArrayOfStrings = notRequiredArray("string");
