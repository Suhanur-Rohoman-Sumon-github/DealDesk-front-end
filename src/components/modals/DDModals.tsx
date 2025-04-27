import React, { ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "../ui/button";

interface GGModalProps {
  children: ReactNode;
  buttonText: ReactNode | string;
  isComment?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const GGModal = ({
  children,
  buttonText,
  size = "md",
  isOpen,
  setIsOpen,
}: GGModalProps) => {
  const handleClose = () => setIsOpen(false);

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    full: "w-full max-w-screen-lg",
  };

  return (
    <>
      {/* Button to open the modal */}
      <Button onClick={() => setIsOpen(true)}>{buttonText}</Button>

      {/* Modal */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleClose}>
          {/* Overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full bg-white rounded-lg shadow-lg p-6 ${sizeClasses[size]}`}
              >
                {/* Close Button */}
                <div className="flex justify-end">
                  <button
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    onClick={handleClose}
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Body */}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default GGModal;
