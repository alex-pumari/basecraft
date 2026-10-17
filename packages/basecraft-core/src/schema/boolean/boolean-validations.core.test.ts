import { describe, expect, test } from "vitest";
import { boolean } from "./boolean.core.js";

describe("boolean-validations", () => {
  const validator = boolean().isValid;

  test("should accept boolean values", () => {
    const validValues = [true, false];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });

  test("should reject non-boolean values", () => {
    const invalidValues = [
      undefined,
      null,
      0,
      1,
      -1,
      NaN,
      Infinity,
      "",
      "true",
      "false",
      "boolean",
      "string-example",
      Symbol("symbol-example"),
      {},
      { field: true },
      [],
      ["item-example"],
    ];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });
});