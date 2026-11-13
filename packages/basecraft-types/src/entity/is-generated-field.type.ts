import { IsOptionalKey } from "../util/is-optional-key.type.js";
import { Entity, IdentifierField } from "./entity.type.js";

export type IsGeneratedField<
  CustomEntity extends Entity<CustomEntity[IdentifierField]>,
  Field extends keyof CustomEntity,
> =
  IsOptionalKey<CustomEntity, Field> extends true
    ? false
    : undefined extends CustomEntity[Field]
      ? true
      : false;
