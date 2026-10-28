import { NumberSchema } from "@basecraft/types";
import {
  appendRule,
  countDecimalPlaces,
  equalToRule,
  normalizePlaces,
  passesAllRules,
} from "../../util/index.js";

type NumberRule = (value: number) => boolean;

function integerRule(): NumberRule {
  return (value) => Number.isInteger(value);
}

function positiveRule(): NumberRule {
  return (value) => value > 0;
}

function negativeRule(): NumberRule {
  return (value) => value < 0;
}

function decimalPlacesRule(places: number): NumberRule {
  const maxPlaces = normalizePlaces(places);
  return (value) => countDecimalPlaces(value) <= maxPlaces;
}

function greaterThanRule(target: number): NumberRule {
  return (value) => value > target;
}

function lessThanRule(target: number): NumberRule {
  return (value) => value < target;
}

function createNumberSchema(
  rules: readonly NumberRule[] = [],
): NumberSchema {
  const createSchemaWithRule = (rule: NumberRule) =>
    createNumberSchema(appendRule(rules, rule));

  return {
    _brand: "NUMBER",
    isValid: (input: unknown): input is number =>
      typeof input === "number" &&
      Number.isFinite(input) &&
      passesAllRules(input, rules),
    integer: () => createSchemaWithRule(integerRule()),
    positive: () => createSchemaWithRule(positiveRule()),
    negative: () => createSchemaWithRule(negativeRule()),
    decimalPlaces: (places) =>
      createSchemaWithRule(decimalPlacesRule(places)),
    equal: (target) => createSchemaWithRule(equalToRule(target)),
    greaterThan: (target) => createSchemaWithRule(greaterThanRule(target)),
    lessThan: (target) => createSchemaWithRule(lessThanRule(target)),
  };
}

export function number(): NumberSchema {
  return createNumberSchema();
}
