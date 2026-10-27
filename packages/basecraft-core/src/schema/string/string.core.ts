import { StringSchema } from "@basecraft/types";
import {
  appendRule,
  maxLengthRule,
  minLengthRule,
  passesAllRules,
} from "../../util/index.js";

type StringRule = (value: string) => boolean;

function containsRule(substring: string): StringRule {
  return (value) => value.includes(substring);
}

function createStringSchema(
  rules: readonly StringRule[] = [],
): StringSchema {
  const createSchemaWithRule = (rule: StringRule) =>
    createStringSchema(appendRule(rules, rule));

  return {
    _brand: "STRING",
    isValid: (input: unknown): input is string =>
      typeof input === "string" && passesAllRules(input, rules),
    contains: (substring) => createSchemaWithRule(containsRule(substring)),
    minLength: (length) => createSchemaWithRule(minLengthRule(length)),
    maxLength: (length) => createSchemaWithRule(maxLengthRule(length)),
  };
}

export function string(): StringSchema {
  return createStringSchema();
}
