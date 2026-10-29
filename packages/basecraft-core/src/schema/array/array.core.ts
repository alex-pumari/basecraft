import { ArraySchema, InferSchema, BaseSchema } from "@basecraft/types";
import { createOptionalSchema } from "../create-optional-schema.core.js";
import {
  appendRule,
  isDeepEqual,
  maxLengthRule,
  minLengthRule,
  passesAllRules,
} from "../../util/index.js";

type ArrayRule = (value: unknown[]) => boolean;

function containsRule(item: unknown): ArrayRule {
  return (value) => value.some((entry) => isDeepEqual(entry, item));
}

function createArraySchema<ItemType>(
  itemSchema: BaseSchema<any> | undefined,
  rules: readonly ArrayRule[] = [],
): ArraySchema<ItemType> {
  const createSchemaWithRule = (rule: ArrayRule) =>
    createArraySchema<ItemType>(itemSchema, appendRule(rules, rule));

  const schema: ArraySchema<ItemType> = {
    _brand: "ARRAY",
    isValid: (input: unknown): input is ItemType[] =>
      Array.isArray(input) &&
      (itemSchema === undefined ||
        input.every((item) => itemSchema.isValid(item))) &&
      passesAllRules(input, rules),
    contains: (item) => createSchemaWithRule(containsRule(item)),
    min: (length) => createSchemaWithRule(minLengthRule(length)),
    max: (length) => createSchemaWithRule(maxLengthRule(length)),
    optional: () => createOptionalSchema(schema),
  };

  return schema;
}

export function array(): ArraySchema<unknown>;
export function array<ItemSchema extends BaseSchema<any>>(
  itemSchema: ItemSchema,
): ArraySchema<InferSchema<ItemSchema>>;
export function array<ItemSchema extends BaseSchema<any>>(
  itemSchema?: ItemSchema,
) {
  return createArraySchema(itemSchema);
}
