import { Locale } from "./locale.type.js";
import { TimeZone } from "./time-zone.type.js";

export type DateUnit = "day" | "week" | "month" | "year";

export type DateFormatOptions = {
  locale?: Locale;
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  weekday?: "long" | "short" | "narrow";
};

export interface DateService<Date> {
  now(timeZone?: TimeZone): Date;

  add(date: Date, amount: number, unit: DateUnit): Date;

  subtract(date: Date, amount: number, unit: DateUnit): Date;

  diff(firstDate: Date, secondDate: Date, unit: DateUnit): number;

  equal(firstDate: Date, secondDate: Date): boolean;

  gt(firstDate: Date, secondDate: Date): boolean;

  lt(firstDate: Date, secondDate: Date): boolean;

  gte(firstDate: Date, secondDate: Date): boolean;

  lte(firstDate: Date, secondDate: Date): boolean;

  format(date: Date, options: DateFormatOptions): string;
}
