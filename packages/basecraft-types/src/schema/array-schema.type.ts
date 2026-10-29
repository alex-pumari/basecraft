import { BaseSchema } from "./base-schema.type.js";

export interface ArraySchema<ItemType> extends BaseSchema<ItemType[]> {
  contains(item: ItemType): ArraySchema<ItemType>;
  min(length: number): ArraySchema<ItemType>;
  max(length: number): ArraySchema<ItemType>;
}
