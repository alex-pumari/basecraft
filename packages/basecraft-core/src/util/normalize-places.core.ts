export function normalizePlaces(places: number): number {
  return Number.isFinite(places) ? Math.max(0, Math.trunc(places)) : 0;
}
