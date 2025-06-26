"use client";
import React from "react";
import Image from "next/image";
import { IMAGE_PATH } from "@/services/apiService";
import { Camera } from "lucide-react";
import Button from "@/components/ui/button";

const UserProfile = ({
  setShowModal,
  setCreateProfilModal,
  user,
}: {
  setShowModal: any;
  setCreateProfilModal: () => void;
  user: any;
}) => {
  return (
    <div className="relative flex items-center gap-6 mb-8">
      {/* Profile Picture Container */}
      <div className="relative group">
        <div
          className="h-20 w-20 rounded-full bg-blue-100 border border-custom-border flex items-center justify-center cursor-pointer relative overflow-hidden"
          onClick={() => setShowModal(true)}
        >
          {/* User Profile */}
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
            <span className="text-2xl text-blue-600">
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </span>
          )}

          {/* Hover Overlay */}
          <div className="bg-white absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-60 transition-opacity duration-200">
            <Camera className="text-gray-900 text-xl" />
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="flex justify-center items-start flex-col">
        <small className="bg-blue-100 rounded-sm flex items-center justify-center capitalize px-2 py-0.5">
          {user?.role.toLowerCase()}
        </small>
        <h2 className="text-xl font-semibold">
          {user?.firstName} {user?.lastName}
        </h2>
        <p className="text-gray-600">{user?.email}</p>
      </div>
      {/* Update Profile Button */}
      {!user?.profile && (
        <div className="absolute top-0 right-0">
          <Button onClick={setCreateProfilModal}>Update Profile</Button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
