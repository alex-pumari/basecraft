import { ArraySchema, InferSchema, BaseSchema } from "basecraft-types";

export declare function array(): ArraySchema<unknown>;
export declare function array<ItemSchema extends BaseSchema<ItemSchema[]>>(
  itemSchema: ItemSchema
): ArraySchema<InferSchema<ItemSchema>>;