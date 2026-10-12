import { describe, expect, test } from "vitest";
import { createValidator } from "../../create-validator.core.js";
import { string } from "../../../schema/string.core.js";

describe("max-length-validation", () => {
  describe("max length", () => {
    test("should accept when the string length is equal to the maximum", () => {
      const validator = createValidator({
        field: string().maxLength(5),
      }).isValid;

      expect(validator({ field: "abcde" })).toBe(true);
    });

    test("should accept when the string length is below the maximum", () => {
      const validator = createValidator({
        field: string().maxLength(5),
      }).isValid;

      const validValues = ["", "a", "abcd"];

      validValues.forEach((value) => {
        expect(validator({ field: value })).toBe(true);
      });
    });

    test("should reject when the string length exceeds the maximum", () => {
      const validator = createValidator({
        field: string().maxLength(5),
      }).isValid;

      const invalidValues = ["abcdef", "123456", "value-example"];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });

    test("should accept when the maximum length is zero and the string is empty", () => {
      const validator = createValidator({
        field: string().maxLength(0),
      }).isValid;

      expect(validator({ field: "" })).toBe(true);
    });

    test("should reject when the maximum length is zero and the string is not empty", () => {
      const validator = createValidator({
        field: string().maxLength(0),
      }).isValid;

      expect(validator({ field: "a" })).toBe(false);
      expect(validator({ field: " " })).toBe(false);
    });
  });

  describe("max length and contains", () => {
    test("should accept when the string contains the substring and does not exceed the maximum length", () => {
      const validator = createValidator({
        field: string().contains("abc").maxLength(5),
      }).isValid;

      const validValues = ["abc", "abcd", "abcde"];
      
      validValues.forEach((value) => {
        expect(validator({ field: value })).toBe(true);
      });
    });

    test("should reject when the string does not contain the substring or exceeds the maximum length", () => {
      const validator = createValidator({
        field: string().contains("abc").maxLength(5),
      }).isValid;

      const invalidValues = ["value", "abcdef", "ab"];
      
      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });
  });
});