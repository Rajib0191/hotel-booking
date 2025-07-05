import Image from "next/image";
import React, { useCallback, useId, useState, useEffect } from "react";

interface FileTextFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange" | "value"
  > {
  label?: string;
  error?: string;
  onChange?: (file: File | null) => void;
  accept?: string;
  value?: string;
}

const FileTextField: React.FC<FileTextFieldProps> = ({
  label,
  name,
  onChange,
  error,
  className = "",
  id: propId,
  accept = "image/*",
  value,
  ...props
}) => {
  const generatedId = useId();
  const id = propId || generatedId;
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const newImageUrl = URL.createObjectURL(file);
        setImageUrl(newImageUrl);
        onChange?.(file);
      } else {
        setImageUrl(null);
        onChange?.(null);
      }
    },
    [onChange]
  );

  return (
    <div className="mb-2 relative">
      {label && (
        <label
          htmlFor={id}
          className="block text-gray-700 text-sm font-medium mb-1"
        >
          {label}
        </label>
      )}

      <input
        type="file"
        name={name}
        id={id}
        onChange={handleChange}
        accept={accept}
        className={`block w-full text-sm text-gray-700 file:mr-4 file:py-1 file:px-3
        file:rounded-sm file:border-0 file:text-sm file:font-semibibold
        file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200
        ${
          error ? "border border-red-500" : "border border-gray-300"
        } rounded-sm p-1 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent ${className}`}
        {...props}
      />
      {/* Image preview */}
      {imageUrl && (
        <div className="relative min-h-20 w-40 overflow-hidden my-2">
          <Image
            src={imageUrl}
            alt="Preview"
            height={80}
            width={160}
            priority
            className="h-auto w-auto rounded-sm object-contain"
          />
        </div>
      )}

      {value && !imageUrl && (
        <div className="relative min-h-20 w-40 overflow-hidden my-2">
          <Image
            src={value}
            alt="Preview"
            height={80}
            width={160}
            priority
            className="h-auto w-auto rounded-sm object-contain"
          />
        </div>
      )}
      {error && <p className="mt-0.5 text-sm text-red-600">{error}</p>}
    </div>
  );
};
export default React.memo(FileTextField);
