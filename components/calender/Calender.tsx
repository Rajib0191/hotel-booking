"use client";
import React, { useState } from "react";
import CalenderMonth from "./CalenderMonth";
import { addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

type DateRange = { start: Date | null; end: Date | null };

type CalenderProps = {
  selectedRange: DateRange;
  setSelectedRange: React.Dispatch<React.SetStateAction<DateRange>>;
  totalDays: null | number;
};

const Calender = ({
  selectedRange,
  setSelectedRange,
  totalDays,
}: CalenderProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="p-4 bg-white rounded-md shadow-md text-center">
      <h2 className="text-lg font-semibold text-gray-600">
        Select check out date
      </h2>

      <div className="relative flex justify-between items-start gap-6">
        {/* =====First Month===== */}
        <div className="w-full">
          <div className="absolute left-3 -top-0 flex justify-between hover:bg-sky hover:text-background transition-all rounded-full">
            <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
              <ChevronLeft size={18} className="cursor-pointer" />
            </button>
          </div>
          <CalenderMonth
            baseDate={currentDate}
            selectedRange={selectedRange}
            onDateClick={(date) => {
              const { start, end } = selectedRange;
              if (!start || (start && end)) {
                setSelectedRange({ start: date, end: null });
              } else if (date > start) {
                setSelectedRange({ ...selectedRange, end: date });
              } else {
                setSelectedRange({ start: date, end: null });
              }
            }}
          />
        </div>

        {/* =====Second Month===== */}
        <div className="w-full">
          <div className="absolute right-3 -top-0 flex justify-between hover:bg-sky hover:text-background transition-all rounded-full">
            <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
              <ChevronRight size={18} className="cursor-pointer" />
            </button>
          </div>
          <CalenderMonth
            baseDate={addMonths(currentDate, 1)}
            selectedRange={selectedRange}
            onDateClick={(date) => {
              const { start, end } = selectedRange;
              if (!start || (start && end)) {
                setSelectedRange({ start: date, end: null });
              } else if (date > start) {
                setSelectedRange({ ...selectedRange, end: date });
              } else {
                setSelectedRange({ start: date, end: null });
              }
            }}
          />
        </div>
      </div>

      <strong className="mt-20">{totalDays} Night</strong>
    </div>
  );
};

export default Calender;
