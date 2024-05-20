import { ModalLayout } from "../../../shared";

export const MessageModal = ({
  isOpen,
  onCloseModal,
  isError,
  message,
}: {
  isOpen: boolean;
  onCloseModal: () => void;
  isError: boolean;
  message: string;
}) => {
  return (
    <ModalLayout
      styles={isError ? "border-2 border-[red]" : ""}
      isOpen={isOpen}
      onCloseModal={onCloseModal}
    >
      <p className="text-center">{message}</p>
    </ModalLayout>
  );
};
