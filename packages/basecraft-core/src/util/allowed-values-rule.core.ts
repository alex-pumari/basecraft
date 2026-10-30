import { isFiniteNumber } from "./is-finite-number.core.js";
import { isString } from "./is-string.core.js";

export function allowedValuesRule(
  values: readonly unknown[],
): (value: unknown) => boolean {
  const allowedValues: readonly unknown[] = values.filter(
    (value) => isFiniteNumber(value) || isString(value),
  );

  return (value) => allowedValues.includes(value);
}
