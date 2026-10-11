import { Entity } from "../entity/entity.type";
import { Pagination } from "../query/pagination.type";
import { Sort } from "../query/sort.type";
import { PageResult } from "./page-result.type";

export interface PaginatedReadRepository<
  EntityType extends Entity<EntityType["id"]>,
  FindQuery,
  SortableField extends string
> {
  findById(id: EntityType["id"]): Promise<EntityType | null>;

  findMany(
    query: FindQuery & {
      pagination?: Pagination;
      sort?: Sort<SortableField> | Sort<SortableField>[];
    }
  ): Promise<PageResult<EntityType>>;
}