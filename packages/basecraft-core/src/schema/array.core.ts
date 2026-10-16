import { ArraySchema, InferSchema } from "basecraft-types";

type BaseSchema = { readonly _brand: string };

export declare function array(): ArraySchema<unknown>;
export declare function array<ItemSchema extends BaseSchema>(
  itemSchema: ItemSchema
): ArraySchema<InferSchema<ItemSchema>>;