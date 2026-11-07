import { DateTimeFormatOptions } from "./date-time-service.type.js";
import { TimeZone } from "./time-zone.type.js";

export type InstantUnit = "millisecond" | "second" | "minute" | "hour";

export type InstantFormatOptions = DateTimeFormatOptions & {
  timeZone?: TimeZone;
};

export interface InstantService<Instant> {
  now(): Instant;

  add(instant: Instant, amount: number, unit: InstantUnit): Instant;

  subtract(instant: Instant, amount: number, unit: InstantUnit): Instant;

  diff(
    firstInstant: Instant,
    secondInstant: Instant,
    unit: InstantUnit,
  ): number;

  equal(firstInstant: Instant, secondInstant: Instant): boolean;

  gt(firstInstant: Instant, secondInstant: Instant): boolean;

  lt(firstInstant: Instant, secondInstant: Instant): boolean;

  gte(firstInstant: Instant, secondInstant: Instant): boolean;

  lte(firstInstant: Instant, secondInstant: Instant): boolean;

  format(instant: Instant, options: InstantFormatOptions): string;
}
