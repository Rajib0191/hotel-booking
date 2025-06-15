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
  isOpenCheckInDate?: boolean;
  setIsOpenCheckInDate?: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenCheckOutDate?: boolean;
  setIsOpenCheckOutDate?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Calender = ({
  selectedRange,
  setSelectedRange,
  totalDays,
  isOpenCheckInDate,
  setIsOpenCheckInDate,
  isOpenCheckOutDate,
  setIsOpenCheckOutDate,
}: CalenderProps) => {
  const { start, end } = selectedRange;
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div
      className={`p-4 rounded-md shadow-md text-center ${
        end || isOpenCheckOutDate ? "w-[500px]" : "w-[300px]"
      }`}
    >
      <h2 className="text-lg font-semibold text-gray-600">
        {isOpenCheckInDate ? "Select check in date" : "Select check out date"}
      </h2>

      <div
        className={`relative ${
          (end || isOpenCheckOutDate) &&
          "flex justify-between items-start gap-6"
        }`}
      >
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
              if (!start || (!isOpenCheckOutDate && start && end)) {
                setSelectedRange({ start: date, end: null });
              } else if (!isOpenCheckOutDate && start && !end) {
                setSelectedRange({ start: date, end: null });
                setIsOpenCheckInDate && setIsOpenCheckInDate(false);
              } else if (isOpenCheckOutDate && start && end) {
                setSelectedRange({ ...selectedRange, end: date });
                setIsOpenCheckOutDate && setIsOpenCheckOutDate(false);
              } else if (isOpenCheckOutDate && date > start) {
                setSelectedRange({ ...selectedRange, end: date });
                setIsOpenCheckOutDate && setIsOpenCheckOutDate(false);
              } else {
                setSelectedRange({ start: date, end: null });
              }
            }}
            isOpenCheckOutDate={isOpenCheckOutDate}
            isOpenCheckInDate={isOpenCheckInDate}
          />
        </div>

        {/* =====Second Month===== */}

        <div className="w-full">
          <div className="absolute right-3 -top-0 flex justify-between hover:bg-sky hover:text-background transition-all rounded-full">
            <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
              <ChevronRight size={18} className="cursor-pointer" />
            </button>
          </div>
          {(end || isOpenCheckOutDate) && (
            <CalenderMonth
              baseDate={addMonths(currentDate, 1)}
              selectedRange={selectedRange}
              onDateClick={(date) => {
                if (!start || (!isOpenCheckOutDate && start && end)) {
                  setSelectedRange({ start: date, end: null });
                } else if (!isOpenCheckOutDate && start && !end) {
                  setSelectedRange({ start: date, end: null });
                  setIsOpenCheckInDate && setIsOpenCheckInDate(false);
                } else if (isOpenCheckOutDate && start && end) {
                  setSelectedRange({ ...selectedRange, end: date });
                  setIsOpenCheckOutDate && setIsOpenCheckOutDate(false);
                } else if (isOpenCheckOutDate && date > start) {
                  setSelectedRange({ ...selectedRange, end: date });
                  setIsOpenCheckOutDate && setIsOpenCheckOutDate(false);
                } else {
                  setSelectedRange({ start: date, end: null });
                }
              }}
              isOpenCheckOutDate={isOpenCheckOutDate}
              isOpenCheckInDate={isOpenCheckInDate}
            />
          )}
        </div>
      </div>

      <strong className="mt-20">{totalDays} Night</strong>
    </div>
  );
};

export default Calender;
