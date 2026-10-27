import { BooleanSchema } from "@basecraft/types";
import { appendRule, equalToRule, passesAllRules } from "../../util/index.js";

type BooleanRule = (value: boolean) => boolean;

function createBooleanSchema(
  rules: readonly BooleanRule[] = [],
): BooleanSchema {
  const createSchemaWithRule = (rule: BooleanRule) =>
    createBooleanSchema(appendRule(rules, rule));

  return {
    _brand: "BOOLEAN",
    isValid: (input: unknown): input is boolean =>
      typeof input === "boolean" && passesAllRules(input, rules),
    equal: (target) => createSchemaWithRule(equalToRule(target)),
  };
}

export function boolean(): BooleanSchema {
  return createBooleanSchema();
}
