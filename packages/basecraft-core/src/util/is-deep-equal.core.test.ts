import { describe, expect, test } from "vitest";
import { isDeepEqual } from "./is-deep-equal.core.js";

describe("is-deep-equal", () => {
  test("should accept identical primitive values", () => {
    const values = ["value-example", 1, true, null, undefined];

    values.forEach((value) => {
      expect(isDeepEqual(value, value)).toBe(true);
    });
  });

  test("should reject different primitive values", () => {
    expect(isDeepEqual("value-example", "other-example")).toBe(false);
    expect(isDeepEqual(1, 2)).toBe(false);
    expect(isDeepEqual(true, false)).toBe(false);
  });

  test("should compare NaN as equal to NaN", () => {
    const result = isDeepEqual(NaN, NaN);

    expect(result).toBe(true);
  });

  test("should reject a primitive compared with an object", () => {
    expect(isDeepEqual("value-example", { field: "value-example" })).toBe(false);
    expect(isDeepEqual(1, [1])).toBe(false);
  });

  test("should reject null compared with an object", () => {
    const result = isDeepEqual(null, {});

    expect(result).toBe(false);
  });

  test("should accept objects with the same keys and values", () => {
    const first = { name: "value-example", age: 25 };
    const second = { age: 25, name: "value-example" };

    const result = isDeepEqual(first, second);

    expect(result).toBe(true);
  });

  test("should accept nested objects with the same content", () => {
    const first = { nested: { field: "value-example" }, items: [1, 2, 3] };
    const second = { nested: { field: "value-example" }, items: [1, 2, 3] };

    const result = isDeepEqual(first, second);

    expect(result).toBe(true);
  });

  test("should reject objects with different keys", () => {
    const first = { name: "value-example" };
    const second = { name: "value-example", age: 25 };

    const result = isDeepEqual(first, second);

    expect(result).toBe(false);
  });

  test("should reject objects with different values", () => {
    const first = { name: "value-example" };
    const second = { name: "other-example" };

    const result = isDeepEqual(first, second);

    expect(result).toBe(false);
  });

  test("should reject objects that differ only by an undefined property", () => {
    const first = { field: undefined };
    const second = {};

    const result = isDeepEqual(first, second);

    expect(result).toBe(false);
  });

  test("should accept arrays with the same items", () => {
    const first = [1, "value-example", true];
    const second = [1, "value-example", true];

    const result = isDeepEqual(first, second);

    expect(result).toBe(true);
  });

  test("should reject arrays with different items", () => {
    const result = isDeepEqual([1, 2, 3], [1, 2, 4]);

    expect(result).toBe(false);
  });

  test("should reject arrays with different lengths", () => {
    const result = isDeepEqual([1, 2], [1, 2, 3]);

    expect(result).toBe(false);
  });

  test("should reject an array compared with an object", () => {
    const result = isDeepEqual([1], { 0: 1 });

    expect(result).toBe(false);
  });
});
