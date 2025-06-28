"use client";
import { getAllUsers } from "@/services/userService";

export const fetchUsers = async () => {
  const response = await getAllUsers();
  return response.users;
};
