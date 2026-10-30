import { describe, expect, test } from "vitest";
import { string } from "./string.core.js";

describe("string-in-validations", () => {
  describe("membership", () => {
    test("should accept a string included in the list", () => {
      const validator = string().in(["admin", "user"]).isValid;

      expect(validator("admin")).toBe(true);
      expect(validator("user")).toBe(true);
    });

    test("should reject a string not included in the list", () => {
      const validator = string().in(["admin", "user"]).isValid;

      const invalidValues = ["guest", "Admin", "USER", "admin "];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });

    test("should allow duplicated values", () => {
      const validator = string().in(["admin", "admin", "user"]).isValid;

      expect(validator("admin")).toBe(true);
      expect(validator("user")).toBe(true);
      expect(validator("guest")).toBe(false);
    });
  });

  describe("empty arrays", () => {
    test("should reject every value when the array is empty", () => {
      const validator = string().in(
        [] as unknown as [string, ...string[]],
      ).isValid;

      const values = ["", "admin", " ", "ADMIN"];

      values.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("string edge cases", () => {
    test("should accept the empty string only when it is included", () => {
      const validatorWithEmpty = string().in(["", "hello"]).isValid;
      const validatorWithoutEmpty = string().in(["hello"]).isValid;

      expect(validatorWithEmpty("")).toBe(true);
      expect(validatorWithoutEmpty("")).toBe(false);
    });

    test("should compare strings with spaces exactly", () => {
      const validator = string().in([" admin ", "admin"]).isValid;

      expect(validator(" admin ")).toBe(true);
      expect(validator("admin")).toBe(true);
      expect(validator("  admin  ")).toBe(false);
    });

    test("should compare case-sensitively", () => {
      const validator = string().in(["admin"]).isValid;

      expect(validator("admin")).toBe(true);
      expect(validator("Admin")).toBe(false);
      expect(validator("ADMIN")).toBe(false);
    });
  });

  describe("invalid received values", () => {
    test("should reject values that are not strings", () => {
      const validator = string().in(["admin", "user"]).isValid;

      const invalidValues = [undefined, null, 1, true, {}, [], Symbol("admin")];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("invalid elements in the array", () => {
    test("should ignore invalid elements while keeping valid ones", () => {
      const validator = string().in([
        1,
        null,
        "admin",
        undefined,
        {},
      ] as unknown as [string, ...string[]]).isValid;

      expect(validator("admin")).toBe(true);
      expect(validator("user")).toBe(false);
      expect(validator("1")).toBe(false);
      expect(validator("")).toBe(false);
    });

    test("should reject every value when all elements are invalid", () => {
      const validator = string().in([1, null, undefined, {}, []] as unknown as [
        string,
        ...string[],
      ]).isValid;

      const values = ["", "admin", "1", "null", "undefined"];

      values.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });

    test("should not match elements of a different type", () => {
      const validator = string().in([2, "1"] as unknown as [
        string,
        ...string[],
      ]).isValid;

      expect(validator("1")).toBe(true);
      expect(validator("2")).toBe(false);
      expect(validator(2)).toBe(false);
    });
  });
});
