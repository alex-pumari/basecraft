import { DateFormat } from "../util/date-format.type.js";
import { DateUnit } from "../util/date-unit.type.js";

export interface DateService<CustomDate> {
  now(): CustomDate;

  add(date: CustomDate, amount: number, unit: DateUnit): CustomDate;
  subtract(date: CustomDate, amount: number, unit: DateUnit): CustomDate;

  equal(
    firstDate: CustomDate,
    secondDate: CustomDate,
    unit?: DateUnit,
  ): boolean;
  gt(firstDate: CustomDate, secondDate: CustomDate, unit?: DateUnit): boolean;
  lt(firstDate: CustomDate, secondDate: CustomDate, unit?: DateUnit): boolean;
  gte(firstDate: CustomDate, secondDate: CustomDate, unit?: DateUnit): boolean;
  lte(firstDate: CustomDate, secondDate: CustomDate, unit?: DateUnit): boolean;
  between(
    date: CustomDate,
    startDate: CustomDate,
    endDate: CustomDate,
    unit?: DateUnit,
  ): boolean;

  diff(firstDate: CustomDate, secondDate: CustomDate, unit: DateUnit): number;

  format(date: CustomDate, format: DateFormat): string;
}
