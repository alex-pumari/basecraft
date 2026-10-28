export function isDeepEqual(first: unknown, second: unknown): boolean {
  if (Object.is(first, second)) return true;
  const areNotObject =
    typeof first !== "object" ||
    typeof second !== "object" ||
    first === null ||
    second === null;

  if (areNotObject) return false;
  if (Array.isArray(first) !== Array.isArray(second)) return false;

  const firstRecord = first as Record<string, unknown>;
  const secondRecord = second as Record<string, unknown>;
  const firstKeys = Object.keys(firstRecord);

  return (
    firstKeys.length === Object.keys(secondRecord).length &&
    firstKeys.every(
      (key) =>
        Object.hasOwn(secondRecord, key) &&
        isDeepEqual(firstRecord[key], secondRecord[key]),
    )
  );
}
