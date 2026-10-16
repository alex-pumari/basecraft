import { BaseSchema } from "./base-schema.type.js";

export interface ArraySchema<ItemType> extends BaseSchema<ItemType[]> {
  contains(item: ItemType): ArraySchema<ItemType>;
  minLength(length: number): ArraySchema<ItemType>;
  maxLength(length: number): ArraySchema<ItemType>;
}