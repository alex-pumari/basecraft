import { StringSchema } from "@basecraft/types";
import {
  appendRule,
  maxLengthRule,
  minLengthRule,
  passesAllRules,
} from "../../util/index.js";
import { createOptionalSchema } from "../create-optional-schema.core.js";

type StringRule = (value: string) => boolean;

function containsRule(substring: string): StringRule {
  return (value) => value.includes(substring);
}

function createStringSchema(rules: readonly StringRule[] = []): StringSchema {
  const createSchemaWithRule = (rule: StringRule) =>
    createStringSchema(appendRule(rules, rule));

  const schema: StringSchema = {
    _brand: "STRING",
    isValid: (input: unknown): input is string =>
      typeof input === "string" && passesAllRules(input, rules),
    contains: (substring) => createSchemaWithRule(containsRule(substring)),
    min: (length) => createSchemaWithRule(minLengthRule(length)),
    max: (length) => createSchemaWithRule(maxLengthRule(length)),
    optional: () => createOptionalSchema(schema),
  };

  return schema;
}

export function string(): StringSchema {
  return createStringSchema();
}
