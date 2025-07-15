"use client";
import React, { useEffect, useRef, useState } from "react";
import DashboardHeader from "../_component/DashboardHeader";
import DashboardCard from "@/components/ui/dashboardCard";
import { Banknote, CalendarCheck, ListFilter } from "lucide-react";
import { useBookings } from "@/hooks/bookingsQueries";
import { getTodaysBookingStats } from "@/utils/bookingStatus";
import BookingListTable from "./_components/BookingListTable";
import { SearchField } from "@/components/ui/searchField";
import Button from "@/components/ui/button";

const BookingList = () => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [openFilterPopover, setOpenFilterPopover] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string | "">("BOOKED");
  const { data, isLoading, error } = useBookings();

  const bookingStatus = data ? getTodaysBookingStats(data) : null;

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-3">
        <DashboardCard
          title="Total Booked"
          value={bookingStatus?.totalBooking ?? 0}
          change={2}
          period="from last month"
          icon={<CalendarCheck />}
        />

        <DashboardCard
          title="Today's Booked"
          value={bookingStatus?.todaysBookedLength ?? 0}
          change={1}
          period="from last month"
          icon={<CalendarCheck />}
        />

        <DashboardCard
          title="Today's Income"
          value={bookingStatus?.todaysTotalPrice ?? 0}
          change={4}
          period="from last month"
          icon={<Banknote />}
        />

        <DashboardCard
          title="Total Income"
          value={bookingStatus?.sumTotalPrice ?? 0}
          change={4}
          period="from last month"
          icon={<Banknote />}
        />
      </div>
      {/* Filter & Search */}
      <div className="relative flex justify-between items-center gap-2 p-3 bg-white shadow-custom-shadow mx-3">
        <div className="">
          <SearchField
            className="max-w-lg mx-auto"
            placeholder="Search Ref No"
            onSearch={() => {}}
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          onClick={() => setOpenFilterPopover(true)}
        >
          <ListFilter size={19} />
        </Button>
        {/* =====Popover===== */}
        {openFilterPopover && (
          <div
            ref={popoverRef}
            className="absolute top-full mt-2 right-0 bg-white rounded shadow-lg min-w-[200px] z-10"
          >
            <div className="flex flex-col border-b border-custom-border py-2 px-3">
              <strong>Filter Booking Status</strong>
            </div>
            <div
              className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setFilterText("BOOKED");
                setOpenFilterPopover(false);
              }}
            >
              <p className="text-base m-0">BOOKED</p>
            </div>
            <div
              className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setFilterText("CHECKED_IN");
                setOpenFilterPopover(false);
              }}
            >
              <p className="text-base m-0">CHECKED IN</p>
            </div>
            <div
              className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setFilterText("CHECKED_OUT");
                setOpenFilterPopover(false);
              }}
            >
              <p className="text-base m-0">CHECKED OUT</p>
            </div>
            <div
              className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setFilterText("CANCELLED");
                setOpenFilterPopover(false);
              }}
            >
              <p className="text-base m-0">CANCELLED</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-3">
        {/* User Table */}
        {error && !isLoading ? (
          <div className="h-24 pt-2 mt-4 rounded-sm bg-red-50 px-4 text-red-600 justify-center items-center">
            <p>Failed to Users: {error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 rounded bg-red-100 px-3 py-1 text-red-700 hover:bg-red-200"
            >
              Retry
            </button>
          </div>
        ) : (
          <BookingListTable
            bookings={data?.bookings ?? []}
            loading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default BookingList;
