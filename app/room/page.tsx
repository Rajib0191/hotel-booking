"use client";

import React from "react";
import Navbar from "@/components/common/Navbar";
import ModifySearch from "./_components/modifySearch";
import Rooms from "./_components/rooms";
import FilterSection from "./_components/filterSection";

const RoomScreen = () => {
  return (
    <>
      <Navbar bg={"white"} shadow={true} />
      <div className="container pt-16 pr-3.5 pb-10 pl-3.5">
        {/* =====Search Box===== */}
        <ModifySearch />
        {/* =====Room Card===== */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1">
            <FilterSection />
          </div>
          <div className="col-span-2">
            <Rooms />
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomScreen;
