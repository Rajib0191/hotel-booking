"use client";
import { ConfirmationModal } from "@/components/ui/confirmationModal";
import { ColumnDef, DashboardTable } from "@/components/ui/dashboardTable";
import Modal from "@/components/ui/modal";
import { useDeleteRoom } from "@/hooks/roomQueries";
import { IMAGE_PATH } from "@/services/apiService";
import { Room } from "@/types/room";
import { SquarePen, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import RoomForm from "./RoomForm";

interface RoomTableProps {
  rooms: Room[];
  loading?: boolean;
}

const RoomTable: React.FC<RoomTableProps> = ({ rooms, loading }) => {
  const [selectedRow, setSelectedRow] = useState<Room>();
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

  const handleUpdateModal = (row: Room) => {
    setOpenUpdateModal(true);
    setSelectedRow(row);
  };

  const { mutate: deleteRoomTrigger, isPending, isSuccess } = useDeleteRoom();
  useEffect(() => {
    if (isSuccess) {
      setOpenConfirmModal(false);
    }
  });

  const handleDeleteModal = (row: Room) => {
    console.log(row);
    setOpenConfirmModal(true);
    setSelectedRow(row);
  };

  const columns: ColumnDef<Room>[] = [
    {
      header: "Room ID",
      accessor: "id",
      width: "10%",
    },
    {
      header: "Image",
      accessor: (row: Room) => (
        <div className="relative border border-custom-border rounded-full w-8 h-8 flex items-center justify-center">
          <img
            src={IMAGE_PATH + "/" + row.imageUrl}
            alt={`Room ${row.roomNumber}`}
            className="object-cover w-full h-full rounded-full"
          />
        </div>
      ),
      cell: (value: React.ReactNode, row: Room) => value,
      width: "10%",
    },
    {
      header: "Room No",
      accessor: "roomNumber",
      width: "10%",
    },
    {
      header: "Room Type",
      accessor: "type",
      width: "20%",
    },
    {
      header: "Price",
      accessor: (row: Room) => (
        <>
          <p>{row?.pricePerNight}&#2547;</p>
        </>
      ),
      cell: (value: React.ReactNode, row: Room) => value,
      width: "20%",
    },
    {
      header: "Capacity",
      accessor: "capacity",
      width: "10%",
    },
    {
      header: "Description",
      accessor: "description",
      width: "10%",
    },
    {
      header: "Actions",
      accessor: (row: Room) => (
        <>
          <button
            className="bg-blue-100 text-blue-600 p-1 rounded-sm hover:bg-blue-200 cursor-pointer mr-1"
            onClick={() => handleUpdateModal(row)}
          >
            <SquarePen size={16} />
          </button>
          <button
            className="bg-red-200 text-red-600 p-1 rounded-sm hover:bg-red-300 cursor-pointer"
            onClick={() => handleDeleteModal(row)}
          >
            <Trash size={16} />
          </button>
        </>
      ),
      cell: (value: React.ReactNode, row: Room) => value,
      width: "5%",
      align: "center",
    },
  ];

  return (
    <div className="relative">
      <DashboardTable<Room>
        data={rooms}
        columns={columns}
        pageSize={10}
        loading={loading}
      />
      {openUpdateModal && (
        <Modal
          isOpen={openUpdateModal}
          onClose={() => setOpenUpdateModal(false)}
          children={
            <RoomForm
              handleClose={() => setOpenUpdateModal(false)}
              room={selectedRow}
            />
          }
          title="Update Room"
          width="lg"
        />
      )}

      {openConfirmModal && (
        <ConfirmationModal
          isOpen={openConfirmModal}
          title="Are you sure!"
          message={"You want to delete this"}
          onCancel={() => setOpenConfirmModal(false)}
          onConfirm={() => {
            if (!selectedRow) {
              return;
            }
            deleteRoomTrigger(selectedRow.id);
          }}
        />
      )}
    </div>
  );
};

export default RoomTable;
