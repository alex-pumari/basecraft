import { describe, expect, test } from "vitest";
import { hasAtLeastOneValue } from "./has-at-least-one-value.core.js";

describe("has-at-least-one-value", () => {
  test("should reject empty objects", () => {
    const value = {};

    expect(hasAtLeastOneValue(value)).toBe(false);
  });

  test("should accept objects when at least one property has a value", () => {
    const cases = [
      { name: "John" },
      { name: undefined, age: 25 },
      { name: null },
      { name: "", age: undefined },
      { user: { name: undefined } },
      { active: false },
      { count: 0 },
    ];

    cases.forEach((value) => {
      expect(hasAtLeastOneValue(value)).toBe(true);
    });
  });

  test("should reject objects when every property is undefined", () => {
    const cases = [
      { name: undefined },
      { name: undefined, age: undefined },
      { firstName: undefined, lastName: undefined },
    ];

    cases.forEach((value) => {
      expect(hasAtLeastOneValue(value)).toBe(false);
    });
  });

  test("should accept objects when multiple properties have values", () => {
    const value = {
      name: "John",
      age: 25,
      active: true,
    };

    expect(hasAtLeastOneValue(value)).toBe(true);
  });
});
