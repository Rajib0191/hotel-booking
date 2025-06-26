"use client";
import React, { useEffect, useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Profile } from "@/types/user";
import { useAddProfileInfo } from "@/hooks/useAddProfileInfo";

const CreateProfileModal = ({
  handleCloseModal,
  userId,
}: {
  handleCloseModal: () => void;
  userId: number | any;
}) => {
  const [userProfile, setUserProfile] = useState<Profile | any>({
    address: "",
    city: "",
    country: "",
    occupation: "",
    gender: "",
  });

  const handleEditableValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserProfile({
      ...userProfile,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate: addProfile, isPending, isSuccess } = useAddProfileInfo();

  const handleSave = () => {
    const profileData = new FormData();

    if (userProfile.address) profileData.append("address", userProfile.address);
    if (userProfile.city) profileData.append("city", userProfile.city);
    if (userProfile.country) profileData.append("country", userProfile.country);
    if (userProfile.occupation)
      profileData.append("occupation", userProfile.occupation);
    if (userProfile.gender) {
      profileData.append("gender", userProfile.gender);
    }
    addProfile({ payload: profileData, userId: userId });
  };

  useEffect(() => {
    if (isSuccess) {
      handleCloseModal();
    }
  }, [isSuccess]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent">
      <div className="bg-white shadow-modal-shadow rounded-md p-6 w-full max-w-md z-50">
        <Input
          type="text"
          name={"address"}
          label="Address"
          value={userProfile?.address}
          onChange={handleEditableValue}
        />
        <Input
          type="text"
          name={"city"}
          label="City"
          value={userProfile?.city}
          onChange={handleEditableValue}
        />
        <Input
          type="text"
          name={"country"}
          label="Country"
          value={userProfile?.country}
          onChange={handleEditableValue}
        />
        <Input
          type="text"
          name={"occupation"}
          label="Occupation"
          value={userProfile?.occupation}
          onChange={handleEditableValue}
        />
        <Input
          type="text"
          name={"gender"}
          label="Gender"
          value={userProfile?.gender}
          onChange={handleEditableValue}
        />

        {/* Button Section */}
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-sm cursor-pointer"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-sm cursor-pointer"
            onClick={handleSave}
            isLoading={isPending}
          >
            {"Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProfileModal;
