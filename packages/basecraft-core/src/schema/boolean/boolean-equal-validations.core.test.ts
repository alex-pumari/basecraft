import { describe, expect, test } from "vitest";
import { boolean } from "./boolean.core.js";

describe("boolean-equal-validations", () => {
  test("should accept true when the target is true", () => {
    const validator = boolean().equal(true).isValid;

    expect(validator(true)).toBe(true);
  });

  test("should reject false when the target is true", () => {
    const validator = boolean().equal(true).isValid;

    expect(validator(false)).toBe(false);
  });

  test("should accept false when the target is false", () => {
    const validator = boolean().equal(false).isValid;

    expect(validator(false)).toBe(true);
  });

  test("should reject true when the target is false", () => {
    const validator = boolean().equal(false).isValid;

    expect(validator(true)).toBe(false);
  });

  test("should reject non-boolean values when the target is true", () => {
    const validator = boolean().equal(true).isValid;

    const invalidValues = [
      undefined,
      null,
      0,
      1,
      "",
      "true",
      "false",
      Symbol("symbol-example"),
      {},
      [],
    ];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });

  test("should reject non-boolean values when the target is false", () => {
    const validator = boolean().equal(false).isValid;

    const invalidValues = [
      undefined,
      null,
      0,
      1,
      "",
      "true",
      "false",
      Symbol("symbol-example"),
      {},
      [],
    ];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });
});