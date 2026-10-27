import { describe, expect, test } from "vitest";
import { appendRule } from "./append-rule.core.js";

describe("append-rule", () => {
  test("should append the rule at the end of the list", () => {
    const positiveRule = (value: number) => value > 0;
    const evenRule = (value: number) => value % 2 === 0;
    const rules = [positiveRule];

    const result = appendRule(rules, evenRule);

    expect(result).toEqual([positiveRule, evenRule]);
  });

  test("should append a rule to an empty list", () => {
    const evenRule = (value: number) => value % 2 === 0;

    const result = appendRule([], evenRule);

    expect(result).toEqual([evenRule]);
  });

  test("should keep the original list unchanged", () => {
    const positiveRule = (value: number) => value > 0;
    const lessThanTenRule = (value: number) => value < 10;
    const rules = [positiveRule];

    appendRule(rules, lessThanTenRule);

    expect(rules).toEqual([positiveRule]);
  });
});
