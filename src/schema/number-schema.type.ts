export interface NumberSchema {
  integer(): NumberSchema;
  decimal(): NumberSchema;
  positive(): NumberSchema;
  negative(): NumberSchema;
  equal(target: number): NumberSchema;
  greaterThan(target: number): NumberSchema;
  lessThan(target: number): NumberSchema;
}