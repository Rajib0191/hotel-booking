"use client";

import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
  name?: string;
  id?: string;
  defaultToUS?: boolean; // New prop to default to US
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      value = "",
      onChange,
      label,
      placeholder = "Select an option",
      className = "",
      disabled = false,
      error,
      name,
      defaultToUS = true,
    },
    ref
  ) => {
    const defaultValue = defaultToUS
      ? options.find((opt) => opt.value === "all")?.value || ""
      : "";

    const selectedValue = value !== "" ? value : defaultValue;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className={`mb-2 ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            value={selectedValue}
            name={name}
            id={name}
            onChange={handleChange}
            disabled={disabled}
            className={`block w-full px-2 py-1 pr-8 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition ${
              disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            } appearance-none`}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
