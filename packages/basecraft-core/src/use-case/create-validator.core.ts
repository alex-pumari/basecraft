import { Shape } from "@basecraft/types";
import { object } from "../schema/object/object.core.js";

export function createValidator<ObjectType extends object>(
  shape: Shape<ObjectType>,
) {
  return object(shape).strict();
}
