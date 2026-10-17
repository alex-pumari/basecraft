import { describe, expect, test } from "vitest";
import { string } from "./string.core.js";

describe("string-min-length-validations", () => {
  describe("min length", () => {
    test("should accept when the string length is equal to the minimum", () => {
      const validator = string().minLength(5).isValid;

      expect(validator("abcde")).toBe(true);
    });

    test("should accept when the string length exceeds the minimum", () => {
      const validator = string().minLength(5).isValid;

      expect(validator("abcdef")).toBe(true);
    });

    test("should reject when the string length is below the minimum", () => {
      const validator = string().minLength(5).isValid;

      const invalidValues = ["", "a", "abcd"];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });

    test("should accept when the minimum length is zero", () => {
      const validator = string().minLength(0).isValid;

      const validValues = ["", "a", "value-example"];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });
  });
});
