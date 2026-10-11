import { Entity } from "../entity/entity.type.js";

export interface ReadRepository<CustomEntity extends Entity<CustomEntity["id"]>> {
  findById(id: CustomEntity["id"]): Promise<CustomEntity | null>;

  findAll(): Promise<CustomEntity[]>;
}