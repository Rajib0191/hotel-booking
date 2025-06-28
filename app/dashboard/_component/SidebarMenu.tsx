"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/types/dashboard-sidebar";
import { BedSingle, Home, UserPen, Users } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

interface SidebarMenuProps {
  setSidebarOpen: (open: boolean) => void;
}

const SidebarMenu = ({ setSidebarOpen }: SidebarMenuProps) => {
  const pathname = usePathname();
  const { user } = useUser();
  const userRole = user?.role ?? "CUSTOMER";
  const menuItems: MenuItem[] = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Home size={18} />,
      isAccessible: ["ADMIN"],
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: <UserPen size={18} />,
      isAccessible: ["ADMIN", "CUSTOMER"],
    },
    {
      name: "User Management",
      path: "/dashboard/user-management",
      icon: <Users size={18} />,
      isAccessible: ["ADMIN"],
    },
    {
      name: "Room Management",
      path: "/dashboard/room-management",
      icon: <BedSingle size={18} />,
      isAccessible: ["ADMIN"],
    },
  ];

  return (
    <ul className="space-y-1">
      {menuItems
        .filter((item) => item.isAccessible.includes(userRole))
        .map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`flex items-center gap-3 rounded-sm px-4 py-1 transition-colors ${
                pathname === item.path
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => {
                setSidebarOpen(false);
                localStorage.setItem("menu", item?.name);
              }}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default SidebarMenu;
