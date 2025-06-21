"use client";

import { useUserDetails } from "@/hooks/useUserDetails";
import React, { ReactNode } from "react";

type CustomLayoutProps = {
  children: ReactNode;
};

const CustomLayout = ({ children }: CustomLayoutProps) => {
  useUserDetails();

  return <div className="relative">{children}</div>;
};

export default CustomLayout;
