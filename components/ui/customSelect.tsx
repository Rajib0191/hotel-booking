import React from "react";

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  placeholder?: string;
  options: Option[];
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  options,
  className = "",
  ...props
}) => {
  return (
    <div className="mb-2 relative">
      {label && (
        <label
          htmlFor={name}
          className="block text-gray-700 text-sm font-medium mb-1"
        >
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-2 py-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent pr-10 ${
          error ? "border border-red-500" : "border border-gray-300"
        } ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-0.5 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
