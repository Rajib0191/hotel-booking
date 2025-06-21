"use client";

import { useToast } from "@/context/ToastContext";
import { useUser } from "@/context/UserContext";
import { loginUser } from "@/services/authService";
import { AuthResponse, ErrorResponse, UserLoginData } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const { login } = useUser();

  return useMutation<AuthResponse, AxiosError<ErrorResponse>, UserLoginData>({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      if (data != null) {
        login(data?.token);
      }

      showToast({
        message: data?.message || "Login successful!",
        type: "success",
      });

      // Wait a moment to ensure cookie is set
      // setTimeout(() => {
      const redirectTo = searchParams.get("redirect") || "/";
      router.push(redirectTo);
      // }, 1000);
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Login failed. Please try again.";
      showToast({
        message: errorMessage,
        type: "error",
      });
    },
  });
};
