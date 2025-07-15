"use client";

import React, { useEffect, useRef, useState } from "react";
import DashboardHeader from "../_component/DashboardHeader";
import Button from "@/components/ui/button";
import RoomTable from "./_component/RoomTable";
import Modal from "@/components/ui/modal";
import RoomForm from "./_component/RoomForm";
import { useGetAllRooms, useGetSearchRooms } from "@/hooks/roomQueries";
import { ListFilter, X } from "lucide-react";
import { SearchField } from "@/components/ui/searchField";

const RoomManagement = () => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [openFilterPopover, setOpenFilterPopover] = useState<boolean>(false);
  const [filterList, setFilterList] = useState<string>("");
  const [openRoomModal, setOpenRoomModal] = useState<boolean>(false);

  const {
    data: response = { rooms: [] },
    isError,
    isLoading,
  } = useGetAllRooms();
  const rooms = response.rooms;

  const {
    data: filterResponse = { rooms: [] },
    isLoading: filterLoading,
    isError: filterError,
  } = useGetSearchRooms(filterList);
  const filterRooms = filterResponse.rooms;

  const handleSearch = async (query: string) => {
    if (query) {
      // Do Something
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpenFilterPopover(false);
      }
    };

    // Add when popover is open
    if (openFilterPopover) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openFilterPopover]);

  return (
    <div className="relative">
      <DashboardHeader />
      <div className="p-3">
        <>
          <div className="relative flex justify-between items-center mb-1">
            {/* Filter & Search */}
            <div className="flex justify-center items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
                onClick={() => setOpenFilterPopover(true)}
              >
                <ListFilter size={19} />
              </Button>
              <div className="">
                <SearchField
                  className="max-w-lg mx-auto"
                  placeholder="Search Room No"
                  onSearch={handleSearch}
                />
              </div>
            </div>
            {/* Create Room Button */}
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => setOpenRoomModal(true)}
            >
              Create Room
            </Button>

            {/* =====Popover===== */}
            {openFilterPopover && (
              <div
                ref={popoverRef}
                className="absolute top-full mt-2 left-0 bg-white rounded shadow-lg min-w-[200px] z-10"
              >
                <div className="flex flex-col border-b border-custom-border py-2 px-3">
                  <strong>Filter Room</strong>
                </div>
                <div
                  className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setFilterList("single");
                    setOpenFilterPopover(false);
                  }}
                >
                  <p className="text-base m-0">Single</p>
                </div>
                <div
                  className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setFilterList("double");
                    setOpenFilterPopover(false);
                  }}
                >
                  <p className="text-base m-0">Double</p>
                </div>
                <div
                  className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setFilterList("triple");
                    setOpenFilterPopover(false);
                  }}
                >
                  <p className="text-base m-0">Triple</p>
                </div>
                <div
                  className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setFilterList("suite");
                    setOpenFilterPopover(false);
                  }}
                >
                  <p className="text-base m-0">Suite</p>
                </div>
              </div>
            )}
          </div>
          {/* Filter List */}
          {filterList && (
            <div className="mb-1 flex justify-start items-center gap-1">
              <small className="capitalize border border-custom-border py-0.5 px-1 rounded-sm">
                {filterList}
              </small>
              <div
                className="cursor-pointer ml-1"
                onClick={() => setFilterList("")}
              >
                <X size={16} />
              </div>
            </div>
          )}
          {/* Room Table */}
          {(isError || filterError) && (!isLoading || !filterLoading) ? (
            <div className="h-24 pt-2 mt-4 rounded-sm bg-red-50 px-4 text-red-600 justify-center items-center">
              <div>Something went wrong!</div>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 rounded bg-red-100 px-3 py-1 text-red-700 hover:bg-red-200"
              >
                Retry
              </button>
            </div>
          ) : (
            <div>
              <RoomTable
                loading={isLoading || filterLoading}
                rooms={filterList ? filterRooms : rooms}
              />
            </div>
          )}
        </>
      </div>

      {openRoomModal && (
        <Modal
          isOpen={openRoomModal}
          onClose={() => setOpenRoomModal(false)}
          title="Create New Room"
          width="xl"
          children={<RoomForm handleClose={() => setOpenRoomModal(false)} />}
        />
      )}
    </div>
  );
};

export default RoomManagement;
