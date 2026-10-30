import { NumberSchema } from "@basecraft/types";
import { createOptionalSchema } from "../create-optional-schema.core.js";
import {
  appendRule,
  countDecimalPlaces,
  equalToRule,
  isFiniteNumber,
  normalizePlaces,
  allowedValuesRule,
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

function greaterThanOrEqualRule(target: number): NumberRule {
  return (value) => value >= target;
}

function lessThanRule(target: number): NumberRule {
  return (value) => value < target;
}

function lessThanOrEqualRule(target: number): NumberRule {
  return (value) => value <= target;
}

function createNumberSchema(rules: readonly NumberRule[] = []): NumberSchema {
  const createSchemaWithRule = (rule: NumberRule) =>
    createNumberSchema(appendRule(rules, rule));

  const schema: NumberSchema = {
    _brand: "NUMBER",
    isValid: (input: unknown): input is number =>
      isFiniteNumber(input) && passesAllRules(input, rules),
    int: () => createSchemaWithRule(integerRule()),
    positive: () => createSchemaWithRule(positiveRule()),
    negative: () => createSchemaWithRule(negativeRule()),
    decimal: (places) => createSchemaWithRule(decimalPlacesRule(places)),
    equal: (target) => createSchemaWithRule(equalToRule(target)),
    in: (values) => createSchemaWithRule(allowedValuesRule(values)),
    gt: (target) => createSchemaWithRule(greaterThanRule(target)),
    gte: (target) => createSchemaWithRule(greaterThanOrEqualRule(target)),
    lt: (target) => createSchemaWithRule(lessThanRule(target)),
    lte: (target) => createSchemaWithRule(lessThanOrEqualRule(target)),
    optional: () => createOptionalSchema(schema),
  };

  return schema;
}

export function number(): NumberSchema {
  return createNumberSchema();
}
