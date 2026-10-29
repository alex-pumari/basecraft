import { describe, expect, test } from "vitest";
import { boolean } from "./boolean.core.js";

describe("optional-boolean-validations", () => {
  const validator = boolean().optional().isValid;

  test("should accept an optional value", () => {
    expect(validator(undefined)).toBe(true);
  });

  test("should accept booleans", () => {
    const validValues = [true, false];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });

  test("should reject values that are not booleans", () => {
    const invalidValues = [null, 0, 1, "true", {}];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });

  test("should not change the original schema when calling optional", () => {
    const schema = boolean();

    expect(schema.isValid(undefined)).toBe(false);
    expect(schema.optional().isValid(undefined)).toBe(true);
    expect(schema.isValid(undefined)).toBe(false);
  });
});
