import { describe, expect, test } from "vitest";
import { string } from "./string.core.js";

describe("string-combined-validations", () => {
  describe("string with min length and max length", () => {
    test("should accept when the string length is within the specified range", () => {
      const validator = string().minLength(3).maxLength(5).isValid;

      const validValues = ["abc", "abcd", "abcde"];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject when the string length is outside the specified range", () => {
      const validator = string().minLength(3).maxLength(5).isValid;

      const invalidValues = ["", "a", "ab", "abcdef"];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("string with min length and max length and contains", () => {
    test("should accept when the string satisfies all constraints", () => {
      const validator = string()
        .contains("abc")
        .minLength(3)
        .maxLength(8).isValid;

      const validValues = ["abc", "abcde", "abc more"];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject when the string violates at least one constraint", () => {
      const validator = string()
        .contains("abc")
        .minLength(3)
        .maxLength(8).isValid;

      const invalidValues = ["", "ab", "value", "abcdefghij"];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("max length and contains", () => {
    test("should accept when the string contains the substring and does not exceed the maximum length", () => {
      const validator = string().contains("abc").maxLength(5).isValid;

      const validValues = ["abc", "abcd", "abcde"];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject when the string does not contain the substring or exceeds the maximum length", () => {
      const validator = string().contains("abc").maxLength(5).isValid;

      const invalidValues = ["value", "abcdef", "ab"];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("min length and contains", () => {
    test("should accept when the string contains the substring and meets the minimum length", () => {
      const validator = string().contains("abc").minLength(5).isValid;

      const validValues = ["abcde", "value-abc"];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject when the string does not contain the substring or fails the minimum length", () => {
      const validator = string().contains("abc").minLength(5).isValid;

      const invalidValues = ["abc", "abcd", "value"];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });
});
