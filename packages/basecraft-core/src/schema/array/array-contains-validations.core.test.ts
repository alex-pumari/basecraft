import { describe, expect, test } from "vitest";
import { array } from "./array.core.js";
import { string } from "../string.core.js";
import { number } from "../number.core.js";
import { boolean } from "../boolean.core.js";

describe("array-contains-validations", () => {
  test("should accept arrays containing the specified number", () => {
    const validator = array().contains(1).isValid;

    expect(validator([1])).toBe(true);
    expect(validator([2, 1, 3])).toBe(true);
  });

  test("should reject arrays that do not contain the specified number", () => {
    const validator = array().contains(1).isValid;

    expect(validator([])).toBe(false);
    expect(validator([2, 3])).toBe(false);
  });

  test("should accept arrays containing the specified string", () => {
    const validator = array().contains("item-example").isValid;

    expect(validator(["item-example"])).toBe(true);
    expect(validator([1, "item-example", true])).toBe(true);
  });

  test("should reject arrays that do not contain the specified string", () => {
    const validator = array().contains("item-example").isValid;

    expect(validator([])).toBe(false);
    expect(validator([1, true, "other-example"])).toBe(false);
  });

  test("should accept arrays containing the specified boolean", () => {
    const validator = array().contains(true).isValid;

    expect(validator([true])).toBe(true);
    expect(validator([1, true, "item-example"])).toBe(true);
  });

  test("should reject arrays that do not contain the specified boolean", () => {
    const validator = array().contains(true).isValid;

    expect(validator([])).toBe(false);
    expect(validator([false, 1, "item-example"])).toBe(false);
  });

  test("should accept arrays containing null", () => {
    const validator = array().contains(null).isValid;

    expect(validator([null])).toBe(true);
    expect(validator([1, null, "item-example"])).toBe(true);
  });

  test("should reject arrays that do not contain null", () => {
    const validator = array().contains(null).isValid;

    expect(validator([])).toBe(false);
    expect(validator([undefined, 1])).toBe(false);
  });

  test("should accept arrays containing the specified string", () => {
    const validator = array(string()).contains("item-example").isValid;

    const validValues = [
      ["item-example"],
      ["other-example", "item-example"],
      ["item-example", "other-example"],
      ["item-example", "item-example"],
    ];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });

  test("should reject arrays that do not contain the specified string", () => {
    const validator = array(string()).contains("item-example").isValid;

    const invalidValues = [
      [],
      ["other-example"],
      ["item-examples"],
      ["first-example", "second-example"],
    ];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });

  test("should accept arrays containing the specified number", () => {
    const validator = array(number()).contains(42).isValid;

    const validValues = [[42], [1, 42], [42, 42]];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });

  test("should reject arrays that do not contain the specified number", () => {
    const validator = array(number()).contains(42).isValid;

    const invalidValues = [[], [1, 2, 3], [41, 43]];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });

  test("should accept arrays containing the specified boolean", () => {
    const validator = array(boolean()).contains(true).isValid;

    const validValues = [[true], [false, true], [true, true]];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });

  test("should reject arrays that do not contain the specified boolean", () => {
    const validator = array(boolean()).contains(true).isValid;

    const invalidValues = [[], [false], [false, false]];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });

  test("should accept arrays containing the specified nested array", () => {
    const validator = array(array(number())).contains([1, 2]).isValid;

    expect(
      validator([
        [1, 2],
        [3, 4],
      ]),
    ).toBe(true);
  });

  test("should reject arrays that do not contain the specified nested array", () => {
    const validator = array(array(number())).contains([1, 2]).isValid;

    expect(validator([])).toBe(false);
    expect(validator([[3, 4]])).toBe(false);

    expect(
      validator([
        [1, 3],
        [2, 4],
      ]),
    ).toBe(false);
  });

  test("should accept arrays containing the specified object", () => {
    const validator = array().contains({ id: 1, name: "example" }).isValid;

    expect(validator([{ id: 1, name: "example" }])).toBe(true);

    expect(
      validator([
        { id: 2, name: "other" },
        { id: 1, name: "example" },
      ]),
    ).toBe(true);
  });

  test("should reject arrays that do not contain the specified object", () => {
    const validator = array().contains({ id: 1, name: "example" }).isValid;

    expect(validator([])).toBe(false);
    expect(validator([{ id: 2, name: "other" }])).toBe(false);
    expect(validator([{ id: 1, name: "other" }])).toBe(false);
  });
});