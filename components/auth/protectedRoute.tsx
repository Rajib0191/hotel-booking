"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";

export const ProtectedRoute = ({
  children,
  redirectPath = "/login",
}: {
  children: React.ReactNode;
  redirectPath?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(redirectPath);
      router.refresh();
    }
  }, [isAuthenticated, router, pathname, redirectPath]);

  return isAuthenticated ? <>{children}</> : null;
};
