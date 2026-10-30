import { isFiniteNumber } from "./is-finite-number.core.js";

function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function allowedValuesRule(
  values: readonly unknown[],
): (value: unknown) => boolean {
  const allowedValues: readonly unknown[] = values.filter(
    (value) => isFiniteNumber(value) || isString(value),
  );

  return (value) => allowedValues.includes(value);
}
