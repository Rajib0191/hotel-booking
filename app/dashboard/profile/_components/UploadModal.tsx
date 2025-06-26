"use client";
import React, { useRef, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { IMAGE_PATH } from "@/services/apiService";
import Button from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";

const UploadModal = ({ setShowModal }: { setShowModal: any }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user } = useUser();
  const [selectedImage, setSelectedImage] = useState<string | null | any>(null);
  const [uploadableImage, setUploadableImage] = useState<string | null | any>(
    null
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadableImage(file);
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const { mutate: uploadImage, isPending } = useUpdateProfile();

  const handleSaveImage = () => {
    if (!selectedImage || !user?.profile?.id) return;

    const imageData = new FormData();
    imageData.append("profilePictureUrl", uploadableImage);

    uploadImage(
      { payload: imageData, profileId: user.profile.id },
      {
        onSettled: () => {
          setShowModal(false);
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-modal-shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Update Profile Picture</h2>
          <button onClick={() => setShowModal(false)}>
            <X className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="relative h-40 w-40 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt="Preview"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            ) : user?.profile?.profilePictureUrl ? (
              <Image
                src={`${IMAGE_PATH}/${user?.profile?.profilePictureUrl}`}
                alt="Preview"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
              />
            ) : (
              <span className="text-4xl text-gray-400">
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </span>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />

          <Button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Choose Image
          </Button>
        </div>

        {/* Button Section */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={handleSaveImage}
            disabled={!selectedImage}
            isLoading={isPending}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
