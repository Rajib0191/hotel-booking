"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { getToken } from "@/utils/authUtilities";

export const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
  redirectPath?: string;
}) => {
  const router = useRouter();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (!getToken()) {
      router.push("/login");
      router.refresh();
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <>{children}</> : null;
};
