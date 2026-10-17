import { describe, expect, test } from "vitest";
import { string } from "./string.core.js";

describe("string-validations", () => {
  describe("string", () => {
    const validator = string().isValid;

    test("should accept when the value is a string", () => {
      const validValues = ["value-example", "hello", "123", "a", " ", ""];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
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
        expect(validator(value)).toBe(false);
      });
    });
  });
});
