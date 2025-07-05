"use client";

import React, { useState } from "react";
import Select from "@/components/ui/select";

const options = [
  { value: "ALL", label: "All" },
  { value: "SINGLE", label: "Single" },
  { value: "DOUBLE", label: "Double" },
  { value: "TRIPLE", label: "Tripple" },
  { value: "SUITE", label: "Suite" },
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
