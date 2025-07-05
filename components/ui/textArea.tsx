import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  name,
  placeholder,
  className = "",
  value,
  onChange,
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
      <textarea
        className={`resize-none w-full px-2 py-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent pr-10 ${
          error ? "border border-red-500" : "border border-gray-300"
        } ${className}`}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && <p className="mt-0.5 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TextArea;
