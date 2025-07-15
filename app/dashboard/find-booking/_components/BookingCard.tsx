"use client";

import { IMAGE_PATH } from "@/services/apiService";
import { BookingApiResponse } from "@/types/find-booking";
import { format } from "date-fns";

const BookingCard = ({ data }: { data: BookingApiResponse }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "CHECKED_IN":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-custom-shadow overflow-hidden">
      {/* Card Header */}
      <div className="bg-indigo-600 p-4 text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Booking #{data?.booking?.id}</h2>
          <span className="text-sm opacity-90">
            {format(data?.booking?.createdAt, "d MMMM yyyy")}
          </span>
        </div>
        <p className="text-indigo-100 mt-1">
          Reference:{" "}
          <span className="font-mono">{data?.booking?.bookingReference}</span>
        </p>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* User Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Guest Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 font-semibold">Name</p>
              <p className="">
                {data?.booking?.user.firstName} {data?.booking?.user.lastName}
              </p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Contact</p>
              <p className="">{data?.booking?.user.email}</p>
              <p className="">{data?.booking?.user.phoneNumber}</p>
            </div>
          </div>
        </div>
        {/* Room Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Room Details
          </h3>
          <div className="flex flex-col md:flex-row gap-6">
            {data?.booking?.room.imageUrl && (
              <div className="w-full md:w-1/3">
                <img
                  src={IMAGE_PATH + "/" + data?.booking?.room.imageUrl}
                  alt={`Room ${data?.booking?.room.roomNumber}`}
                  className="rounded-lg object-cover h-32 w-full"
                />
              </div>
            )}
            <div className="w-full md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 font-semibold">Room Number</p>
                  <p className="">{data?.booking?.room.roomNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Type</p>
                  <p className=" capitalize">
                    {data?.booking?.room.type.toLowerCase()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Capacity</p>
                  <p className="">{data?.booking?.room.capacity} persons</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Price/Night</p>
                  <p className="">
                    ${data?.booking?.room.pricePerNight.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Booking Dates */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Stay Period
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 font-semibold">Check-In</p>
              <p className="">
                {new Date(data?.booking?.checkInDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Check-Out</p>
              <p className="">
                {new Date(data?.booking?.checkOutDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <p className="mt-2 text-gray-600 font-semibold">
            Duration:{" "}
            {Math.ceil(
              (new Date(data?.booking?.checkOutDate).getTime() -
                new Date(data?.booking?.checkInDate).getTime()) /
                (1000 * 60 * 60 * 24)
            )}{" "}
            nights
          </p>
        </div>
        {/* Status & Payment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-semibold">Booking Status</p>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                data?.booking?.bookingStatus
              )}`}
            >
              {data?.booking?.bookingStatus.replace("_", " ")}
            </span>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Payment Status</p>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                data?.booking?.paymentStatus === "PAID"
                  ? "bg-green-400 text-green-800"
                  : "bg-amber-400 text-yellow-800"
              }`}
            >
              {data?.booking?.paymentStatus}
            </span>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Total Price</p>
            <p className="font-bold text-xl">
              ${data?.booking?.totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
