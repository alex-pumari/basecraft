import { describe, expect, test } from "vitest";
import { number } from "./number.core.js";

describe("number-in-validations", () => {
  describe("membership", () => {
    test("should accept a number included in the list", () => {
      const validator = number().in([1, 2, 3]).isValid;

      const validValues = [1, 2, 3];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject a number not included in the list", () => {
      const validator = number().in([1, 2, 3]).isValid;

      const invalidValues = [0, 4, -1, 1.5];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });

    test("should accept an array with a single element", () => {
      const validator = number().in([42]).isValid;

      expect(validator(42)).toBe(true);
      expect(validator(41)).toBe(false);
    });

    test("should accept an array with multiple elements", () => {
      const validator = number().in([-10, 0, 3.14, 100]).isValid;

      expect(validator(-10)).toBe(true);
      expect(validator(0)).toBe(true);
      expect(validator(3.14)).toBe(true);
      expect(validator(100)).toBe(true);
      expect(validator(1)).toBe(false);
    });

    test("should allow duplicated values", () => {
      const validator = number().in([1, 1, 2, 2]).isValid;

      expect(validator(1)).toBe(true);
      expect(validator(2)).toBe(true);
      expect(validator(3)).toBe(false);
    });
  });

  describe("invalid received values", () => {
    test("should reject non-finite numbers even when the list contains them", () => {
      const validator = number().in([NaN, Infinity, -Infinity, 1]).isValid;

      const nonFiniteValues = [NaN, Infinity, -Infinity];

      nonFiniteValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });

      expect(validator(1)).toBe(true);
    });

    test("should reject non-finite numbers when the list contains only non-finite numbers", () => {
      const validator = number().in([NaN, Infinity, -Infinity]).isValid;

      const nonFiniteValues = [NaN, Infinity, -Infinity];

      nonFiniteValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });

    test("should reject values that are not numbers", () => {
      const validator = number().in([1, 2, 3]).isValid;

      const invalidValues = [undefined, null, "1", true, {}, [], Symbol("1")];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("invalid elements in the array", () => {
    test("should reject every value when the array is empty", () => {
      const validator = number().in(
        [] as unknown as [number, ...number[]],
      ).isValid;

      const values = [0, 1, -1, NaN, Infinity, -Infinity];

      values.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });

    test("should ignore invalid elements while keeping valid ones", () => {
      const validator = number().in([
        NaN,
        Infinity,
        -Infinity,
        "1",
        null,
        1,
      ] as unknown as [number, ...number[]]).isValid;

      expect(validator(1)).toBe(true);
      expect(validator(NaN)).toBe(false);
      expect(validator(Infinity)).toBe(false);
      expect(validator(-Infinity)).toBe(false);
      expect(validator(0)).toBe(false);
    });

    test("should reject every value when all elements are invalid", () => {
      const validator = number().in([
        NaN,
        Infinity,
        -Infinity,
        "1",
        null,
      ] as unknown as [number, ...number[]]).isValid;

      const values = [0, 1, -1, NaN, Infinity, -Infinity];

      values.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });

    test("should not match elements of a different type", () => {
      const validator = number().in(["2", 1] as unknown as [
        number,
        ...number[],
      ]).isValid;

      expect(validator(1)).toBe(true);
      expect(validator(2)).toBe(false);
      expect(validator("2")).toBe(false);
    });
  });

  describe("zero equality", () => {
    test("should consider positive and negative zero equivalent when the list contains a positive zero", () => {
      const validator = number().in([0]).isValid;

      expect(validator(0)).toBe(true);
      expect(validator(-0)).toBe(true);
    });

    test("should consider positive and negative zero equivalent when the list contains a negative zero", () => {
      const validator = number().in([-0]).isValid;

      expect(validator(0)).toBe(true);
      expect(validator(-0)).toBe(true);
    });

    test("should consider positive and negative zero equivalent alongside other values", () => {
      const validator = number().in([0, -0, 1]).isValid;

      expect(validator(0)).toBe(true);
      expect(validator(-0)).toBe(true);
      expect(validator(1)).toBe(true);
      expect(validator(2)).toBe(false);
    });
  });
});
