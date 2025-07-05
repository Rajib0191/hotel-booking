"use client";
import { useToast } from "@/context/ToastContext";
import {
  createRoom,
  deleteRoomById,
  fetchAllRooms,
  roomSearchByRoomType,
  updateRoomById,
} from "@/services/roomService";
import {
  CreateRoomResponse,
  DeleteResponse,
  GetAllRoomsResponse,
} from "@/types/room";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetAllRooms = () => {
  return useQuery<GetAllRoomsResponse, AxiosError<{ message?: string }>>({
    queryKey: ["rooms"],
    queryFn: fetchAllRooms,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<CreateRoomResponse, Error, FormData>({
    mutationFn: createRoom,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      showToast({
        message: data?.message || "Room created successfully!",
        type: "success",
      });
    },
    onError: (err) => {
      showToast({
        message: err?.message || "Failed to create room!",
        type: "error",
      });
    },
  });
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<DeleteResponse, Error, number>({
    mutationFn: deleteRoomById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      showToast({
        message: data?.message || "Room deleted successfully!",
        type: "success",
      });
    },
    onError: (err) => {
      showToast({
        message: err?.message || "Failed to delete room!",
        type: "error",
      });
    },
  });
};

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  return useMutation<DeleteResponse, Error, FormData>({
    mutationFn: updateRoomById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      showToast({
        message: data?.message || "Room updated successfully!",
        type: "success",
      });
    },
  });
};

export const useGetSearchRooms = (searchInput: string) => {
  return useQuery<GetAllRoomsResponse, AxiosError<{ message?: string }>>({
    queryKey: [searchInput],
    queryFn: () => roomSearchByRoomType(searchInput),
    staleTime: 1000 * 60 * 5,
    enabled: !!searchInput,
  });
};
