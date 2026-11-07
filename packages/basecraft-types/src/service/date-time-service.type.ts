import { DateFormatOptions, DateUnit } from "./date-service.type.js";
import { TimeFormatOptions, TimeUnit } from "./time-service.type.js";
import { TimeZone } from "./time-zone.type.js";

export type DateTimeUnit = DateUnit | TimeUnit;

export type DateTimeFormatOptions = DateFormatOptions &
  TimeFormatOptions & {
    dateStyle?: "full" | "long" | "medium" | "short";
    timeStyle?: "full" | "long" | "medium" | "short";
  };

export interface DateTimeService<DateTime> {
  now(timeZone?: TimeZone): DateTime;

  add(dateTime: DateTime, amount: number, unit: DateTimeUnit): DateTime;

  subtract(dateTime: DateTime, amount: number, unit: DateTimeUnit): DateTime;

  diff(
    firstDateTime: DateTime,
    secondDateTime: DateTime,
    unit: DateTimeUnit,
  ): number;

  equal(firstDateTime: DateTime, secondDateTime: DateTime): boolean;

  gt(firstDateTime: DateTime, secondDateTime: DateTime): boolean;

  lt(firstDateTime: DateTime, secondDateTime: DateTime): boolean;

  gte(firstDateTime: DateTime, secondDateTime: DateTime): boolean;

  lte(firstDateTime: DateTime, secondDateTime: DateTime): boolean;

  format(dateTime: DateTime, options: DateTimeFormatOptions): string;
}
