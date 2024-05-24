import { useState } from "react";
import { ModalLayout } from "../../../shared";

export const ResponseMessageModal = ({
  isOpen,
  onCloseModal,
  isError,
  isSuccess,
  isLoading,
  message,
}: {
  isOpen: boolean;
  isLoading:boolean;
  isSuccess:boolean;
  onCloseModal: () => void;
  isError: boolean;
  message: string;
}) => {

  return (
    <ModalLayout
      styles={`rounded-xl ${
        (isSuccess && `border-lime-400 border-[3px]`) ||
        `border-rose-400 border-[3px]`
      } ${isLoading && `border-slate-300 border-[3px]`}`}
      isOpen={isOpen}
      onCloseModal={onCloseModal}
    >
      <p className="text-center">{message}</p>
    </ModalLayout>
  );
};
