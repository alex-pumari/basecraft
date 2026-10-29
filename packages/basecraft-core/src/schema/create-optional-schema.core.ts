import { BaseSchema, Brand, OptionalSchema } from "@basecraft/types";

export function createOptionalSchema<Type>(
  schema: BaseSchema<Type>,
): OptionalSchema<Type> {
  return {
    _brand: schema._brand as Brand<Type | undefined>,
    _optional: true,
    isValid: (input: unknown): input is Type | undefined =>
      input === undefined || schema.isValid(input),
  };
}
