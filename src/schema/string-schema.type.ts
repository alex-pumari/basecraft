export interface StringSchema {
  contains(substring: string): StringSchema;
  minLength(length: number): StringSchema;
  maxLength(length: number): StringSchema;
}