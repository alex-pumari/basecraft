import { describe, expect, test } from "vitest";
import { string } from "../string/string.core.js";
import { array } from "../array/array.core.js";
import { number } from "../number/number.core.js";
import { object } from "./object.core.js";
import { boolean } from "../boolean/boolean.core.js";

describe("object-combined-validations", () => {
  test("should accept objects whose properties satisfy all their schemas", () => {
    const validator = object({
      name: string(),
      age: number(),
      active: boolean(),
      tags: array(string()),
    }).isValid;

    expect(
      validator({
        name: "first-example",
        age: 25,
        active: true,
        tags: ["first-tag", "second-tag"],
      }),
    ).toBe(true);
  });

  test("should reject objects when any property violates its schema", () => {
    const validator = object({
      name: string(),
      age: number(),
      active: boolean(),
      tags: array(string()),
    }).isValid;

    const invalidValues = [
      {
        name: 1,
        age: 25,
        active: true,
        tags: ["first-tag"],
      },
      {
        name: "first-example",
        age: "25",
        active: true,
        tags: ["first-tag"],
      },
      {
        name: "first-example",
        age: 25,
        active: "true",
        tags: ["first-tag"],
      },
      {
        name: "first-example",
        age: 25,
        active: true,
        tags: [1],
      },
    ];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });

  describe("optional properties", () => {
    const validator = object({
      name: string(),
      nickname: string().optional(),
      age: number().optional(),
    }).isValid;

    test("should accept objects when optional properties are missing or valid", () => {
      const validValues = [
        { name: "first-example" },
        { name: "first-example", nickname: "first-nickname" },
        { name: "first-example", nickname: undefined, age: 25 },
      ];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject objects when optional properties are present but invalid", () => {
      const invalidValues = [
        {},
        { name: 1 },
        { name: "first-example", nickname: 1 },
        { name: "first-example", age: "25" },
      ];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("strict and optional", () => {
    const validator = object({
      name: string(),
      age: number(),
    })
      .strict()
      .optional().isValid;

    test("should accept an optional value and objects containing exactly the required properties", () => {
      const validValues = [
        undefined,
        { name: "first-example", age: 25 },
        { name: "second-example", age: 30 },
      ];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject invalid values and objects with extra or missing properties", () => {
      const invalidValues = [
        null,
        {},
        { name: "first-example" },
        { name: "first-example", age: 25, active: true },
        { name: 1, age: 25 },
      ];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });
});
