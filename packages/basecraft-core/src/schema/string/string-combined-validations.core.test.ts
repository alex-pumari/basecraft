import { describe, expect, test } from "vitest";
import { string } from "./string.core.js";

describe("string-combined-validations", () => {
  describe("string with min length and max length", () => {
    test("should accept when the string length is within the specified range", () => {
      const validator = string().min(3).max(5).isValid;

      const validValues = ["abc", "abcd", "abcde"];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject when the string length is outside the specified range", () => {
      const validator = string().min(3).max(5).isValid;

      const invalidValues = ["", "a", "ab", "abcdef"];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("string with min length and max length and contains", () => {
    test("should accept when the string satisfies all constraints", () => {
      const validator = string().contains("abc").min(3).max(8).isValid;

      const validValues = ["abc", "abcde", "abc more"];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject when the string violates at least one constraint", () => {
      const validator = string().contains("abc").min(3).max(8).isValid;

      const invalidValues = ["", "ab", "value", "abcdefghij"];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("max length and contains", () => {
    test("should accept when the string contains the substring and does not exceed the maximum length", () => {
      const validator = string().contains("abc").max(5).isValid;

      const validValues = ["abc", "abcd", "abcde"];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject when the string does not contain the substring or exceeds the maximum length", () => {
      const validator = string().contains("abc").max(5).isValid;

      const invalidValues = ["value", "abcdef", "ab"];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("min length and contains", () => {
    test("should accept when the string contains the substring and meets the minimum length", () => {
      const validator = string().contains("abc").min(5).isValid;

      const validValues = ["abcde", "value-abc"];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject when the string does not contain the substring or fails the minimum length", () => {
      const validator = string().contains("abc").min(5).isValid;

      const invalidValues = ["abc", "abcd", "value"];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("contains and optional", () => {
    const validator = string().contains("abc").optional().isValid;

    test("should accept an optional value and strings that contain the substring", () => {
      const validValues = [undefined, "abc", "abcde", "value-abc"];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject invalid values and strings that do not contain the substring", () => {
      const invalidValues = [null, "", "ab", "value"];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("min length, max length and optional", () => {
    const validator = string().min(3).max(5).optional().isValid;

    test("should accept an optional value and strings within the specified range", () => {
      const validValues = [undefined, "abc", "abcd", "abcde"];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject invalid values and strings outside the specified range", () => {
      const invalidValues = [null, "", "a", "ab", "abcdef"];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("contains, min length, max length and optional", () => {
    const validator = string().contains("abc").min(3).max(8).optional().isValid;

    test("should accept an optional value and strings that satisfy all constraints", () => {
      const validValues = [undefined, "abc", "abcde", "abc more"];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject invalid values and strings that violate at least one constraint", () => {
      const invalidValues = [null, "", "ab", "value", "abcdefghij"];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });
});
