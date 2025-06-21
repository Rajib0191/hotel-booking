"use client";
import React, { createContext, useContext, useState } from "react";

type Toast = {
  id: string;
  message?: string;
  type?: "success" | "error" | "info";
};

type ToastContextType = {
  showToast: (toast: Omit<Toast, "id">) => void;
};

type ToastWithExit = Toast & { isExiting?: boolean };

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastWithExit[]>([]);

  const showToast = (toast: Omit<Toast, "id">) => {
    const id = Date.now().toString();
    const newToast: ToastWithExit = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    // Delay actual removal to allow slide-out animation
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isExiting: true } : t))
      );

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 400); // match slide-out duration
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2 rounded shadow-lg text-white transition-all duration-300
              ${toast.type === "success" ? "bg-green-600" : ""}
              ${toast.type === "error" ? "bg-red-600" : ""}
              ${toast.type === "info" ? "bg-blue-600" : ""}
              ${toast.isExiting ? "animate-slide-out" : "animate-slide-in"}
            `}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
