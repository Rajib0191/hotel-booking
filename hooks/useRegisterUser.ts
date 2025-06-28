"use client";

import { useToast } from "@/context/ToastContext";
import { registerUser } from "@/services/authService";
import {
  ErrorResponse,
  SuccessResponse,
  UserRegistrationData,
} from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useRegisterUser = () => {
  const router = useRouter();
  const { showToast } = useToast();

  return useMutation<
    SuccessResponse,
    AxiosError<ErrorResponse>,
    UserRegistrationData
  >({
    mutationFn: registerUser,
    onSuccess: (data) => {
      showToast({ message: data?.message, type: "success" });

      // Redirect user
      router.push("/login");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message;
      showToast({
        message: errorMessage || "Something went wrong!",
        type: "error",
      });
    },
  });
};

export const useRegisterUserModal = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<
    SuccessResponse,
    AxiosError<ErrorResponse>,
    UserRegistrationData
  >({
    mutationFn: registerUser,
    onSuccess: (data) => {
      showToast({ message: data?.message, type: "success" });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message;
      showToast({
        message: errorMessage || "Something went wrong!",
        type: "error",
      });
    },
  });
};
