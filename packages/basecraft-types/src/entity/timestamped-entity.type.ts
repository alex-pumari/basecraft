import { Entity } from "./entity.type.js";

export type TimestampedEntity<
  IdentifierValue,
  IdentifierField extends string = "id"
> = Entity<IdentifierValue, IdentifierField> & {
  createdAt: Date;
  updatedAt: Date;
};