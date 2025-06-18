import { GET_AVAILABLE_ROOM } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface RoomSearchParams {
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
}

export interface AvailableRoom {
  id: number;
  roomNumber: number;
  type: string;
  pricePerNight: number;
  capacity: number;
  description: string;
  imageUrl: string;
}

export const getAvailableRooms = async (
  params: RoomSearchParams
): Promise<AvailableRoom[]> => {
  const response = await axios.get(`${GET_AVAILABLE_ROOM}`, { params });
  return response.data.rooms;
};

export const useAvailableRooms = (params: RoomSearchParams, options = {}) => {
  return useQuery({
    queryKey: ["availableRooms", params],
    queryFn: () => getAvailableRooms(params),
    enabled: Boolean(params.checkInDate && params.checkOutDate),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    ...options,
  });
};
