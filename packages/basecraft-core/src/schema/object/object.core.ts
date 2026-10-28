import { BaseSchema, ObjectSchema, Shape, Brand } from "@basecraft/types";
import { appendRule, passesAllRules } from "../../util/index.js";

type ObjectRule = (value: Record<string, unknown>) => boolean;

function strictRule(keys: readonly string[]): ObjectRule {
  return (value) => Object.keys(value).every((key) => keys.includes(key));
}

function createObjectSchema<ObjectType extends object>(
  shape: Shape<ObjectType>,
  rules: readonly ObjectRule[] = [],
): ObjectSchema<ObjectType> {
  const keys = Object.keys(shape);
  const fields = shape as unknown as Record<string, BaseSchema<any>>;

  const createSchemaWithRule = (rule: ObjectRule) =>
    createObjectSchema(shape, appendRule(rules, rule));

  return {
    ...shape,
    _brand: "OBJECT" as Brand<ObjectType>,
    isValid: (input: unknown): input is ObjectType => {
      if (typeof input !== "object" || input === null || Array.isArray(input)) {
        return false;
      }

      const record = input as Record<string, unknown>;
      const matchesShape = keys.every((key) =>
        fields[key].isValid(record[key]),
      );

      return matchesShape && passesAllRules(record, rules);
    },
    strict: () => createSchemaWithRule(strictRule(keys)),
  };
}

export function object<ObjectType extends object>(
  shape: Shape<ObjectType>,
): ObjectSchema<ObjectType> {
  return createObjectSchema(shape);
}
