import { describe, expect, test } from "vitest";
import { number } from "./number.core.js";

describe("negative-number-validations", () => {
  const validator = number().negative().isValid;

  test("should accept negative values", () => {
    const validValues = [-1, -0.1, -42, -3.14, -Number.MIN_VALUE, -Number.MAX_VALUE];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });

  test("should reject non-negative values", () => {
    const invalidValues = [0, -0, 1, 0.1, NaN, Infinity, -Infinity];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });
});