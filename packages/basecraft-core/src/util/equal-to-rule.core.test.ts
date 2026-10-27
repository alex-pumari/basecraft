import { describe, expect, test } from "vitest";
import { equalToRule } from "./equal-to-rule.core.js";

describe("equal-to-rule", () => {
  test("should accept the target value", () => {
    const rule = equalToRule("value-example");

    const result = rule("value-example");

    expect(result).toBe(true);
  });

  test("should reject values different from the target", () => {
    const rule = equalToRule("value-example");

    const result = rule("other-example");

    expect(result).toBe(false);
  });

  test("should compare values by strict equality", () => {
    const target = { field: "value-example" };
    const rule = equalToRule(target);

    const result = rule({ field: "value-example" });

    expect(result).toBe(false);
  });

  test("should accept the same reference as the target", () => {
    const target = { field: "value-example" };
    const rule = equalToRule(target);

    const result = rule(target);

    expect(result).toBe(true);
  });

  test("should reject values of a different type with the same representation", () => {
    const rule = equalToRule(1);

    const result = rule("1" as unknown as number);

    expect(result).toBe(false);
  });
});
