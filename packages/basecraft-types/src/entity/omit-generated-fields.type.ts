import { Entity, IdentifierField } from "./entity.type.js";

export type OmitGeneratedFields<CustomEntity extends Entity<CustomEntity[IdentifierField]>> =
  {
    [Field in keyof CustomEntity as
      undefined extends CustomEntity[Field] ? never : Field
    ]: CustomEntity[Field];
  } & {
    [Field in keyof CustomEntity as
      undefined extends CustomEntity[Field] ? Field : never
    ]?: never;
  };