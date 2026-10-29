import { describe, expect, test } from "vitest";
import { number } from "../number/number.core.js";
import { string } from "../string/string.core.js";
import { object } from "./object.core.js";

describe("optional-object-validations", () => {
  describe("optional object with required properties", () => {
    const schema = object({
      name: string(),
      age: number(),
    });
    const validator = schema.optional().isValid;

    test("should accept an optional value", () => {
      expect(validator(undefined)).toBe(true);
    });

    test("should accept objects that satisfy the shape", () => {
      expect(validator({ id: 1, name: "first-example", age: 25 })).toBe(true);
    });

    test("should reject values that are not objects or violate the shape", () => {
      const invalidValues = [
        null,
        { name: "first-example" },
        { name: 1, age: 25 },
        { name: "first-example", age: "25" },
      ];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });

    test("should not change the original schema when calling optional", () => {
      expect(schema.isValid(undefined)).toBe(false);
      expect(schema.optional().isValid(undefined)).toBe(true);
      expect(schema.isValid(undefined)).toBe(false);
    });
  });

  describe("object with all optional properties", () => {
    const schema = object({
      name: string().optional(),
      age: number().optional(),
    });

    test("should accept an empty object", () => {
      expect(schema.isValid({})).toBe(true);
    });

    test("should accept properties explicitly set to optional value", () => {
      expect(schema.isValid({ name: undefined, age: undefined })).toBe(true);
      expect(schema.isValid({ id: 1, name: undefined, age: undefined })).toBe(
        true,
      );
    });

    test("should accept additional properties when the object is not strict", () => {
      expect(schema.isValid({ otherField: 1 })).toBe(true);
      expect(schema.strict().isValid({ otherField: 1 })).toBe(false);
    });
  });

  describe("optional object with all optional properties", () => {
    const validator = object({
      name: string().optional(),
      age: number().optional(),
    }).optional().isValid;

    test("should accept an optional value", () => {
      expect(validator(undefined)).toBe(true);
    });

    test("should accept an empty object", () => {
      expect(validator({})).toBe(true);
    });
  });
});
