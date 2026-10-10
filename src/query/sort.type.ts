export type SortDirection = "asc" | "desc";

export interface Sort<SortableField extends string> {
  field: SortableField;
  direction: SortDirection;
}