import { StringSchema } from "@basecraft/types";
import { createOptionalSchema } from "../create-optional-schema.core.js";
import { appendRule } from "../../util/append-rule.core.js";
import { passesAllRules } from "../../util/passes-all-rules.core.js";
import { isString } from "../../util/is-string.core.js";
import { emailRule } from "../../util/email-rule.core.js";
import { allowedValuesRule } from "../../util/allowed-values-rule.core.js";
import { maxLengthRule } from "../../util/max-length-rule.core.js";
import { minLengthRule } from "../../util/min-length-rule.core.js";

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
      isString(input) && passesAllRules(input, rules),
    contains: (substring) => createSchemaWithRule(containsRule(substring)),
    email: () => createSchemaWithRule(emailRule),
    in: (values) => createSchemaWithRule(allowedValuesRule(values)),
    min: (length) => createSchemaWithRule(minLengthRule(length)),
    max: (length) => createSchemaWithRule(maxLengthRule(length)),
    optional: () => createOptionalSchema(schema),
  };

  return schema;
}

export function string(): StringSchema {
  return createStringSchema();
}
