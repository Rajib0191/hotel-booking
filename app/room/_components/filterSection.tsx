"use client";

import React, { useState } from "react";
import Select from "@/components/ui/select";

const options = [
  { value: "all", label: "All" },
  { value: "single", label: "Single" },
  { value: "double", label: "Double" },
  { value: "triple", label: "Tripple" },
  { value: "suite", label: "Suit" },
];

const FilterSection = () => {
  const [roomType, setRoomType] = useState<string>();

  return (
    <div className="bg-white mt-4 rounded-sm p-4 shadow-custom-shadow">
      <Select
        label="Filter by room type"
        options={options}
        value={roomType}
        onChange={setRoomType}
        defaultToUS={true}
      />
    </div>
  );
};

export default FilterSection;
