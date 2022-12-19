import { unitValidator } from "./css";

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
