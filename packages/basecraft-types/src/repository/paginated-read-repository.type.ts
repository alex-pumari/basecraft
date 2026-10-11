import { Entity } from "../entity/entity.type.js";
import { Pagination } from "../query/pagination.type.js";
import { Sort } from "../query/sort.type.js";
import { PageResult } from "./page-result.type.js";

export interface PaginatedReadRepository<
  CustomEntity extends Entity<CustomEntity["id"]>,
  FindQuery,
  SortableField extends string
> {
  findById(id: CustomEntity["id"]): Promise<CustomEntity | null>;

  findMany(
    query: FindQuery & {
      pagination?: Pagination;
      sort?: Sort<SortableField> | Sort<SortableField>[];
    }
  ): Promise<PageResult<CustomEntity>>;
}