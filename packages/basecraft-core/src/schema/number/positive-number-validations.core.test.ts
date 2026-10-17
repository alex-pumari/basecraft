import { describe, expect, test } from "vitest";
import { number } from "./number.core.js";

describe("positive-number-validations", () => {
  const validator = number().positive().isValid;

  test("should accept positive values", () => {
    const validValues = [1, 0.1, 42, 3.14, Number.MIN_VALUE];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });

  test("should reject non-positive values", () => {
    const invalidValues = [0, -0, -1, -0.1, NaN, Infinity, -Infinity];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });
});