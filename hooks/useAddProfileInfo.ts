"use client";
import { useToast } from "@/context/ToastContext";
import { addProfileInfo } from "@/services/userService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddProfileInfo = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ payload, userId }: { payload: FormData; userId: number }) =>
      addProfileInfo(payload, userId),
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
