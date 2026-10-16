import { InferSchema } from "./infer-schema.type.js";

export type InferShape<Shape> = {
  [Key in keyof Shape]: InferSchema<Shape[Key]>;
};
