import { describe, expect, test } from "vitest";
import { string } from "./string.core.js";

describe("optional-string-validations", () => {
  const validator = string().optional().isValid;

  test("should accept an optional value", () => {
    expect(validator(undefined)).toBe(true);
  });

  test("should accept strings", () => {
    const validValues = ["", "abc", "first-example"];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });

  test("should reject values that are not strings", () => {
    const invalidValues = [null, 1, true, {}];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });

  test("should not change the original schema when calling optional", () => {
    const schema = string();

    expect(schema.isValid(undefined)).toBe(false);
    expect(schema.optional().isValid(undefined)).toBe(true);
    expect(schema.isValid(undefined)).toBe(false);
  });
});
