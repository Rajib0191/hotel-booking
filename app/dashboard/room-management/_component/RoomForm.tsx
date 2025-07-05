import React, { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import Select from "@/components/ui/customSelect";
import FileTextField from "@/components/ui/fileTextField";
import Input from "@/components/ui/input";
import TextArea from "@/components/ui/textArea";
import { useCreateRoom, useUpdateRoom } from "@/hooks/roomQueries";
import { IMAGE_PATH } from "@/services/apiService";
import { Room, RoomFormData, RoomFormDataError } from "@/types/room";

const roomTypeOptions = [
  { value: "SINGLE", label: "Single" },
  { value: "DOUBLE", label: "Double" },
  { value: "TRIPLE", label: "Triple" },
  { value: "SUITE", label: "Suite" },
];

const RoomForm = ({
  handleClose,
  room,
}: {
  handleClose: () => void;
  room?: Room;
}) => {
  const [formData, setFormData] = useState<RoomFormData>({
    imageUrl: "",
    roomNumber: "",
    type: "",
    capacity: "",
    pricePerNight: "",
    description: "",
  });

  const [errors, setErrors] = useState<Partial<RoomFormDataError>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof RoomFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RoomFormDataError> = {};

    if (!formData.roomNumber) newErrors.roomNumber = "Room number required";
    if (!formData.type) newErrors.type = "Room type required";
    if (!formData.pricePerNight) newErrors.pricePerNight = "Price required";
    if (!formData.capacity) newErrors.capacity = "Room Capacity required";
    if (!formData.description) newErrors.description = "Description required";
    if (!formData.imageUrl) newErrors.imageUrl = "Room Image required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { mutate, isSuccess, isPending } = useCreateRoom();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const payload = new FormData();
      if (formData.imageUrl) {
        if (typeof formData.imageUrl === "string") {
        } else {
          payload.append("imageUrl", formData.imageUrl);
        }
      }
      payload.append("roomNumber", formData.roomNumber);
      payload.append("type", formData.type);
      payload.append("capacity", formData.capacity);
      payload.append("pricePerNight", formData.pricePerNight);
      payload.append("description", formData.description);

      mutate(payload);
    }
  };

  const {
    mutate: updateMutate,
    isSuccess: updateSuccess,
    isPending: updatePending,
  } = useUpdateRoom();

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (room) {
      if (validateForm()) {
        const payload = new FormData();
        if (formData.imageUrl) {
          if (typeof formData.imageUrl === "string") {
          } else {
            payload.append("imageUrl", formData.imageUrl);
          }
        }
        payload.append("roomNumber", formData.roomNumber);
        payload.append("type", formData.type);
        payload.append("capacity", formData.capacity);
        payload.append("pricePerNight", formData.pricePerNight);
        payload.append("description", formData.description);
        payload.append("id", room.id.toString());
        updateMutate(payload);
      }
    }
  };

  useEffect(() => {
    if (isSuccess || updateSuccess) {
      handleClose();
      setFormData({
        imageUrl: "",
        roomNumber: "",
        type: "",
        capacity: "",
        pricePerNight: "",
        description: "",
      });
    }
  }, [isSuccess, updateSuccess]);

  useEffect(() => {
    if (
      room &&
      typeof room.roomNumber === "number" &&
      typeof room.capacity === "number" &&
      typeof room.pricePerNight === "number"
    ) {
      setFormData({
        imageUrl: IMAGE_PATH + "/" + room.imageUrl || "",
        roomNumber: room.roomNumber.toString(),
        type: room.type || "",
        capacity: room.capacity.toString(),
        pricePerNight: room.pricePerNight.toString(),
        description: room.description || "",
      });
    } else {
      setFormData({
        imageUrl: "",
        roomNumber: "",
        type: "",
        capacity: "",
        pricePerNight: "",
        description: "",
      });
    }
  }, [room]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          label="Room number"
          name="roomNumber"
          value={formData.roomNumber}
          onChange={handleChange}
          placeholder="201"
          error={errors.roomNumber}
        />
        <Select
          options={roomTypeOptions}
          label="Select Room Type"
          value={formData?.type}
          onChange={handleChange}
          name="type"
          error={errors.type}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          label="Capacity"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          placeholder="1"
          error={errors.capacity}
        />
        <Input
          label="Room price"
          name="pricePerNight"
          value={formData.pricePerNight}
          onChange={handleChange}
          placeholder="1000"
          error={errors.pricePerNight}
        />
      </div>
      <TextArea
        label="Room description"
        name="description"
        value={formData?.description}
        onChange={handleChange}
        placeholder="Write room description"
        error={errors.description}
      />
      <FileTextField
        label="Upload Document"
        name="imageUrl"
        value={room && IMAGE_PATH + "/" + room.imageUrl}
        onChange={(file) =>
          setFormData({
            ...formData,
            imageUrl: file || "",
          })
        }
        error={errors?.imageUrl}
      />
      <div className="flex justify-end space-x-3">
        <Button
          variant="secondary"
          onClick={room ? handleUpdate : handleSubmit}
          size="sm"
          className="px-4 py-2"
          isLoading={isPending || updatePending}
        >
          {room ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default RoomForm;
