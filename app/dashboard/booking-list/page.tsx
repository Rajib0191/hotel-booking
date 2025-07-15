"use client";
import React from "react";
import DashboardHeader from "../_component/DashboardHeader";
import DashboardCard from "@/components/ui/dashboardCard";
import { Banknote, CalendarCheck } from "lucide-react";
import { useBookings } from "@/hooks/bookingsQueries";
import { getTodaysBookingStats } from "@/utils/bookingStatus";
import BookingListTable from "./_components/BookingListTable";
import { SearchField } from "@/components/ui/searchField";
import Button from "@/components/ui/button";

const BookingList = () => {
  const { data, isLoading, error } = useBookings();

  const bookingStatus = data ? getTodaysBookingStats(data) : null;

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
      <div className="flex justify-between items-center gap-2 px-3">
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
          // onClick={() => setOpenFilterPopover(true)}
        >
          Filter Booking Status
        </Button>
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
