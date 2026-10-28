export function countDecimalPlaces(value: number): number {
  const exponentSeparator = "e";
  const decimalSeparator = ".";
  const minimumPlaces = 0;

  const [mantissa = "", exponent = "0"] =
    String(value).split(exponentSeparator);
  const decimalPart = mantissa.split(decimalSeparator)[1];
  const mantissaPlaces = decimalPart?.length ?? 0;

  const decimalPlaces = Math.max(
    minimumPlaces,
    mantissaPlaces - Number(exponent),
  );

  return decimalPlaces;
}
