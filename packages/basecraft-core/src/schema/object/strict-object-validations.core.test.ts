import { describe, expect, test } from "vitest";
import { string } from "../string/string.core.js";
import { number } from "../number/number.core.js";
import { object } from "./object.core.js";

describe("strict-object-validations", () => {
  test("should accept objects containing exactly the required properties", () => {
    const validator = object({
      name: string(),
      age: number(),
    }).strict().isValid;

    const validValues = [
      { name: "first-example", age: 25 },
      { name: "second-example", age: 30 },
    ];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });

  test("should reject objects containing additional properties", () => {
    const validator = object({
      name: string(),
      age: number(),
    }).strict().isValid;

    const invalidValues = [
      { name: "first-example", age: 25, active: true },
      { name: "second-example", age: 30, email: "test@example.com" },
      {
        name: "third-example",
        age: 35,
        metadata: { source: "test-example" },
      },
    ];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });

  test("should reject objects that are missing required properties", () => {
    const validator = object({
      name: string(),
      age: number(),
    }).strict().isValid;

    const invalidValues = [
      {},
      { name: "first-example" },
      { age: 25 },
    ];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });

  test("should reject objects whose required properties have invalid values", () => {
    const validator = object({
      name: string(),
      age: number(),
    }).strict().isValid;

    const invalidValues = [
      { name: 1, age: 25 },
      { name: "first-example", age: "25" },
      { name: null, age: 25 },
      { name: "first-example", age: null },
    ];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });
});
