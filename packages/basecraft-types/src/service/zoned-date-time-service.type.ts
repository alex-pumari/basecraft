import { DateTimeFormatOptions } from "./date-time-service.type.js";
import { DateUnit } from "./date-service.type.js";
import { TimeUnit } from "./time-service.type.js";
import { TimeZone } from "./time-zone.type.js";

export type ZonedDateTimeUnit = DateUnit | TimeUnit;

export type ZonedDateTimeFormatOptions = DateTimeFormatOptions & {
  timeZone?: TimeZone;
  timeZoneName?: "long" | "short" | "longOffset" | "shortOffset";
};

export interface ZonedDateTimeService<ZonedDateTime> {
  now(timeZone?: TimeZone): ZonedDateTime;

  add(
    zonedDateTime: ZonedDateTime,
    amount: number,
    unit: ZonedDateTimeUnit,
  ): ZonedDateTime;

  subtract(
    zonedDateTime: ZonedDateTime,
    amount: number,
    unit: ZonedDateTimeUnit,
  ): ZonedDateTime;

  diff(
    firstZonedDateTime: ZonedDateTime,
    secondZonedDateTime: ZonedDateTime,
    unit: ZonedDateTimeUnit,
  ): number;

  equal(
    firstZonedDateTime: ZonedDateTime,
    secondZonedDateTime: ZonedDateTime,
  ): boolean;

  gt(
    firstZonedDateTime: ZonedDateTime,
    secondZonedDateTime: ZonedDateTime,
  ): boolean;

  lt(
    firstZonedDateTime: ZonedDateTime,
    secondZonedDateTime: ZonedDateTime,
  ): boolean;

  gte(
    firstZonedDateTime: ZonedDateTime,
    secondZonedDateTime: ZonedDateTime,
  ): boolean;

  lte(
    firstZonedDateTime: ZonedDateTime,
    secondZonedDateTime: ZonedDateTime,
  ): boolean;

  format(
    zonedDateTime: ZonedDateTime,
    options: ZonedDateTimeFormatOptions,
  ): string;
}
