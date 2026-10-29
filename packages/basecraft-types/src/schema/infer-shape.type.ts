import { InferSchema } from "./infer-schema.type.js";

type OptionalSchemaMarker = {
  readonly _optional: true;
};

type OptionalKeys<Shape> = {
  [Key in keyof Shape]: Shape[Key] extends OptionalSchemaMarker
    ? Key
    : never;
}[keyof Shape];

export type InferShape<Shape> = {
  [Key in Exclude<keyof Shape, OptionalKeys<Shape>>]: InferSchema<Shape[Key]>;
} & {
  [Key in OptionalKeys<Shape>]?: InferSchema<Shape[Key]>;
};
