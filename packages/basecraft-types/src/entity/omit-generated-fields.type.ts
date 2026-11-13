import { Entity, IdentifierField } from "./entity.type.js";
import { IsGeneratedField } from "./is-generated-field.type.js";

export type OmitGeneratedFields<
  CustomEntity extends Entity<CustomEntity[IdentifierField]>,
> = {
  [
    Field in keyof CustomEntity as IsGeneratedField<
      CustomEntity,
      Field
    > extends true
      ? never
      : Field
  ]: CustomEntity[Field];
};
