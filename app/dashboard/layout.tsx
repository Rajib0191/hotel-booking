"use client";

import React from "react";
import { ProtectedRoute } from "@/components/auth/protectedRoute";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ProtectedRoute>
      <div>{children}</div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
