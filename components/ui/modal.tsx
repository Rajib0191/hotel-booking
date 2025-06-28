import { X } from "lucide-react";
import React from "react";
import Button from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: "sm" | "md" | "lg" | "xl";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = "md",
}) => {
  if (!isOpen) return null;

  const widthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-center justify-center text-center h-screen">
        {/* Modal container */}
        <div
          className={`bg-white z-50 rounded-sm text-left overflow-hidden shadow-modal-shadow transform transition-all sm:align-middle ${widthClasses[width]} w-full`}
        >
          {/* Header */}
          <div className="px-2 py-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="cursor-pointer focus:outline-none"
              >
                <X size={18} color="red" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="px-2 py-2">{children}</div>

          {/* Footer (optional) */}
          {/* <div className="px-2 py-2 bg-gray-50">
            <div className="flex justify-end space-x-3">
              <Button
                variant="danger"
                onClick={handleSave}
                size="sm"
                className="px-4 py-2"
              >
                Cancel
              </Button>
              <Button
                variant="secondary"
                onClick={onClose}
                size="sm"
                className="px-4 py-2"
              >
                Save
              </Button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
