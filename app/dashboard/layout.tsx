"use client";

import React, { useState } from "react";
import { ProtectedRoute } from "@/components/auth/protectedRoute";
import { Home, LogOut, Menu, PlusSquare, User, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <Home size={18} /> },
  { name: "Profile", path: "/dashboard/profile", icon: <User size={18} /> },
  {
    name: "Create Room",
    path: "/dashboard/create-room",
    icon: <PlusSquare size={18} />,
  },
];

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useUser();

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

            {/* User profile */}
            <div className="flex items-center gap-3 border-b border-custom-border p-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-2">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`flex items-center gap-3 rounded-sm px-4 py-1 transition-colors ${
                        pathname === item.path
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
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
          <main className="flex-1 overflow-y-auto px-1 md:px-2">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
