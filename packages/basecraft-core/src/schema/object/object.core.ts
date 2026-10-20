import { ObjectSchema, Shape, Brand } from "@basecraft/types";

type FieldValidator = { isValid(input: unknown): boolean };

function createObjectSchema<ObjectType extends object>(
  shape: Shape<ObjectType>,
  isStrict: boolean,
): ObjectSchema<ObjectType> {
  const keys = Object.keys(shape);
  const fields = shape as unknown as Record<string, FieldValidator>;

  const isValid = (input: unknown): input is ObjectType => {
    if (typeof input !== "object" || input === null || Array.isArray(input)) {
      return false;
    }

    const record = input as Record<string, unknown>;

    if (isStrict && Object.keys(record).some((key) => !keys.includes(key))) {
      return false;
    }

    return keys.every((key) => fields[key].isValid(record[key]));
  };

  return {
    ...shape,
    _brand: "OBJECT" as Brand<ObjectType>,
    isValid,
    strict: () => createObjectSchema(shape, true),
  };
}

export function object<ObjectType extends object>(
  shape: Shape<ObjectType>
): ObjectSchema<ObjectType> {
  return createObjectSchema(shape, false);
}
