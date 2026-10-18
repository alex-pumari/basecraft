import { FieldSchemas } from "basecraft-types";
import { object } from "../schema/object/object.core.js";

export function createValidator<Shape extends FieldSchemas<Shape>>(
  shape: Shape,
) {
  return object(shape).strict();
}
