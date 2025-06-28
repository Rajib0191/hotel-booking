"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import UploadModal from "./_components/UploadModal";
import EditingModal from "./_components/EditingModal";
import UserField from "./_components/UserField";
import UserProfile from "./_components/UserProfile";
import DashboardHeader from "../_component/DashboardHeader";

type Field = {
  label: string;
  key: string;
  value: string | undefined;
};

export default function Profile() {
  const { user } = useUser();

  const [editingField, setEditingField] = useState<string | undefined>();
  const [editValue, setEditValue] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleEditClick = (field: string, value: string) => {
    setEditingField(field);
    setEditValue(value);
  };

  const FIELDS: Field[] = [
    {
      label: "First Name",
      key: "firstName",
      value: user?.firstName,
    },
    {
      label: "Last Name",
      key: "lastName",
      value: user?.lastName,
    },
    {
      label: "Email",
      key: "email",
      value: user?.email,
    },
    {
      label: "Phone Number",
      key: "phone",
      value: user?.phoneNumber,
    },
    {
      label: "Address",
      key: "address",
      value: user?.profile?.address || "",
    },
    {
      label: "City",
      key: "city",
      value: user?.profile?.city || "",
    },
    {
      label: "Country",
      key: "country",
      value: user?.profile?.country || "",
    },
    {
      label: "Occupation",
      key: "occupation",
      value: user?.profile?.occupation || "",
    },
    {
      label: "Gender",
      key: "gender",
      value: user?.profile?.gender || "",
    },
  ];

  return (
    <div className="max-w-full mx-auto">
      <DashboardHeader />

      <div className="bg-white shadow-navbar-shadow p-6">
        <UserProfile user={user} setShowModal={setShowModal} />

        {/* User Bio */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FIELDS.map((field) => (
              <UserField
                key={field.key}
                field={field}
                handleEditClick={handleEditClick}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Edit User Data Modal */}
      {editingField && (
        <EditingModal
          FIELDS={FIELDS}
          editValue={editValue}
          editingField={editingField}
          setEditingField={setEditingField}
        />
      )}

      {/* Upload Profile Modal */}
      {showModal && <UploadModal setShowModal={setShowModal} />}
    </div>
  );
}
