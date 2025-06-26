"use client";
import React from "react";
import { Edit } from "lucide-react";
import { useUser } from "@/context/UserContext";

const UserField = ({
  field,
  handleEditClick,
}: {
  field: any;
  handleEditClick: any;
}) => {
  const { user } = useUser();
  return (
    <div className="group relative">
      <div className="flex items-center">
        <label className="block text-base font-black text-gray-500">
          {field.label}
        </label>
        {field.label !== "Email" && field.label !== "Phone Number" && (
          <button
            onClick={() => handleEditClick(field.key, field.value || "")}
            className="ml-2 text-gray-400 hover:text-blue-500 transition-colors cursor-pointer"
          >
            {(field.value || user?.profile) && <Edit className="h-4 w-4" />}
          </button>
        )}
      </div>
      <p className="">{!field.value ? "N/A" : field.value}</p>
    </div>
  );
};

export default UserField;
