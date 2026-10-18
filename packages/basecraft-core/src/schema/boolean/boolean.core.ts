import { BooleanSchema } from "basecraft-types";

type BooleanCheck = (value: boolean) => boolean;

function createBooleanSchema(checks: readonly BooleanCheck[]): BooleanSchema {
  return {
    _brand: "BOOLEAN",
    isValid: (input: unknown): input is boolean =>
      typeof input === "boolean" && checks.every((check) => check(input)),
    equal: (target) =>
      createBooleanSchema([...checks, (value) => value === target]),
  };
}

export function boolean(): BooleanSchema {
  return createBooleanSchema([]);
}
