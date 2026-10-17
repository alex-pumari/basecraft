import { describe, expect, test } from "vitest";
import { string } from "./string.core.js";

describe("string-contains-validations", () => {
  test("should accept when the string contains the substring", () => {
    const validator = string().contains("example").isValid;

    const validValues = [
      "rexample",
      "rexamples",
      "two examples",
      "two example houses",
      "example",
      "examples",
      "value-example",
      "example-value",
      "value-example-value",
    ];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });

  test("should reject when the string does not contain the substring", () => {
    const validator = string().contains("example").isValid;

    const invalidValues = ["", "value", "EXAMPLE", "exampl", "ex ample"];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });

  test("should accept when the substring is empty", () => {
    const validator = string().contains("").isValid;

    const validValues = ["", " ", "value", "example"];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });
});
