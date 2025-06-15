"use client";
import Calender from "@/components/calender/Calender";
import Button from "@/components/common/Button";
import { getTotalDays } from "@/libs/data";
import { formatWithDateFns } from "@/libs/dateFormat";
import { House, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type DateRange = { start: Date | null; end: Date | null };
type Option = {
  value: string;
  label: string;
  persion: number;
};

const HomeScreen = () => {
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    start: new Date(),
    end: null,
  });

  // =====Check In Date Functionality=====
  const [isOpenCheckInDate, setIsOpenCheckInDate] = useState<boolean>(false);
  const checkInDadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        checkInDadeRef.current &&
        !checkInDadeRef.current.contains(event.target as Node)
      ) {
        setIsOpenCheckInDate(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =====Check Out Date Functionality=====
  const [isOpenCheckOutDate, setIsOpenCheckOutDate] = useState<boolean>(false);
  const checkOutDadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        checkOutDadeRef.current &&
        !checkOutDadeRef.current.contains(event.target as Node)
      ) {
        setIsOpenCheckOutDate(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =====Select Room Type Dropdown=====
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option>({
    value: "single",
    persion: 1,
    label: "SINGLE",
  });
  const selectRef = useRef<HTMLDivElement>(null);

  const options: Option[] = [
    { value: "single", label: "SINGLE", persion: 1 },
    { value: "double", label: "DOUBLE", persion: 2 },
    { value: "suite", label: "SUITE", persion: 4 },
  ];

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpenSelect(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpenSelect(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="h-screen bg-no-repeat bg-cover bg-fixed flex justify-center items-center"
      style={{
        backgroundImage: "url('/banner.webp')",
        backgroundPosition: "50% 40%",
      }}
    >
      <div className="relative bg-background container rounded-md pt-[50px] pr-3.5 pb-10 pl-3.5">
        {/* ===== Header Title ===== */}
        <div className="flex justify-center items-center flex-col fixed left-1/2 transform -translate-x-1/2 -translate-y-24 bg-background text-foreground shadow-custom-shadow py-5 px-20 rounded z-50">
          <House />
          <strong>Search Available Room</strong>
        </div>
        {/* =====Form Container===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5">
          {/* =====Check In===== */}
          <div className="relative" ref={checkInDadeRef}>
            <div
              className={`flex flex-col justify-start items-start border ${
                isOpenSelect ? "border-amber-400" : "border-gray-300"
              } cursor-pointer hover:border-pink transition-all rounded-sm px-3 py-2`}
              onClick={() => setIsOpenCheckInDate(!isOpenSelect)}
            >
              <small>CHECK IN</small>
              <strong>
                {formatWithDateFns(selectedRange?.start).formatted}
              </strong>
              <small>{formatWithDateFns(selectedRange?.start).day}</small>
            </div>
            {/* =====Calender Open===== */}
            {isOpenCheckInDate && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-sm shadow-lg z-10">
                <Calender
                  selectedRange={selectedRange}
                  setSelectedRange={setSelectedRange}
                  totalDays={getTotalDays(
                    selectedRange.start,
                    selectedRange.end
                  )}
                  isOpenCheckInDate={isOpenCheckInDate}
                  setIsOpenCheckInDate={setIsOpenCheckInDate}
                />
              </div>
            )}
          </div>

          {/* =====Check Out===== */}
          <div className="relative" ref={checkOutDadeRef}>
            <div
              className={`flex flex-col justify-start items-start border ${
                isOpenCheckOutDate ? "border-amber-400" : "border-gray-300"
              } cursor-pointer hover:border-pink transition-all rounded-sm px-3 py-2`}
              onClick={() => setIsOpenCheckOutDate(!isOpenCheckOutDate)}
            >
              <small>CHECK OUT</small>
              <strong>{formatWithDateFns(selectedRange?.end).formatted}</strong>
              <small>{formatWithDateFns(selectedRange?.end).day}</small>
            </div>
            {/* =====Calender Open===== */}
            {isOpenCheckOutDate && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-sm shadow-lg z-10">
                <Calender
                  selectedRange={selectedRange}
                  setSelectedRange={setSelectedRange}
                  totalDays={getTotalDays(
                    selectedRange.start,
                    selectedRange.end
                  )}
                  isOpenCheckOutDate={isOpenCheckOutDate}
                  setIsOpenCheckOutDate={setIsOpenCheckOutDate}
                />
              </div>
            )}
          </div>

          {/* =====Select Dropdown===== */}
          <div className="relative w-full" ref={selectRef}>
            <div
              className={`flex flex-col justify-start items-start border ${
                isOpenSelect ? "border-amber-400" : "border-gray-300"
              } cursor-pointer hover:border-pink transition-all rounded-sm px-3 py-2`}
              onClick={() => setIsOpenSelect(!isOpenSelect)}
            >
              <small className="text-gray-500">SELECT ROOM TYPE</small>
              <strong>{selectedOption.label}</strong>
              <small>{selectedOption?.persion}</small>
            </div>

            {/* Dropdown Options */}
            {isOpenSelect && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-sm shadow-lg z-10">
                {options.map((option) => (
                  <div
                    key={option.value}
                    className={`px-3 py-1 hover:bg-gray-100 cursor-pointer rounded-sm ${
                      selectedOption.value === option.value
                        ? "bg-amber-50 text-amber-600"
                        : ""
                    }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    <div className="flex flex-col">
                      <p>{option.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* =====Button===== */}
        <div className="fixed left-1/2 transform -translate-x-1/2 translate-y-4 shadow-custom-shadow rounded">
          <Button
            title="Search"
            className="bg-amber-400 text-foreground font-bold hover:bg-amber-500 px-10 py-3"
            icon={<Search size={20} />}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
