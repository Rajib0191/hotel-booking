import { differenceInCalendarDays } from "date-fns";

export const getTotalDays = (start: Date | null, end: Date | null): number => {
  if (!start || !end) return 0;

  // +1 to include both start and end dates
  return differenceInCalendarDays(end, start);
};