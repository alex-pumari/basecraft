export function maxLengthRule(
  length: number,
): (value: { readonly length: number }) => boolean {
  return (value) => value.length <= length;
}
