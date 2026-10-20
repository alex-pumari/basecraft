import { ArraySchema, InferSchema } from "@basecraft/types";

type ItemSchemaConstraint = {
  readonly _brand: string;
  isValid(input: unknown): boolean;
};

type ArrayCheck = (value: unknown[]) => boolean;

function deepEqual(first: unknown, second: unknown): boolean {
  if (Object.is(first, second)) return true;
  if (
    typeof first !== "object" ||
    typeof second !== "object" ||
    first === null ||
    second === null
  ) {
    return false;
  }
  if (Array.isArray(first) !== Array.isArray(second)) return false;

  const firstRecord = first as Record<string, unknown>;
  const secondRecord = second as Record<string, unknown>;
  const firstKeys = Object.keys(firstRecord);

  return (
    firstKeys.length === Object.keys(secondRecord).length &&
    firstKeys.every(
      (key) =>
        Object.hasOwn(secondRecord, key) &&
        deepEqual(firstRecord[key], secondRecord[key]),
    )
  );
}

function createArraySchema<ItemType>(
  itemSchema: ItemSchemaConstraint | undefined,
  checks: readonly ArrayCheck[],
): ArraySchema<ItemType> {
  const extend = (check: ArrayCheck) =>
    createArraySchema<ItemType>(itemSchema, [...checks, check]);

  return {
    _brand: "ARRAY",
    isValid: (input: unknown): input is ItemType[] =>
      Array.isArray(input) &&
      (itemSchema === undefined ||
        input.every((item) => itemSchema.isValid(item))) &&
      checks.every((check) => check(input)),
    contains: (item) =>
      extend((value) => value.some((entry) => deepEqual(entry, item))),
    minLength: (length) => extend((value) => value.length >= length),
    maxLength: (length) => extend((value) => value.length <= length),
  };
}

export function array(): ArraySchema<unknown>;
export function array<ItemSchema extends ItemSchemaConstraint>(
  itemSchema: ItemSchema
): ArraySchema<InferSchema<ItemSchema>>;
export function array(itemSchema?: ItemSchemaConstraint) {
  return createArraySchema(itemSchema, []);
}
