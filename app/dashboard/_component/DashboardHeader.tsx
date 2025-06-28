"use client";
import React from "react";
import { User } from "lucide-react";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import { IMAGE_PATH } from "@/services/apiService";

const DashboardHeader = () => {
  const { user } = useUser();
  return (
    <div className="bg-white flex justify-between items-center shadow-navbar-shadow p-3.5 mb-1">
      <h1 className="text-2xl font-bold ">{localStorage.getItem("menu")}</h1>
      <div className="flex items-center gap-3">
        <div className="relative overflow-hidden h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
          {user?.profile?.profilePictureUrl ? (
            <Image
              src={`${IMAGE_PATH}/${user?.profile?.profilePictureUrl}`}
              alt="Preview"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          ) : (
            <User className="text-blue-600" size={18} />
          )}
        </div>
        <div>
          <p className="font-bold text-sm">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
