"use client";
import axios from "axios";
import {
  CREATE_PROFILE,
  DELETE_USER,
  GET_ALL_USERS,
  UPDATE_PROFILE,
  UPDATE_USERS,
  USER_DETAILS,
} from "./apiService";
import { getToken } from "@/utils/authUtilities";
import { GetAllUsersResponse, UserResponse } from "@/types/user";

export const getUserDetails = async (): Promise<UserResponse> => {
  const token = getToken();
  const response = await axios.get<UserResponse>(USER_DETAILS, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateUserData = async (payload: any) => {
  const token = getToken();
  const response = await axios.put(`${UPDATE_USERS}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addProfileInfo = async (payload: FormData, userId: number) => {
  const token = getToken();
  const response = await axios.post(`${CREATE_PROFILE}/${userId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateProfileInfo = async (
  payload: FormData,
  profileId: number
): Promise<{ message: string }> => {
  const token = getToken();
  const response = await axios.put(`${UPDATE_PROFILE}/${profileId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getAllUsers = async (): Promise<GetAllUsersResponse> => {
  const token = getToken();
  try {
    const response = await axios.get<GetAllUsersResponse>(GET_ALL_USERS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch users");
    }
    throw new Error("Failed to fetch users");
  }
};

export const deleteUser = async (userId: number | undefined) => {
  const token = getToken();
  try {
    const response = await axios.delete(`${DELETE_USER}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to delete user");
    }
    throw new Error("Failed to delete user");
  }
};
