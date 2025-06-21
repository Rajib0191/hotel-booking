import axios from "axios";
import { UserLoginData, UserRegistrationData } from "@/types/auth";
import { USER_LOGIN, USER_REGISTER } from "./apiService";

export const registerUser = async (userData: UserRegistrationData) => {
  const response = await axios.post(`${USER_REGISTER}`, userData);
  return response.data;
};

export const loginUser = async (userData: UserLoginData) => {
  const response = await axios.post(`${USER_LOGIN}`, userData, {
    withCredentials: true,
  });

  return response.data;
};
