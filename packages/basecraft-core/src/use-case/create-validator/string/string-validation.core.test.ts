import { describe, expect, test } from "vitest";
import { createValidator } from "../../create-validator.core.js";
import { string } from "../../../schema/string.core.js";

describe("string-validation", () => {
  describe("string", () => {
    const validator = createValidator({ field: string() }).isValid;

    test("should accept when the value is a string", () => {
      const validValues = [
        "value-example",
        "hello",
        "123",
        "a",
        " ",
        "",
      ];

      validValues.forEach((value) => {
        expect(validator({ field: value })).toBe(true);
      });
    });

    test("should reject when the value is not a string", () => {
      const invalidValues = [
        undefined,
        null,
        0,
        1,
        NaN,
        Infinity,
        true,
        false,
        Symbol("symbol-example"),
        {},
        { field: "value-example" },
        [],
        ["item-example"],
      ];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });
  });

  describe("string with min length and max length", () => {
    test("should accept when the string length is within the specified range", () => {
      const validator = createValidator({
        field: string().minLength(3).maxLength(5),
      }).isValid;

      const validValues = ["abc", "abcd", "abcde"];

      validValues.forEach((value) => {
        expect(validator({ field: value })).toBe(true);
      });
    });

    test("should reject when the string length is outside the specified range", () => {
      const validator = createValidator({
        field: string().minLength(3).maxLength(5),
      }).isValid;

      const invalidValues = ["", "a", "ab", "abcdef"];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });
  });

  describe("string with min length and max length and contains", () => {
    test("should accept when the string satisfies all constraints", () => {
      const validator = createValidator({
        field: string().contains("abc").minLength(3).maxLength(8),
      }).isValid;

      const validValues = ["abc", "abcde", "abc more"];

      validValues.forEach((value) => {
        expect(validator({ field: value })).toBe(true);
      });
    });

    test("should reject when the string violates at least one constraint", () => {
      const validator = createValidator({
        field: string().contains("abc").minLength(3).maxLength(8),
      }).isValid;

      const invalidValues = [
        "",
        "ab",
        "value",
        "abcdefghij",
      ];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });
  });
});