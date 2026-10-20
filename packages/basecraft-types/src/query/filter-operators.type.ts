import { RequireAtLeastOne } from "../util/require-at-least-one.type.js";

export type FilterOperators<Value> = RequireAtLeastOne<{
  eq?: Value;
  ne?: Value;
  in?: Value[];

  gt?: Value;
  gte?: Value;
  lt?: Value;
  lte?: Value;
}>;