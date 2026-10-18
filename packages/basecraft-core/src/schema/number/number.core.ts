import { NumberSchema } from "basecraft-types";

type NumberCheck = (value: number) => boolean;

function countDecimalPlaces(value: number): number {
  const [mantissa = "", exponent = "0"] = String(value).split("e");
  const mantissaPlaces = mantissa.split(".")[1]?.length ?? 0;

  return Math.max(0, mantissaPlaces - Number(exponent));
}

function normalizePlaces(places: number): number {
  return Number.isFinite(places) ? Math.max(0, Math.trunc(places)) : 0;
}

function createNumberSchema(checks: readonly NumberCheck[]): NumberSchema {
  const extend = (check: NumberCheck) => createNumberSchema([...checks, check]);

  return {
    _brand: "NUMBER",
    isValid: (input: unknown): input is number =>
      typeof input === "number" &&
      Number.isFinite(input) &&
      checks.every((check) => check(input)),
    integer: () => extend((value) => Number.isInteger(value)),
    positive: () => extend((value) => value > 0),
    negative: () => extend((value) => value < 0),
    decimalPlaces: (places) => {
      const maxPlaces = normalizePlaces(places);
      return extend((value) => countDecimalPlaces(value) <= maxPlaces);
    },
    equal: (target) => extend((value) => value === target),
    greaterThan: (target) => extend((value) => value > target),
    lessThan: (target) => extend((value) => value < target),
  };
}

export function number(): NumberSchema {
  return createNumberSchema([]);
}
