import { Entity } from "../entity/entity.type";

export interface PageResult<EntityType extends Entity<EntityType["id"]>> {
  items: EntityType[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}