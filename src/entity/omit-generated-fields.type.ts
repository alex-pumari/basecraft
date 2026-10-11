import { Entity } from "./entity.type";

export type OmitGeneratedFields<CustomEntity extends Entity<CustomEntity["id"]>> =
  {
    [Field in keyof CustomEntity as
      undefined extends CustomEntity[Field] ? never : Field
    ]: CustomEntity[Field];
  } & {
    [Field in keyof CustomEntity as
      undefined extends CustomEntity[Field] ? Field : never
    ]?: never;
  };