"use client";
import React, { useState } from "react";
import { Booking } from "@/types/booking";
import { ColumnDef, DashboardTable } from "@/components/ui/dashboardTable";
import { getTotalDays } from "@/libs/data";
import { SquarePen } from "lucide-react";
import { format, parseISO } from "date-fns";
import Modal from "@/components/ui/modal";
import UpdateBookingForm from "./UpdateBookingForm";

interface BookingTableProps {
  bookings: Booking[];
  loading?: boolean;
}

const BookingListTable: React.FC<BookingTableProps> = ({
  bookings,
  loading,
}) => {
  const [selectedRow, setSelectedRow] = useState<Booking>();
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const handleUpdateModal = (row: Booking) => {
    setOpenEditModal(true);
    setSelectedRow(row);
  };

  const columns: ColumnDef<Booking>[] = [
    {
      header: "Booking Id",
      accessor: "id",
      width: "5%",
    },
    {
      header: "ref",
      accessor: (row: Booking) => (
        <div className="bg-[#309898] rounded-xs text-center px-1 text-white text-xs">
          {row.bookingReference}
        </div>
      ),
      width: "5%",
      cell: (value: React.ReactNode, row: Booking) => value,
    },
    {
      header: "Booking Date",
      accessor: (row: Booking) => (
        <div className="bg-[#309898] rounded-xs text-center px-1 text-white text-xs">
          {format(parseISO(row.createdAt), "do-MMMM-yyyy")}
        </div>
      ),
      width: "7%",
      cell: (value: React.ReactNode, row: Booking) => value,
    },
    {
      header: "Room No",
      accessor: (row: Booking) => `${row.room.roomNumber}`,
      width: "10%",
    },
    {
      header: "Room Type",
      accessor: (row: Booking) => `${row.room.type}`,
      width: "10%",
    },
    {
      header: "Check-in Date",
      accessor: (row: Booking) =>
        `${format(parseISO(row.checkInDate), "do-MMMM-yyyy")}`,
      width: "10%",
      cell: (value: React.ReactNode, row: Booking) => value,
    },
    {
      header: "Check-out Date",
      accessor: (row: Booking) => (
        <div
          className={`${
            // isDateGreaterOrEqual(row.checkOutDate)
            row.bookingStatus === "CANCELLED"
              ? "bg-red-800"
              : row.bookingStatus === "CHECKED_IN"
              ? "bg-green-400"
              : row.bookingStatus === "BOOKED"
              ? "bg-amber-400"
              : "bg-blue-600"
          } rounded-xs text-xs text-center font-semibold ${
            row.bookingStatus === "CANCELLED"
              ? "text-background"
              : row.bookingStatus === "BOOKED"
              ? "text-foreground"
              : row.bookingStatus === "CHECKED_IN"
              ? "text-foreground"
              : "text-background"
          }`}
        >
          {format(parseISO(row.checkOutDate), "do-MMMM-yyyy")}
        </div>
      ),
      width: "10%",
      cell: (value: React.ReactNode, row: Booking) => value,
    },
    {
      header: "Total Days",
      accessor: (row: Booking) =>
        getTotalDays(new Date(row.checkInDate), new Date(row.checkOutDate)),
      width: "10%",
    },
    {
      header: "Price",
      accessor: (row: Booking) => row.totalPrice,
      width: "10%",
    },
    {
      header: "Username",
      accessor: (row: Booking) => row.user.firstName + " " + row.user.lastName,
      width: "10%",
    },
    {
      header: "Phone",
      accessor: (row: Booking) => row.user.phoneNumber,
      width: "10%",
    },
    {
      header: "Booking Status",
      accessor: (row: Booking) => (
        <div
          className={`${
            row.bookingStatus === "CANCELLED"
              ? "bg-red-800"
              : row.bookingStatus === "BOOKED"
              ? "bg-amber-400"
              : row.bookingStatus === "CHECKED_IN"
              ? "bg-green-400"
              : "bg-blue-600"
          } text-xs rounded-xs text-center px-1 font-semibold ${
            row.bookingStatus === "CANCELLED"
              ? "text-background"
              : row.bookingStatus === "BOOKED"
              ? "text-foreground"
              : row.bookingStatus === "CHECKED_IN"
              ? "text-foreground"
              : "text-background"
          }`}
        >
          {row.bookingStatus}
        </div>
      ),
      width: "10%",
      cell: (value: React.ReactNode, row: Booking) => value,
    },
    {
      header: "Payment Status",
      accessor: (row: Booking) => (
        <div
          className={`${
            row.paymentStatus === "PENDING" ? "bg-amber-400" : "text-green-500"
          } text-xs rounded-xs text-center font-semibold`}
        >
          {row.paymentStatus}
        </div>
      ),
      width: "10%",
      cell: (value: React.ReactNode, row: Booking) => value,
    },
    {
      header: "Actions",
      accessor: (row: Booking) => (
        <>
          <button
            className="bg-blue-100 text-blue-600 p-1 rounded-sm hover:bg-blue-200 cursor-pointer mr-1"
            onClick={() => handleUpdateModal(row)}
          >
            <SquarePen size={16} />
          </button>
          {/* <button
            className="bg-blue-100 text-blue-600 p-1 rounded-sm hover:bg-blue-200 cursor-pointer"
            onClick={() => handleViewModal(row)}
          >
            <Eye size={16} />
          </button> */}
        </>
      ),
      cell: (value: React.ReactNode, row: Booking) => value,
      width: "10%",
      align: "center",
    },
  ];

  return (
    <div className="relative">
      <DashboardTable<Booking>
        data={bookings}
        columns={columns}
        pageSize={10}
        loading={loading}
      />
      {openEditModal && (
        <Modal
          title={`Update Booking Status for ${selectedRow?.bookingReference}`}
          isOpen={openEditModal}
          onClose={() => setOpenEditModal(false)}
          children={
            <UpdateBookingForm
              selected={selectedRow}
              onClose={() => setOpenEditModal(false)}
            />
          }
        />
      )}
    </div>
  );
};

export default BookingListTable;
