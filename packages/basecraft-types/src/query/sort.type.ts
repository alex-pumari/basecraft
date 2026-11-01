export type SortDirection = "asc" | "desc";

export interface Sort<SortableField extends string | number | symbol> {
  field: SortableField;
  direction: SortDirection;
}
