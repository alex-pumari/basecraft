import { describe, expect, test } from "vitest";
import { createValidator } from "../../create-validator.core.js";
import { number } from "../../../schema/number.core.js";

describe("decimal-validation", () => {
  const validator = createValidator({
    field: number().decimal(),
  }).isValid;

  test("should accept decimal values", () => {
    const validValues = [1.5, -1.5, 0.1, -0.1, 3.14, -3.14];

    validValues.forEach((value) => {
      expect(validator({ field: value })).toBe(true);
    });
  });

  test("should reject non-decimal values", () => {
    const invalidValues = [0, 1, -1, 42, -42, NaN, Infinity, -Infinity];

    invalidValues.forEach((value) => {
      expect(validator({ field: value })).toBe(false);
    });
  });
});