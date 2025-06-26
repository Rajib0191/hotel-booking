"use client";
import axios from "axios";
import {
  CREATE_PROFILE,
  UPDATE_PROFILE,
  UPDATE_USERS,
  USER_DETAILS,
} from "./apiService";
import { getToken } from "@/utils/authUtilities";
import { UserResponse } from "@/types/user";

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
