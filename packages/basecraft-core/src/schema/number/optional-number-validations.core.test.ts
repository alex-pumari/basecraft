import { describe, expect, test } from "vitest";
import { number } from "./number.core.js";

describe("optional-number-validations", () => {
  const validator = number().optional().isValid;

  test("should accept an optional value", () => {
    expect(validator(undefined)).toBe(true);
  });

  test("should accept numbers", () => {
    const validValues = [0, 1, -1, 1.5, 42];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });

  test("should reject values that are not finite numbers", () => {
    const invalidValues = [null, "1", true, NaN, Infinity, {}];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });

  test("should not change the original schema when calling optional", () => {
    const schema = number();

    expect(schema.isValid(undefined)).toBe(false);
    expect(schema.optional().isValid(undefined)).toBe(true);
    expect(schema.isValid(undefined)).toBe(false);
  });
});
