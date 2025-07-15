"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  bookedRoom,
  fetchAllBookingList,
  FindBookingByReference,
  UpdateBookingStatus,
} from "@/services/bookingService";
import {
  BookingRequest,
  BookingResponse,
  BookingStatusChangeRequest,
  BookingStatusChangeResponse,
} from "@/types/booking";
import { useToast } from "@/context/ToastContext";
import { BookingApiResponse } from "@/types/find-booking";

export const useBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: fetchAllBookingList,
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });
};

export const useBookRoom = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  return useMutation<BookingResponse, Error, BookingRequest>({
    mutationFn: (payload: BookingRequest) => bookedRoom(payload),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["availableRooms"] });
      showToast({
        message: data?.message || "Room booked successfully!",
        type: "success",
      });
    },
    onError: (error) => {
      const errorMessage = error?.message || "Booked failed. Please try again.";
      showToast({
        message: errorMessage,
        type: "error",
      });
    },
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<
    BookingStatusChangeResponse,
    Error,
    BookingStatusChangeRequest
  >({
    mutationFn: (payload: BookingStatusChangeRequest) =>
      UpdateBookingStatus(payload),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      showToast({
        message: data?.message || "Update successfully!",
        type: "success",
      });
    },
    onError: (error) => {
      const errorMessage = error?.message || "Update failed. Please try again.";
      showToast({
        message: errorMessage,
        type: "error",
      });
    },
  });
};

export const useFindBookingByRef = (bookingReference: string) => {
  return useQuery<BookingApiResponse, Error>({
    queryKey: ["booking", bookingReference],
    queryFn: () => FindBookingByReference(bookingReference),
    enabled: !!bookingReference, // Only run when bookingReference exists
    retry: 2, // Retry twice before failing
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
  });
};
