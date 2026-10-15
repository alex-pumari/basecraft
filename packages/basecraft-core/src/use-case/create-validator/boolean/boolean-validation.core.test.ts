import { describe, expect, test } from "vitest";
import { createValidator } from "../../create-validator.core.js";
import { boolean } from "../../../schema/boolean.core.js";

describe("boolean-validation", () => {
  describe("boolean", () => {
    const validator = createValidator({ field: boolean() }).isValid;

    test("should accept boolean values", () => {
      const validValues = [true, false];

      validValues.forEach((value) => {
        expect(validator({ field: value })).toBe(true);
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
        expect(validator({ field: value })).toBe(false);
      });
    });
  });

  describe("equal", () => {
    test("should accept true when the target is true", () => {
      const validator = createValidator({
        field: boolean().equal(true),
      }).isValid;

      expect(validator({ field: true })).toBe(true);
    });

    test("should reject false when the target is true", () => {
      const validator = createValidator({
        field: boolean().equal(true),
      }).isValid;

      expect(validator({ field: false })).toBe(false);
    });

    test("should accept false when the target is false", () => {
      const validator = createValidator({
        field: boolean().equal(false),
      }).isValid;

      expect(validator({ field: false })).toBe(true);
    });

    test("should reject true when the target is false", () => {
      const validator = createValidator({
        field: boolean().equal(false),
      }).isValid;

      expect(validator({ field: true })).toBe(false);
    });

    test("should reject non-boolean values when the target is true", () => {
      const validator = createValidator({
        field: boolean().equal(true),
      }).isValid;

      const invalidValues = [
        undefined,
        null,
        0,
        1,
        "",
        "true",
        "false",
        Symbol("symbol-example"),
        {},
        [],
      ];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });

    test("should reject non-boolean values when the target is false", () => {
      const validator = createValidator({
        field: boolean().equal(false),
      }).isValid;

      const invalidValues = [
        undefined,
        null,
        0,
        1,
        "",
        "true",
        "false",
        Symbol("symbol-example"),
        {},
        [],
      ];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });
  });
});