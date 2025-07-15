import React, { useState } from "react";
import Button from "@/components/ui/button";
import Select from "@/components/ui/customSelect";
import { Booking } from "@/types/booking";
import { useUpdateBookingStatus } from "@/hooks/bookingsQueries";

interface UpdateBookingFormProps {
  selected?: Booking;
  onClose: () => void;
}

const options = [
  {
    label: "BOOKED",
    value: "BOOKED",
  },
  {
    label: "CHECKED_IN",
    value: "CHECKED_IN",
  },
  {
    label: "CHECKED_OUT",
    value: "CHECKED_OUT",
  },
  {
    label: "CANCELLED",
    value: "CANCELLED",
  },
];

const UpdateBookingForm = ({ selected, onClose }: UpdateBookingFormProps) => {
  const [bookingStatus, setBookingStatus] = useState<string | "">("");

  const { mutate, isPending } = useUpdateBookingStatus();
  const handleSubmit = () => {
    if (!selected) return;
    mutate(
      { id: selected.id, bookingStatus },
      {
        onSuccess: () => onClose(),
      }
    );
  };

  if (!selected) return <div>No booking selected</div>;

  return (
    <div>
      <Select
        label="Select Booking Status"
        options={options ?? []}
        value={selected?.bookingStatus}
        onChange={(e) => setBookingStatus(e.target.value)}
      />
      <div className="flex justify-end space-x-3">
        <Button
          variant="secondary"
          onClick={handleSubmit}
          size="sm"
          className="px-4 py-2"
          isLoading={isPending}
        >
          {isPending ? "Updating..." : "Update Status"}
        </Button>
      </div>
    </div>
  );
};

export default UpdateBookingForm;
