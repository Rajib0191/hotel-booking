import axios from "axios";
import { USER_DETAILS } from "./apiService";
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
