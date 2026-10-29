import { describe, expect, test } from "vitest";
import { array } from "./array.core.js";

describe("optional-array-validations", () => {
  const validator = array().optional().isValid;

  test("should accept an optional value", () => {
    expect(validator(undefined)).toBe(true);
  });

  test("should accept arrays", () => {
    const validValues = [[], [1], ["first-example"], [1, "first-example"]];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });

  test("should reject values that are not arrays", () => {
    const invalidValues = [null, "array", 1, {}];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });

  test("should not change the original schema when calling optional", () => {
    const schema = array();

    expect(schema.isValid(undefined)).toBe(false);
    expect(schema.optional().isValid(undefined)).toBe(true);
    expect(schema.isValid(undefined)).toBe(false);
  });
});
