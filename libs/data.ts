import { differenceInCalendarDays } from "date-fns";

export const getTotalDays = (start: Date | null, end: Date | null): number => {
  if (!start || !end) return 0;
  // +1 to include both start and end dates
  return differenceInCalendarDays(end, start);
};

import { isAfter, isEqual, parseISO } from "date-fns";
export function isDateGreaterOrEqual(targetDateStr: string): boolean {
  const today = new Date();
  const targetDate = parseISO(targetDateStr);

  return isAfter(targetDate, today) || isEqual(targetDate, today);
}
