"use client";
import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import Button from "./button";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
  isLoading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isDestructive = true,
  isLoading = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      confirmButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onCancel]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Modal container */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        {/* Modal panel with slide-in animation */}
        <div
          ref={modalRef}
          className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-modal-shadow transition-all sm:my-8 sm:w-full sm:max-w-lg"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {/* Close button (top-right) */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4 rounded-md cursor-pointer"
            onClick={onCancel}
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Modal content */}
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              {/* Icon */}
              <div
                className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                  isDestructive ? "bg-red-100" : "bg-blue-100"
                } sm:mx-0 sm:h-10 sm:w-10`}
              >
                <svg
                  className={`h-6 w-6 ${
                    isDestructive ? "text-red-600" : "text-blue-600"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"
                  />
                </svg>
              </div>

              {/* Text content */}
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  className="text-lg font-medium leading-6 text-gray-900"
                  id="modal-headline"
                >
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{message}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <Button
              ref={confirmButtonRef}
              variant="danger"
              disabled={isLoading}
              isLoading={isLoading}
              className="px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3"
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
            <Button
              variant="outline"
              disabled={isLoading}
              isLoading={isLoading}
              className="px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3"
              onClick={onCancel}
            >
              {cancelText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
