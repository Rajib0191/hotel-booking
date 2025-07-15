import React from "react";
import { useSearchParams } from "next/navigation";
import { useAvailableRooms } from "@/controller/useAvailableRooms";
import Card from "@/components/ui/card";
import CardSkeleton from "@/components/ui/cardSkeleton";

const Rooms = () => {
  const params = useSearchParams();

  const {
    data: rooms,
    isLoading,
    error,
  } = useAvailableRooms({
    checkInDate: params.get("checkin") || "",
    checkOutDate: params.get("checkout") || "",
    roomType: params.get("room_type") || "",
  });

  if (isLoading)
    return (
      <div className="mt-4 grid grid-cols-1 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );

  if (error) {
    return (
      <div className="h-24 py-[53px] mt-4 rounded-sm bg-red-50 px-4 text-red-600 justify-center items-center">
        <p>Failed to load rooms: {error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 rounded bg-red-100 px-3 py-1 text-red-700 hover:bg-red-200"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!rooms?.length) {
    return (
      <div className="h-24 py-[53px] mt-4 rounded-sm bg-green-50 px-4 flex justify-center items-center">
        <p>No rooms available</p>
      </div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-1 gap-4">
      {rooms.map((room) => (
        <Card
          key={room.id}
          item={room}
          checkInDate={params.get("checkin") || ""}
          checkOutDate={params.get("checkout") || ""}
        />
      ))}
    </div>
  );
};

export default Rooms;
