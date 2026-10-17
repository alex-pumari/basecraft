import { describe, expect, test } from "vitest";
import { number } from "./number.core.js";

describe("decimal-validations", () => {
  const validator = number().decimal().isValid;

  test("should accept decimal values", () => {
    const validValues = [1.5, -1.5, 0.1, -0.1, 3.14, -3.14];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });

  test("should reject non-decimal values", () => {
    const invalidValues = [0, 1, -1, 42, -42, NaN, Infinity, -Infinity];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });
});