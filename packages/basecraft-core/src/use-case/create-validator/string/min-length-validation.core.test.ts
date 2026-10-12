import { describe, expect, test } from "vitest";
import { createValidator } from "../../create-validator.core.js";
import { string } from "../../../schema/string.core.js";

describe("min-length-validation", () => {
  describe("min length", () => {
    test("should accept when the string length is equal to the minimum", () => {
      const validator = createValidator({
        field: string().minLength(5),
      }).isValid;

      expect(validator({ field: "abcde" })).toBe(true);
    });

    test("should accept when the string length exceeds the minimum", () => {
      const validator = createValidator({
        field: string().minLength(5),
      }).isValid;

      expect(validator({ field: "abcdef" })).toBe(true);
    });

    test("should reject when the string length is below the minimum", () => {
      const validator = createValidator({
        field: string().minLength(5),
      }).isValid;

      const invalidValues = ["", "a", "abcd"];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });

    test("should accept when the minimum length is zero", () => {
      const validator = createValidator({
        field: string().minLength(0),
      }).isValid;

      const validValues = ["", "a", "value-example"];

      validValues.forEach((value) => {
        expect(validator({ field: value })).toBe(true);
      });
    });
  });

  describe("min length and contains", () => {
    test("should accept when the string contains the substring and meets the minimum length", () => {
      const validator = createValidator({
        field: string().contains("abc").minLength(5),
      }).isValid;

      const validValues = ["abcde", "value-abc"];

      validValues.forEach((value) => {
        expect(validator({ field: value })).toBe(true);
      });
    });

    test("should reject when the string does not contain the substring or fails the minimum length", () => {
      const validator = createValidator({
        field: string().contains("abc").minLength(5),
      }).isValid;

      const invalidValues = ["abc", "abcd", "value"];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });
  });
});