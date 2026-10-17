import { describe, expect, test } from "vitest";
import { string } from "../string/string.core.js";
import { array } from "../array/array.core.js";
import { number } from "../number/number.core.js";
import { object } from "./object.core.js";
import { boolean } from "../boolean/boolean.core.js";

describe("object-validations", () => {
  describe("object", () => {
    test("should accept objects with any property values when no shape is specified", () => {
      const validator = object({}).isValid;

      const validValues = [
        {},
        { name: "first-example" },
        { age: 25 },
        { active: true },
        { value: null },
        { value: undefined },
        { nested: { name: "first-example" } },
        { items: [1, "item-example", true] },
      ];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject values that are not objects", () => {
      const validator = object({ name: string() }).isValid;

      const invalidValues = [
        undefined,
        null,
        "",
        "string-example",
        0,
        1,
        NaN,
        Infinity,
        true,
        false,
        [],
        [1, 2],
        Symbol("symbol-example"),
      ];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("property schema validation", () => {
    test("should accept objects whose properties match the string schema", () => {
      const validator = object({ name: string() }).isValid;

      const validValues = [
        { name: "" },
        { name: "first-example" },
        { name: "second-example" },
      ];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject objects whose properties do not match the string schema", () => {
      const validator = object({ name: string() }).isValid;

      const invalidValues = [
        { name: 1 },
        { name: true },
        { name: null },
        { name: undefined },
        { name: [] },
        { name: {} },
      ];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });

    test("should accept objects whose properties match the number schema", () => {
      const validator = object({ age: number() }).isValid;

      const validValues = [
        { age: 0 },
        { age: 25 },
        { age: -10 },
        { age: 3.5 },
      ];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject objects whose properties do not match the number schema", () => {
      const validator = object({ age: number() }).isValid;

      const invalidValues = [
        { age: "25" },
        { age: true },
        { age: null },
        { age: undefined },
        { age: NaN },
        { age: Infinity },
        { age: [] },
        { age: {} },
      ];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });

    test("should accept objects whose properties match the boolean schema", () => {
      const validator = object({ active: boolean() }).isValid;

      const validValues = [{ active: true }, { active: false }];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject objects whose properties do not match the boolean schema", () => {
      const validator = object({ active: boolean() }).isValid;

      const invalidValues = [
        { active: 1 },
        { active: 0 },
        { active: "true" },
        { active: null },
        { active: undefined },
        { active: [] },
        { active: {} },
      ];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });

    test("should reject objects that are missing a required property", () => {
      const validator = object({
        name: string(),
        age: number(),
      }).isValid;

      const invalidValues = [
        {},
        { name: "first-example" },
        { age: 25 },
      ];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });

    test("should accept objects with additional properties when all required properties are valid", () => {
      const validator = object({ name: string() }).isValid;

      const validValues = [
        { name: "first-example", age: 25 },
        { name: "second-example", active: true },
        { name: "third-example", metadata: { source: "test-example" } },
      ];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });
  });

  describe("nested object schema validation", () => {
    test("should accept objects whose nested properties match the object schema", () => {
      const validator = object({
        address: object({
          street: string(),
          number: number(),
        }),
      }).isValid;

      const validValues = [
        {
          address: {
            street: "first-street",
            number: 10,
          },
        },
        {
          address: {
            street: "second-street",
            number: 25,
          },
        },
      ];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject objects whose nested properties do not match the object schema", () => {
      const validator = object({
        address: object({
          street: string(),
          number: number(),
        }),
      }).isValid;

      const invalidValues = [
        { address: null },
        { address: "street-example" },
        { address: {} },
        { address: { street: 10, number: 25 } },
        { address: { street: "first-street", number: "10" } },
        { address: { street: "first-street" } },
      ];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });

    test("should reject objects whose nested properties are missing", () => {
      const validator = object({
        address: object({
          street: string(),
        }),
      }).isValid;

      const invalidValues = [
        {},
        { address: {} },
        { address: { street: undefined } },
      ];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("array property schema validation", () => {
    test("should accept objects whose properties match the array schema", () => {
      const validator = object({
        tags: array(string()),
      }).isValid;

      const validValues = [
        { tags: [] },
        { tags: ["first-example"] },
        { tags: ["first-example", "second-example"] },
      ];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject objects whose array properties contain invalid items", () => {
      const validator = object({
        tags: array(string()),
      }).isValid;

      const invalidValues = [
        { tags: [1] },
        { tags: [true] },
        { tags: [null] },
        { tags: [undefined] },
        { tags: ["first-example", 2] },
        { tags: [Symbol("symbol-example")] },
      ];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });

    test("should reject objects whose array properties are not arrays", () => {
      const validator = object({
        tags: array(string()),
      }).isValid;

      const invalidValues = [
        { tags: undefined },
        { tags: null },
        { tags: "first-example" },
        { tags: Symbol("symbol-example") },
        { tags: 1 },
        { tags: true },
        { tags: {} },
      ];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });
});
