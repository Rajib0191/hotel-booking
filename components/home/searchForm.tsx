"use client";
import React, { useEffect, useRef, useState } from "react";
import { formatWithDateFns } from "@/libs/dateFormat";
import Calender from "../calender/Calender";
import { getTotalDays } from "@/libs/data";
import { useSearchForm } from "@/context/SearchFormContext";

const SearchForm = () => {
  const { selectedRange, setSelectedRange, selectedOption, setSelectedOption } =
    useSearchForm();

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
  const selectRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: "single", label: "SINGLE", person: 1 },
    { value: "double", label: "DOUBLE", person: 2 },
    { value: "triple", label: "TRIPLE", person: 3 },
    { value: "suit", label: "SUIT", person: 4 },
  ];

  const handleOptionClick = (option: typeof selectedOption) => {
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-3">
      {/* =====Check In===== */}
      <div className="relative" ref={checkInDadeRef}>
        <div
          className={`flex flex-col justify-start items-start border ${
            isOpenSelect ? "border-amber-400" : "border-gray-300"
          } cursor-pointer hover:border-pink transition-all rounded-sm px-3 py-2`}
          onClick={() => setIsOpenCheckInDate(!isOpenSelect)}
        >
          <small>CHECK IN</small>
          <strong>{formatWithDateFns(selectedRange?.start).formatted}</strong>
          <small>{formatWithDateFns(selectedRange?.start).day}</small>
        </div>
        {/* =====Calender Open===== */}
        {isOpenCheckInDate && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-sm shadow-lg z-10">
            <Calender
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
              totalDays={getTotalDays(selectedRange.start, selectedRange.end)}
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
              totalDays={getTotalDays(selectedRange.start, selectedRange.end)}
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
          <small>{selectedOption?.person} Person</small>
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
  );
};

export default SearchForm;
