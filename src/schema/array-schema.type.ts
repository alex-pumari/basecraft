export interface ArraySchema<ItemType> {
  contains(item: ItemType): ArraySchema<ItemType>;
  minLength(length: number): ArraySchema<ItemType>;
  maxLength(length: number): ArraySchema<ItemType>;
}