export function hasAtLeastOneValue<Value extends Record<string, unknown>>(
  value: Value,
): boolean {
  const emptyValue = undefined;

  const hasValue = Object.values(value).some((item) => item !== emptyValue);

  return hasValue;
}
