export function passesAllRules<Value>(
  value: Value,
  rules: readonly ((value: Value) => boolean)[],
): boolean {
  return rules.every((rule) => rule(value));
}
