"use client";

import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const Avatar = ({ src }: { src?: string }) => {
  const router = useRouter();
  const customRef = useRef<HTMLDivElement>(null);
  const { logout } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  const initials = [
    user?.firstName?.[0] || "",
    ...(user?.lastName?.split(" ").map((n) => n[0]) || []),
  ]
    .join("")
    .toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        customRef.current &&
        !customRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative flex justify-center items-center gap-1 cursor-pointer"
      ref={customRef}
    >
      {/* =====Name And Logout Button===== */}
      <div
        className="relative h-9 w-9 rounded-full bg-blue flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {src ? (
          <Image
            src={src}
            alt={fullName}
            fill
            className="object-cover rounded-full"
            sizes="48px"
          />
        ) : (
          <span className="text-background font-medium text-sm">
            {initials}
          </span>
        )}
      </div>

      {/* ======Icon===== */}
      <div
        className="flex justify-center items-center font-medium text-[16px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="underline text-white font-bold tracking-wide">
          {fullName}
        </div>
        <div>
          {isOpen ? (
            <ChevronUp size={18} className="text-white" />
          ) : (
            <ChevronDown size={18} className="text-white" />
          )}
        </div>
      </div>

      {/* =====Popover===== */}
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 bg-white rounded shadow-lg min-w-[200px] z-10">
          <div className="flex flex-col border-b border-custom-border py-2 px-3">
            <p className="text-sm font-bold m-0">{fullName}</p>
            <p className="text-xs m-0">{user?.email}</p>
          </div>
          <div className="border-b border-custom-border p-1">
            <div
              className="flex justify-start items-center flex-row px-2 py-1 hover:bg-amber-300 hover:rounded-md"
              onClick={() => router.push("/dashboard")}
            >
              <LayoutDashboard size={16} className="mr-3" />
              <p className="text-base m-0">Dashboard</p>
            </div>
            <div className="flex justify-start items-center flex-row px-2 py-1 hover:bg-amber-300 hover:rounded-md">
              <Settings size={16} className="mr-3" />
              <p className="text-base m-0">Setting</p>
            </div>
          </div>
          <div className="p-1">
            <div
              className="flex justify-start items-center flex-row px-2 py-1 hover:bg-amber-300 hover:rounded-md"
              onClick={() => logout()}
            >
              <LogOut size={16} className="mr-3" />
              <p className="text-base m-0">Logout</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
