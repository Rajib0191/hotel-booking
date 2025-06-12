"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  title: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
};

const Button = ({
  title,
  onClick = () => {},
  loading = false,
  disabled = false,
  variant = "primary",
  size = "sm",
  className = "",
  icon,
  fullWidth = false,
}: ButtonProps) => {
  // Base classes
  const baseClasses =
    "rounded-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer";

  // Variant classes
  const variantClasses = {
    primary: "bg-blue text-white hover:bg-dark-blue",
    outline: "border border-blue text-gray",
    danger: "bg-red-700 text-white",
  };

  // Size classes
  const sizeClasses = {
    sm: "py-1.5 px-3 text-base",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };

  // Disabled state
  const disabledClasses = "opacity-70 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={twMerge(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled || loading ? disabledClasses : "",
        fullWidth ? "w-full" : "",
        className
      )}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin h-4 w-4" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          <span>{title}</span>
        </>
      )}
    </button>
  );
};

export default Button;
