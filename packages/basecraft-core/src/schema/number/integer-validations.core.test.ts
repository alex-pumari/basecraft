import { describe, expect, test } from "vitest";
import { number } from "./number.core.js";

describe("integer-validations", () => {
  const validator = number().integer().isValid;

  test("should accept integer values", () => {
    const validValues = [0, 1, -1, 42, -42, Number.MAX_SAFE_INTEGER];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });

  test("should reject non-integer values", () => {
    const invalidValues = [1.5, -1.5, 0.1, -0.1, NaN, Infinity, -Infinity];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });
});