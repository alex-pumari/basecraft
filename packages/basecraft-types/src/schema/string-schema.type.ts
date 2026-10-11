export interface StringSchema {
  readonly _brand: "STRING";
  contains(substring: string): StringSchema;
  minLength(length: number): StringSchema;
  maxLength(length: number): StringSchema;
}