import { Entity } from "../entity/entity.type";

export interface PageResult<CustomEntity extends Entity<CustomEntity["id"]>> {
  items: CustomEntity[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}