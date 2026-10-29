import { describe, expect, test } from "vitest";
import { string } from "../string/string.core.js";
import { array } from "./array.core.js";

describe("array-combined-validations", () => {
  describe("array with min and max length", () => {
    test("should accept arrays whose length is within the specified bounds", () => {
      const validator = array().min(2).max(4).isValid;

      const validValues = [
        [1, 2],
        [1, 2, 3],
        [1, 2, 3, 4],
      ];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject arrays whose length is outside the specified bounds", () => {
      const validator = array().min(2).max(4).isValid;

      const invalidValues = [[], [1], [1, 2, 3, 4, 5]];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("combined constraints", () => {
    test("should accept arrays that satisfy the item schema, minimum length, maximum length, and contains constraints", () => {
      const validator = array(string())
        .contains("target-example")
        .min(2)
        .max(4).isValid;

      expect(
        validator(["first-example", "target-example", "third-example"]),
      ).toBe(true);
    });

    test("should reject arrays that violate the item schema despite satisfying the length constraints", () => {
      const validator = array(string()).min(2).max(4).isValid;

      expect(validator(["first-example", 2])).toBe(false);
    });

    test("should reject arrays that satisfy the item schema and length constraints but do not contain the required item", () => {
      const validator = array(string())
        .contains("target-example")
        .min(2)
        .max(4).isValid;

      expect(validator(["first-example", "second-example"])).toBe(false);
    });
  });

  describe("array validations and optional", () => {
    const validator = array(string()).min(2).max(4).optional().isValid;

    test("should accept an optional value and arrays within the specified bounds", () => {
      const validValues = [undefined, ["first", "second"], ["a", "b", "c"]];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject invalid values and arrays outside the specified bounds", () => {
      const invalidValues = [[], ["first"], ["a", "b", "c", "d", "e"], [1, 2]];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("contains and optional", () => {
    const validator = array(string())
      .contains("target-example")
      .optional().isValid;

    test("should accept an optional value and arrays containing the required item", () => {
      const validValues = [
        undefined,
        ["target-example"],
        ["first-example", "target-example"],
      ];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject invalid values and arrays that do not contain the required item", () => {
      const invalidValues = [
        null,
        [],
        ["first-example"],
        [1, "target-example"],
      ];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });
});
