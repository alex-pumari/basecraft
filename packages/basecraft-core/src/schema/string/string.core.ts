import { StringSchema } from "@basecraft/types";

type StringCheck = (value: string) => boolean;

function createStringSchema(checks: readonly StringCheck[]): StringSchema {
  const extend = (check: StringCheck) => createStringSchema([...checks, check]);

  return {
    _brand: "STRING",
    isValid: (input: unknown): input is string =>
      typeof input === "string" && checks.every((check) => check(input)),
    contains: (substring) => extend((value) => value.includes(substring)),
    minLength: (length) => extend((value) => value.length >= length),
    maxLength: (length) => extend((value) => value.length <= length),
  };
}

export function string(): StringSchema {
  return createStringSchema([]);
}
