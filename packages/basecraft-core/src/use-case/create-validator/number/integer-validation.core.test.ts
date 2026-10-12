import { describe, expect, test } from "vitest";
import { createValidator } from "../../create-validator.core.js";
import { number } from "../../../schema/number.core.js";

describe("integer-validation", () => {
  const validator = createValidator({
    field: number().integer(),
  }).isValid;

  test("should accept integer values", () => {
    const validValues = [0, 1, -1, 42, -42, Number.MAX_SAFE_INTEGER];

    validValues.forEach((value) => {
      expect(validator({ field: value })).toBe(true);
    });
  });

  test("should reject non-integer values", () => {
    const invalidValues = [1.5, -1.5, 0.1, -0.1, NaN, Infinity, -Infinity];

    invalidValues.forEach((value) => {
      expect(validator({ field: value })).toBe(false);
    });
  });
});