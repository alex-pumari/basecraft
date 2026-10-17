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
});
