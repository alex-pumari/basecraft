import { Entity, IdentifierField } from "../entity/entity.type.js";

export interface PageResult<CustomEntity extends Entity<CustomEntity[IdentifierField]>> {
  items: CustomEntity[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}