import { describe, expect, test } from "vitest";
import { createValidator } from "../../create-validator.core.js";
import { number } from "../../../schema/number.core.js";

describe("number-validation", () => {
  const validator = createValidator({ field: number() }).isValid;

  test("should reject invalid number values", () => {
    const invalidValues = [
      undefined,
      NaN,
      null,
      Infinity,
      -Infinity,
      "",
      "string-example",
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

  test("should accept finite numbers", () => {
    const validValues = [
      0,
      1,
      -1,
      3.14,
      -3.14,
      Number.MAX_SAFE_INTEGER,
      Number.MIN_SAFE_INTEGER,
      Number.MIN_VALUE,
      -Number.MIN_VALUE,
    ];

    validValues.forEach((value) => {
      expect(validator({ field: value })).toBe(true);
    });
  });
});