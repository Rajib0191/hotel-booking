"use client";
import { useToast } from "@/context/ToastContext";
import { updateUserData } from "@/services/userService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUserUpdate = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ payload }: { payload: any }) => updateUserData(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userDetails"] });
      showToast({
        message: data?.message || "Profile Updated successful!",
        type: "success",
      });
    },
    onError: (err) => {
      console.error("Error adding profile:", err);
    },
  });
};
