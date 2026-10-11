export interface ArraySchema<ItemType> {
  readonly _brand: "ARRAY";
  contains(item: ItemType): ArraySchema<ItemType>;
  minLength(length: number): ArraySchema<ItemType>;
  maxLength(length: number): ArraySchema<ItemType>;
}