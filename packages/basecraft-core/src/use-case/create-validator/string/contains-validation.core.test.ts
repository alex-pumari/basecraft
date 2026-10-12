import { describe, expect, test } from "vitest";
import { createValidator } from "../../create-validator.core.js";
import { string } from "../../../schema/string.core.js";

describe("contains-validation", () => {
  test("should accept when the string contains the substring", () => {
    const validator = createValidator({
      field: string().contains("example"),
    }).isValid;

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
      expect(validator({ field: value })).toBe(true);
    });
  });

  test("should reject when the string does not contain the substring", () => {
    const validator = createValidator({
      field: string().contains("example"),
    }).isValid;

    const invalidValues = [
      "",
      "value",
      "EXAMPLE",
      "exampl",
      "ex ample",
    ];

    invalidValues.forEach((value) => {
      expect(validator({ field: value })).toBe(false);
    });
  });

  test("should accept when the substring is empty", () => {
    const validator = createValidator({
      field: string().contains(""),
    }).isValid;

    const validValues = ["", " ", "value", "example"];

    validValues.forEach((value) => {
      expect(validator({ field: value })).toBe(true);
    });
  });
});