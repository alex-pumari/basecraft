import { describe, expect, test } from "vitest";
import { string } from "./string.core.js";

describe("string-max-length-validations", () => {
  describe("max length", () => {
    test("should accept when the string length is equal to the maximum", () => {
      const validator = string().maxLength(5).isValid;

      expect(validator("abcde")).toBe(true);
    });

    test("should accept when the string length is below the maximum", () => {
      const validator = string().maxLength(5).isValid;

      const validValues = ["", "a", "abcd"];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject when the string length exceeds the maximum", () => {
      const validator = string().maxLength(5).isValid;

      const invalidValues = ["abcdef", "123456", "value-example"];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });

    test("should accept when the maximum length is zero and the string is empty", () => {
      const validator = string().maxLength(0).isValid;

      expect(validator("")).toBe(true);
    });

    test("should reject when the maximum length is zero and the string is not empty", () => {
      const validator = string().maxLength(0).isValid;

      expect(validator("a")).toBe(false);
      expect(validator(" ")).toBe(false);
    });
  });
});
