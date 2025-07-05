"use client";

import { getToken } from "@/utils/authUtilities";
import axios from "axios";
import {
  CREATE_ROOM,
  DELETE_ROOM,
  FILTER_ROOM,
  GET_ALL_ROOMS,
  UPDATE_ROOM,
} from "./apiService";
import {
  CreateRoomResponse,
  DeleteResponse,
  GetAllRoomsResponse,
} from "@/types/room";

export const fetchAllRooms = async (): Promise<GetAllRoomsResponse> => {
  const token = getToken();
  try {
    const response = await axios.get<GetAllRoomsResponse>(GET_ALL_ROOMS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch rooms");
    }
    throw new Error("Failed to fetch rooms");
  }
};

export const createRoom = async (
  formData: FormData
): Promise<CreateRoomResponse> => {
  const token = getToken();
  try {
    const response = await axios.post<CreateRoomResponse>(
      CREATE_ROOM,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to create room");
    }
    throw new Error("Failed to create room");
  }
};

export const deleteRoomById = async (
  roomId: number
): Promise<DeleteResponse> => {
  const token = getToken();
  try {
    const { data } = await axios.delete<DeleteResponse>(
      `${DELETE_ROOM}/${roomId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        throw new Error(
          "Request timed out. Please check your connection and try again."
        );
      }
    }
    throw new Error("Failed to delete room");
  }
};

export const updateRoomById = async (
  formData: FormData
): Promise<DeleteResponse> => {
  const token = getToken();
  try {
    const { data } = await axios.put<DeleteResponse>(
      `${UPDATE_ROOM}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        throw new Error(
          "Request timed out. Please check your connection and try again."
        );
      }
    }
    throw new Error("Failed to update room");
  }
};

export const roomSearchByRoomType = async (
  input: string
): Promise<GetAllRoomsResponse> => {
  const token = getToken();
  try {
    const response = await axios.get<GetAllRoomsResponse>(`${FILTER_ROOM}`, {
      params: { input },
      headers: { Authorization: `Bearer ${token}` },
      timeout: 10000,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        throw new Error(
          "Request timed out. Please check your connection and try again."
        );
      }
    }
    throw new Error("Failed to load room");
  }
};
