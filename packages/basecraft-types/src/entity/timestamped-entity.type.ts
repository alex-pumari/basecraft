import { Entity } from "./entity.type.js";

export type TimestampedEntity<IdentifierValue> = Entity<IdentifierValue> & {
  createdAt: Date;
  updatedAt: Date;
};