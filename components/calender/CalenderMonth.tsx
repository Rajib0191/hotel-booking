import {
  format,
  startOfMonth,
  endOfMonth,
  addDays,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  startOfDay,
} from "date-fns";

type Props = {
  baseDate: Date;
  selectedRange: { start: Date | null; end: Date | null };
  onDateClick: (date: Date) => void;
  isOpenCheckInDate?: boolean;
  isOpenCheckOutDate?: boolean;
};
const CalenderMonth = ({
  baseDate,
  selectedRange,
  onDateClick,
  isOpenCheckOutDate,
  isOpenCheckInDate,
}: Props) => {
  const monthStart = startOfMonth(baseDate);
  const monthEnd = endOfMonth(monthStart);

  const rows = [];
  let day = monthStart;

  while (day <= monthEnd) {
    const days = [];

    for (let i = 0; i < 7; i++) {
      if (day > monthEnd) break;

      const currentDay = day;

      const today = new Date();
      const isInPast = isBefore(currentDay, startOfDay(today));
      const isInDateSelect = selectedRange.start
        ? isBefore(currentDay, selectedRange.start)
        : false;

      const isStart =
        selectedRange.start && isSameDay(currentDay, selectedRange.start);
      const isEnd =
        selectedRange.end && isSameDay(currentDay, selectedRange.end);
      const isInRange =
        selectedRange.start &&
        selectedRange.end &&
        isAfter(currentDay, selectedRange.start) &&
        isAfter(selectedRange.end, currentDay);

      // Only render if it's in the current month
      if (isSameMonth(currentDay, baseDate)) {
        days.push(
          <div
            key={currentDay.toString()}
            className={`text-sm text-center py-1 cursor-pointer rounded
            ${isStart ? "bg-indigo-400 text-white" : ""}
            ${isEnd ? "bg-indigo-900 text-white" : ""}
            ${isInRange ? "bg-indigo-100" : ""}
            ${
              isInPast || (isOpenCheckOutDate && isInDateSelect)
                ? "text-gray-300 cursor-not-allowed pointer-events-none"
                : ""
            }
          `}
            onClick={() => {
              if (!isInPast || (!isOpenCheckOutDate && !isInDateSelect))
                onDateClick(currentDay);
            }}
          >
            {format(currentDay, "d")}
          </div>
        );
      }

      day = addDays(day, 1);
    }

    if (days.length) {
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
    }
  }

  return (
    <div className="w-full h-full">
      <div className="text-sm font-medium text-gray-700 mb-10">
        {format(baseDate, "MMMM, yyyy")}
      </div>
      <div className="grid grid-cols-7 text-xs text-gray-400 mb-10">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>

      {rows}
    </div>
  );
};

export default CalenderMonth;
