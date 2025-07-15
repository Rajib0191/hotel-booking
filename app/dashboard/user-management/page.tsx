"use client";
import React, { useState } from "react";
import DashboardHeader from "../_component/DashboardHeader";
import DashboardCard from "@/components/ui/dashboardCard";
import { Users } from "lucide-react";
import { UserTable } from "./_component/UserTable";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/ui/button";
import { fetchUsers } from "@/controller/userController";
import Modal from "@/components/ui/modal";
import AdminForm from "./_component/AdminForm";

const UserManagement = () => {
  const [openAdminModal, setOpenAdminModal] = useState(false);

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === "ADMIN").length;
  const totalCustomers = users.filter((u) => u.role === "CUSTOMER").length;

  const userChange = 7.42;
  const adminChange = -2.31;
  const customerChange = 5.31;

  return (
    <div>
      <DashboardHeader />
      {/* User Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-3">
        <DashboardCard
          title="Total Users"
          value={totalUsers}
          change={userChange}
          period="from last month"
          icon={<Users />}
        />

        <DashboardCard
          title="Total Customers"
          value={totalCustomers}
          change={customerChange}
          period="from last month"
          icon={<Users />}
        />

        <DashboardCard
          title="Total Admins"
          value={totalAdmins}
          change={adminChange}
          period="from last month"
          icon={<Users />}
        />
      </div>

      <div className="p-3">
        {/* Create Admin Button */}
        <div className="flex justify-start items-center mb-2">
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={() => setOpenAdminModal(true)}
          >
            Create Admin
          </Button>
        </div>

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
          <UserTable users={users} loading={isLoading} />
        )}
        {/* Another Functionality */}
        <div></div>
      </div>

      {openAdminModal && (
        <Modal
          isOpen={openAdminModal}
          onClose={() => setOpenAdminModal(false)}
          title="Create New Admin"
          width="md"
          children={<AdminForm handleClose={() => setOpenAdminModal(false)} />}
        />
      )}
    </div>
  );
};

export default UserManagement;
