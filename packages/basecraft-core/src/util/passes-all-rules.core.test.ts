import { describe, expect, test, vi } from "vitest";
import { passesAllRules } from "./passes-all-rules.core.js";

describe("passes-all-rules", () => {
  test("should accept a value when all rules pass", () => {
    const positiveRule = (value: number) => value > 0;
    const lessThanTenRule = (value: number) => value < 10;
    const integerRule = (value: number) => Number.isInteger(value);
    const rules = [positiveRule, lessThanTenRule, integerRule];

    const result = passesAllRules(5, rules);

    expect(result).toBe(true);
  });

  test("should reject a value when at least one rule fails", () => {
    const positiveRule = (value: number) => value > 0;
    const lessThanTenRule = (value: number) => value < 10;
    const integerRule = (value: number) => Number.isInteger(value);
    const rules = [positiveRule, lessThanTenRule, integerRule];

    const result = passesAllRules(15, rules);

    expect(result).toBe(false);
  });

  test("should accept any value when there are no rules", () => {
    const result = passesAllRules("value-example", []);

    expect(result).toBe(true);
  });

  test("should stop evaluating rules after the first failure", () => {
    const failingRule = vi.fn(() => false);
    const passingRule = vi.fn(() => true);

    passesAllRules(5, [failingRule, passingRule]);

    expect(passingRule).not.toHaveBeenCalled();
  });
});
