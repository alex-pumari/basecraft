import { ArraySchema, InferSchema, BaseSchema } from "@basecraft/types";
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

  return {
    _brand: "ARRAY",
    isValid: (input: unknown): input is ItemType[] =>
      Array.isArray(input) &&
      (itemSchema === undefined ||
        input.every((item) => itemSchema.isValid(item))) &&
      passesAllRules(input, rules),
    contains: (item) => createSchemaWithRule(containsRule(item)),
    minLength: (length) => createSchemaWithRule(minLengthRule(length)),
    maxLength: (length) => createSchemaWithRule(maxLengthRule(length)),
  };
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
