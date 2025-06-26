"use client";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface InputProps {
  label?: string;
  name: string;
  type?: "text" | "password" | "email";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-2 relative">
      <label htmlFor={name} className="block text-gray-700 text-sm font-medium">
        {label}
      </label>

      <div className="relative">
        <input
          className="w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent pr-10"
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
        />
        {error && <p className="mt-0.5 text-sm text-red-600">{error}</p>}
        {type === "password" && (
          <button
            type="button"
            className="absolute top-2 right-0 flex items-center pr-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
