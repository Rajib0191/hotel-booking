"use client";
import Calender from "@/components/calender/Calender";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { getTotalDays } from "@/libs/data";
import { formatWithDateFns } from "@/libs/dateFormat";
import { addDays } from "date-fns";
import { Search } from "lucide-react";
import React, { useState } from "react";

type DateRange = { start: Date | null; end: Date | null };

const HomeScreen = () => {
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    start: new Date(),
    end: addDays(new Date(), 1),
  });

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

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
        <div className="fixed left-1/2 transform -translate-x-1/2 -translate-y-16 bg-background text-foreground shadow-custom-shadow py-1.5 px-20 rounded z-50">
          <strong>Search Available Room</strong>
        </div>
        {/* =====Form Container===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className="flex justify-center items-start flex-col border border-custom-border hover:border-pink cursor-pointer active:border-amber-400 transition-all rounded-sm px-3"
            onClick={toggleModal}
          >
            <small>CHECK IN</small>
            <strong>{formatWithDateFns(new Date()).formatted}</strong>
            <small>{formatWithDateFns(new Date()).day}</small>
          </div>
          <div
            className="flex justify-center items-start flex-col border border-custom-border hover:border-pink cursor-pointer active:border-amber-400 transition-all rounded-sm px-3"
            onClick={toggleModal}
          >
            <small>CHECK OUT</small>
            <strong>{formatWithDateFns(new Date()).formatted}</strong>
            <small>{formatWithDateFns(new Date()).day}</small>
          </div>
          <div className="border border-custom-border cursor-pointer hover:border-pink active:border-amber-400 transition-all rounded-sm px-3">
            <small>ROOM TYPE</small>
          </div>
        </div>
        {/* =====Button===== */}
        <div className="fixed left-1/2 transform -translate-x-1/2 translate-y-5 shadow-custom-shadow rounded">
          <Button
            title="Search"
            className="bg-amber-400 text-foreground font-bold hover:bg-amber-500 px-10"
            icon={<Search size={20} />}
          />
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <Modal
          children={
            <Calender
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
              totalDays={getTotalDays(selectedRange.start, selectedRange.end)}
            />
          }
        />
      )}
    </div>
  );
};

export default HomeScreen;
