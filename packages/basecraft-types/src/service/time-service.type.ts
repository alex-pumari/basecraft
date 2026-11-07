import { InstantUnit } from "./instant-service.type.js";
import { Locale } from "./locale.type.js";
import { TimeZone } from "./time-zone.type.js";

export type TimeUnit = InstantUnit;

export type TimeFormatOptions = {
  locale?: Locale;
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  fractionalSecondDigits?: 1 | 2 | 3;
  hour12?: boolean;
  hourCycle?: "h11" | "h12" | "h23" | "h24";
};

export interface TimeService<Time> {
  now(timeZone?: TimeZone): Time;

  add(time: Time, amount: number, unit: TimeUnit): Time;

  subtract(time: Time, amount: number, unit: TimeUnit): Time;

  diff(firstTime: Time, secondTime: Time, unit: TimeUnit): number;

  equal(firstTime: Time, secondTime: Time): boolean;

  gt(firstTime: Time, secondTime: Time): boolean;

  lt(firstTime: Time, secondTime: Time): boolean;

  gte(firstTime: Time, secondTime: Time): boolean;

  lte(firstTime: Time, secondTime: Time): boolean;

  format(time: Time, options: TimeFormatOptions): string;
}
