"use client";
import { useToast } from "@/context/ToastContext";
import { deleteUser } from "@/services/userService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (userId: number | undefined) => deleteUser(userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showToast({
        message: data?.message || "User Deleted successfully!",
        type: "success",
      });
    },
    onError: (err) => {
      showToast({
        message: "Failed to delete user",
        type: "error",
      });
      console.error("Error updating profile:", err);
    },
  });
};
