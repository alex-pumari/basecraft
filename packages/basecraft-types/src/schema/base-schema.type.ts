import { Brand } from "./brand.type.js";

export interface BaseSchema<Type> {
  readonly _brand: Brand<Type>;
  isValid(input: unknown): input is Type;
}