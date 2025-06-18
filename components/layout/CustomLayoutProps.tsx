import React, { ReactNode } from "react";
import Navbar from "../common/Navbar";

type CustomLayoutProps = {
  children: ReactNode;
};

const CustomLayout = ({ children }: CustomLayoutProps) => {
  return (
    <div className="relative">
      <Navbar />
      {children}
    </div>
  );
};

export default CustomLayout;
