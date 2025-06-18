"use client";

import React from "react";
import Button from "@/components/common/Button";
import SearchForm from "@/components/home/searchForm";
import { House, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchForm } from "@/context/SearchFormContext";
import { getTotalDays } from "@/libs/data";
import Navbar from "@/components/common/Navbar";
import { formatDateSafe } from "@/libs/formatDate";

const HomeScreen = () => {
  const router = useRouter();
  const { selectedRange, selectedOption } = useSearchForm();

  return (
    <>
      <Navbar />
      <div
        className="h-screen bg-no-repeat bg-cover bg-fixed flex justify-center items-center "
        style={{
          backgroundImage: "url('/banner.webp')",
          backgroundPosition: "50% 40%",
        }}
      >
        <div className="relative bg-white container rounded-md pt-[50px] pr-3.5 pb-10 pl-3.5">
          {/* ===== Header Title ===== */}
          <div className="flex justify-center items-center flex-col fixed left-1/2 transform -translate-x-1/2 -translate-y-24 bg-white text-foreground shadow-custom-shadow py-5 px-20 rounded z-50">
            <House />
            <strong>Search Available Room</strong>
          </div>
          {/* =====Form Container===== */}
          <SearchForm />
          {/* =====Total Night Count===== */}
          <div>
            <strong>
              {getTotalDays(selectedRange.start, selectedRange.end) > 1
                ? `${getTotalDays(
                    selectedRange.start,
                    selectedRange.end
                  )} Night's`
                : `${getTotalDays(
                    selectedRange.start,
                    selectedRange.end
                  )} Night`}
            </strong>
          </div>

          {/* =====Button===== */}
          <div className="fixed left-1/2 transform -translate-x-1/2 translate-y-4 shadow-custom-shadow rounded">
            <Button
              title="Search"
              className="bg-amber-400 text-foreground font-bold hover:bg-amber-500 px-10 py-3"
              icon={<Search size={20} />}
              onClick={() => {
                router.push(
                  `/room?checkin=${formatDateSafe(
                    selectedRange.start
                  )}&checkout=${formatDateSafe(selectedRange.end)}&room_type=${
                    selectedOption?.label || ""
                  }`
                );
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
