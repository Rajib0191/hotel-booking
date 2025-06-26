"use client";
import React, { useEffect, useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { useUserUpdate } from "@/hooks/useUserUpdate";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";

type UserData = {
  firstName: string;
  lastName: string;
};

const EditingModal = ({
  FIELDS,
  editValue,
  editingField,
  setEditingField,
}: {
  FIELDS: any;
  editValue: string;
  editingField: string;
  setEditingField: any;
}) => {
  const { user } = useUser();

  const [userData, setUserData] = useState<UserData | any>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    occupation: "",
    gender: "",
  });

  useEffect(() => {
    if (editValue) {
      setUserData({
        ...userData,
        [editingField]: editValue,
      });
    }
  }, [editValue]);

  const handleEditableValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [editingField]: e.target.value,
    });
  };

  const { mutate: updateUserData, isPending } = useUserUpdate();
  const { mutate: updateUserProfile, isPending: profileLoading } =
    useUpdateProfile();

  const handleSave = () => {
    if (editingField && user && userData) {
      const payload: Record<string, string> = {};
      const profileData = new FormData();

      if (userData.firstName) payload.firstName = userData.firstName;
      if (userData.lastName) payload.lastName = userData.lastName;

      if (userData.address) profileData.append("address", userData.address);
      if (userData.city) profileData.append("city", userData.city);
      if (userData.country) profileData.append("country", userData.country);
      if (userData.occupation)
        profileData.append("occupation", userData.occupation);
      if (userData.gender) profileData.append("gender", userData.gender);

      if (Object.keys(payload).length > 0) {
        updateUserData({ payload });
      } else {
        updateUserProfile({ payload: profileData, profileId: user.profile.id });
      }
    }
    setEditingField(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent">
      <div className="bg-white shadow-modal-shadow rounded-md p-6 w-full max-w-md z-50">
        <h2 className="text-xl font-semibold mb-2">
          Update {FIELDS.find((f: any) => f.key === editingField)?.label}
        </h2>
        <Input
          type="text"
          name={!editValue ? "" : editValue}
          value={userData[editingField]}
          onChange={handleEditableValue}
        />

        {/* Button Section */}
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-sm cursor-pointer"
            onClick={() => setEditingField(null)}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-sm cursor-pointer"
            onClick={handleSave}
            isLoading={isPending || profileLoading}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditingModal;
