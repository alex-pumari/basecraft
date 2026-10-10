import { FilterOperators } from "./filter-operators.type";
import { RequireAtLeastOne } from "../require-at-least-one.type";

export type Filter<Field extends string, Value> = {
  field: Field;
  operators: FilterOperators<Value>;
};

export type FilterGroup<Field extends string, Value> = RequireAtLeastOne<{
  AND?: Array<Filter<Field, Value> | FilterGroup<Field, Value>>;
  OR?: Array<Filter<Field, Value> | FilterGroup<Field, Value>>;
}>;