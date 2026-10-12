import { Entity, IdentifierField } from "../entity/entity.type.js";

export interface ReadRepository<CustomEntity extends Entity<CustomEntity[IdentifierField]>> {
  findById(id: CustomEntity[IdentifierField]): Promise<CustomEntity | null>;

  findAll(): Promise<CustomEntity[]>;
}