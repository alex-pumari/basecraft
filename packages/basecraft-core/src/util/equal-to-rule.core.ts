export function equalToRule<Value>(
  target: Value,
): (value: Value) => boolean {
  return (value) => value === target;
}
