import { FieldSchemas, InferShape, ObjectSchema } from "basecraft-types";

export declare function object<Shape extends FieldSchemas<Shape>>(
  shape: Shape
): ObjectSchema<InferShape<Shape>>;
