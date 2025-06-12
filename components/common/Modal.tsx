import React, { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
};
const Modal = ({ children }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center ">
      <div className="rounded max-w-[600px] w-full relative">{children}</div>
    </div>
  );
};

export default Modal;
