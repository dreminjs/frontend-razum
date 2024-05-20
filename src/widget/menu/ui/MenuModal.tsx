import { Link } from "react-router-dom";
import { ModalLayout } from "../../../shared";

export const MenuModal = ({
  isOpen,
  onOpenModal,
  onCloseModal,
}: {
  isOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}) => {
  return (
    <ModalLayout styles="rounded-2xl" isOpen={isOpen} onCloseModal={onCloseModal}>
      <ul className="text-center">
        <li className="mb-9">
          <a className="text-zinc-950 underline" href="#about">
            О НАС
          </a>
        </li>
        <li className="mb-9">
          <a className="text-zinc-950 underline" href="#services">
            УСЛУГИ
          </a>
        </li>
        <li className="">
          <Link className="text-zinc-950 underline" to={"/login"}>
            ВОЙТИ
          </Link>
        </li>
      </ul>
    </ModalLayout>
  );
};
