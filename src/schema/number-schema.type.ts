export interface NumberSchema {
  readonly _brand: "NUMBER";
  integer(): NumberSchema;
  decimal(): NumberSchema;
  positive(): NumberSchema;
  negative(): NumberSchema;
  equal(target: number): NumberSchema;
  greaterThan(target: number): NumberSchema;
  lessThan(target: number): NumberSchema;
}