import { format } from "date-fns";

export const formatDateSafe = (date: Date | null) => {
  return date ? format(date, "yyyy-MM-dd") : "";
};
