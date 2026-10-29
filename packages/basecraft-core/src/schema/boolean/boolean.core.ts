import { BooleanSchema } from "@basecraft/types";
import { appendRule, equalToRule, passesAllRules } from "../../util/index.js";
import { createOptionalSchema } from "../create-optional-schema.core.js";

type BooleanRule = (value: boolean) => boolean;

function createBooleanSchema(
  rules: readonly BooleanRule[] = [],
): BooleanSchema {
  const createSchemaWithRule = (rule: BooleanRule) =>
    createBooleanSchema(appendRule(rules, rule));

  const schema: BooleanSchema = {
    _brand: "BOOLEAN",
    isValid: (input: unknown): input is boolean =>
      typeof input === "boolean" && passesAllRules(input, rules),
    equal: (target) => createSchemaWithRule(equalToRule(target)),
    optional: () => createOptionalSchema(schema),
  };

  return schema;
}

export function boolean(): BooleanSchema {
  return createBooleanSchema();
}
