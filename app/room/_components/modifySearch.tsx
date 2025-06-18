"use client";

import React from "react";
import SearchForm from "@/components/home/searchForm";
import { useRouter } from "next/navigation";
import { formatDateSafe } from "@/libs/formatDate";
import { useSearchForm } from "@/context/SearchFormContext";

const ModifySearch = () => {
  const router = useRouter();
  const { selectedRange, selectedOption } = useSearchForm();

  const handleModifySearch = () => {
    router.push(
      `/room?checkin=${formatDateSafe(
        selectedRange.start
      )}&checkout=${formatDateSafe(selectedRange.end)}&room_type=${
        selectedOption?.label || ""
      }`,
      { scroll: false }
    );
  };

  return (
    <div className="block md:flex justify-center items-center gap-2 shadow-custom-shadow bg-white mt-3 px-2 rounded-sm">
      <div className="w-full">
        <SearchForm />
      </div>
      <div
        className="bg-amber-400 py-4 px-12 rounded-md flex justify-center items-center cursor-pointer"
        onClick={handleModifySearch}
      >
        <strong>
          Modify <br /> Search
        </strong>
      </div>
    </div>
  );
};

export default ModifySearch;
