export function minLengthRule(
  length: number,
): (value: { readonly length: number }) => boolean {
  return (value) => value.length >= length;
}
