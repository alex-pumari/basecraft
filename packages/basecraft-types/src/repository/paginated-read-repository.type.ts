import { Entity } from "../entity/entity.type";
import { Pagination } from "../query/pagination.type";
import { Sort } from "../query/sort.type";
import { PageResult } from "./page-result.type";

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