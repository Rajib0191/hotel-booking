"use client";

import React, { useState } from "react";
import { ProtectedRoute } from "@/components/auth/protectedRoute";
import {
  Home,
  LogOut,
  Menu,
  PlusSquare,
  TextSearch,
  User,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import logo from "../../public/logo.png";
import { MenuItem } from "@/types/dashboard-sidebar";
import SidebarMenu from "./_component/SidebarMenu";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const router = useRouter();
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
      icon: <User size={18} />,
      isAccessible: ["ADMIN", "CUSTOMER"],
    },
    {
      name: "Create Room",
      path: "/dashboard/create-room",
      icon: <PlusSquare size={18} />,
      isAccessible: ["ADMIN"],
    },
    {
      name: "Find My Booking",
      path: "/dashboard/find-booking",
      icon: <TextSearch size={18} />,
      isAccessible: ["ADMIN", "CUSTOMER"],
    },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useUser();

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-navbar-shadow transition-all duration-300 ease-in-out lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            {/* Sidebar header */}
            <div className="flex h-16 items-center justify-between border-b border-custom-border px-4">
              <div
                className="relative h-16 w-20 cursor-pointer"
                onClick={() => router.push("/")}
              >
                <Image
                  src={logo}
                  alt="logo"
                  height={64}
                  width={96}
                  priority
                  className="w-auto"
                />
              </div>
              <button
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-2">
              <SidebarMenu setSidebarOpen={() => setSidebarOpen(false)} />
            </nav>

            {/* Footer/logout */}
            <div className="border-t border-custom-border p-2">
              <button
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
              >
                <span className="text-lg">
                  <LogOut className="rotate-180" />
                </span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Mobile header */}
          <header className="flex h-16 items-center justify-between  border-b border-custom-border bg-white px-4 lg:hidden">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold">
              {menuItems.find((item) => item.path === pathname)?.name ||
                "Dashboard"}
            </h1>
            <div className="w-6"></div>
          </header>

          {/* Content area */}
          <main className="flex-1 overflow-y-auto px-0.5">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
