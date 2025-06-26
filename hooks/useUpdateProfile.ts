"use client";
import { useToast } from "@/context/ToastContext";
import { updateProfileInfo } from "@/services/userService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({
      payload,
      profileId,
    }: {
      payload: FormData;
      profileId: number;
    }) => updateProfileInfo(payload, profileId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userDetails"] });
      showToast({
        message: data?.message || "Profile updated successfully!",
        type: "success",
      });
    },
    onError: (err) => {
      showToast({
        message: "Failed to update profile",
        type: "error",
      });
      console.error("Error updating profile:", err);
    },
  });
};
