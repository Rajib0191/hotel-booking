"use client";
import React, { useState } from "react";
import BookingCard from "./_components/BookingCard";
import { useFindBookingByRef } from "@/hooks/bookingsQueries";
import { SearchField } from "@/components/ui/searchField";
import DashboardHeader from "../_component/DashboardHeader";
import BookingCardSkeleton from "./_components/BookingCardSkeleton";

const FindMyBooking = () => {
  const [reference, setReference] = useState<string | "">("");

  const { data, isLoading } = useFindBookingByRef(reference ? reference : "");

  return (
    <div className="relative mx-auto">
      <DashboardHeader />
      <div className="mb-3 p-4">
        <SearchField
          className="max-w-lg mx-auto"
          placeholder="Search Ref No"
          value={reference}
          onSearch={setReference}
        />
      </div>
      {isLoading && <BookingCardSkeleton />}
      {data && <BookingCard data={data} />}
      {!isLoading && !data && (
        <div className="max-w-lg mx-auto p-4">No booking found</div>
      )}
    </div>
  );
};

export default FindMyBooking;
