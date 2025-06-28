"use client";
import React, { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { ColumnDef, DashboardTable } from "@/components/ui/dashboardTable";
import { User } from "@/types/user";
import { ConfirmationModal } from "@/components/ui/confirmationModal";
import { useDeleteUser } from "@/hooks/useDeleteUser";

interface UserTableProps {
  users: User[];
  loading?: boolean;
}

export const UserTable: React.FC<UserTableProps> = ({ users, loading }) => {
  const [selectedRow, setSelectedRow] = useState<User>();
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const handleClick = (row: User) => {
    // console.log(row);
    setOpenConfirmModal(true);
    setSelectedRow(row);
  };

  const columns: ColumnDef<User>[] = [
    {
      header: "User ID",
      accessor: "id",
      width: "10%",
    },
    {
      header: "Role",
      accessor: "role",
      width: "10%",
    },
    {
      header: "Name",
      accessor: (row: User) => `${row.firstName} ${row.lastName}`,
      width: "20%",
    },
    {
      header: "Email",
      accessor: "email",
      width: "20%",
    },
    {
      header: "Phone",
      accessor: "phoneNumber",
      width: "10%",
    },
    {
      header: "Gender",
      accessor: (row: User) => row.profile.gender || "N/A",
      width: "10%",
    },
    {
      header: "Country",
      accessor: (row: User) => row.profile.country || "N/A",
      width: "10%",
    },
    {
      header: "City",
      accessor: (row: User) => row.profile.city || "N/A",
      width: "15%",
    },
    {
      header: "Address",
      accessor: (row: User) => (
        <div className="truncate max-w-[110px] whitespace-nowrap overflow-hidden text-ellipsis">
          {row.profile.address || "N/A"}
        </div>
      ),
      cell: (value: React.ReactNode, row: User) => value,
      width: "15%",
    },
    {
      header: "Actions",
      accessor: (row: User) => (
        <button
          className="bg-red-200 text-red-600 p-1 rounded-sm hover:bg-red-300 cursor-pointer"
          onClick={() => handleClick(row)}
        >
          <Trash size={16} />
        </button>
      ),
      cell: (value: React.ReactNode, row: User) => value,
      width: "5%",
      align: "center",
    },
  ];

  const { mutate: deleteUserTrigger, isPending, isSuccess } = useDeleteUser();
  useEffect(() => {
    if (isSuccess) {
      setOpenConfirmModal(false);
    }
  });

  return (
    <div className="relative">
      <DashboardTable<User>
        data={users}
        columns={columns}
        pageSize={10}
        loading={loading}
      />
      {openConfirmModal && (
        <ConfirmationModal
          title="Are you sure!"
          message={"You want to delete this"}
          isOpen={openConfirmModal}
          onCancel={() => setOpenConfirmModal(false)}
          onConfirm={() => deleteUserTrigger(selectedRow?.id)}
          isLoading={isPending}
        />
      )}
    </div>
  );
};
