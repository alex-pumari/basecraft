export interface BooleanSchema {
  readonly _brand: "BOOLEAN";
  equal(target: boolean): BooleanSchema;
}