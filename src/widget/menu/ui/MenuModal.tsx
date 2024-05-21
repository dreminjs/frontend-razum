import { Link } from "react-router-dom";
import { ModalLayout, useAppSelector } from "../../../shared";

export const MenuModal = ({
  isOpen,
  onOpenModal,
  onCloseModal,
}: {
  isOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}) => {
  const { isAdmin, isAuth } = useAppSelector((state) => state.auth);

  return (
    <ModalLayout
      styles="rounded-2xl"
      isOpen={isOpen}
      onCloseModal={onCloseModal}
    >
      <ul className="text-center">
        <ul className="flex flex-col items-center gap-[15px]">
          <li className="border-[#7BBAF5] px-4 py-2 block text-[white] border-2 bg-[#7BBAF5] rounded-[10px]">
            <Link to={"/"}>ГЛАВНАЯ</Link>
          </li>
          <li className="border-[#7BBAF5] px-4 py-2 block text-[white] border-2 bg-[#7BBAF5] rounded-[10px]">
            <a href={"#services"}>УСЛУГИ</a>
          </li>
          <li className="border-[#7BBAF5] px-4 py-2 block text-[white] border-2 bg-[#7BBAF5] rounded-[10px]">
            <a href={"#about"}>О НАС</a>
          </li>
          {
            !isAuth && (
              <li>
                  { 
                    <Link className="border-[#7BBAF5] px-4 py-2 block text-[white] border-2 bg-[#7BBAF5] rounded-[10px]" to={"signin"}>
                        ВОЙТИ
                    </Link>
                  }
              </li>
            )
          }
          {isAdmin && <Link className="border-[#7BBAF5] px-4 py-2 block text-[white] border-2 bg-[#7BBAF5] rounded-[10px]" to={"admin"}>админ панель</Link>}
          {isAuth && (
            <>
              <li className="border-[#7BBAF5] px-4 py-2 block text-[white] border-2 bg-[#7BBAF5] rounded-[10px]">
                <button className="">ВЫЙТИ</button>
              </li>
            </>
          )}                   
        </ul>
      </ul>
    </ModalLayout>
  );
};
