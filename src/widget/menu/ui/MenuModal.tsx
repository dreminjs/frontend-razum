import { Link, useNavigate } from "react-router-dom";
import { ModalLayout, useAppSelector } from "../../../shared";
import { useAppDispatch } from "../../../shared/";
import { setAdmin, setAuth } from "../../../app/store/authSlice";
export const MenuModal = ({
  isOpen,
  onOpenModal,
  onCloseModal,
}: {
  isOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}) => {

  const navigate = useNavigate();

  const { isAdmin, isAuth } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(setAuth(false));
    dispatch(setAdmin(false));
    localStorage.clear();
    navigate("/");
  };

  return (
    <ModalLayout
      styles="rounded-2xl"
      isOpen={isOpen}
      onCloseModal={onCloseModal}
    >
      <ul className="text-center">
        <ul className="flex flex-col items-center justify-center gap-[15px]">
          <li
            className={`px-4 py-2 block text-[white] rounded-[10px] w-1/2 ${
              location.pathname === "/" ? "bg-[#2E2BD0]" : "bg-[#7BBAF5]"
            }`}
          >
            <Link to={"/"}>ГЛАВНАЯ</Link>
          </li>
          {location.pathname === "/" && (
            <>
              <li className="border-[#7BBAF5] px-4 py-2 block text-[white] border-2 bg-[#7BBAF5] rounded-[10px] w-1/2">
                <a onClick={onCloseModal} href={"#services"}>УСЛУГИ</a>
              </li>
              <li className="border-[#7BBAF5] px-4 py-2 block text-[white] border-2 bg-[#7BBAF5] rounded-[10px] w-1/2">
                <a onClick={onCloseModal} href={"#about"}>О НАС</a>
              </li>
            </>
          )}
          {!isAuth && (
            <li className={`px-4 py-2 block text-[white] rounded-[10px] w-1/2 ${location.pathname === "/signin" ? "bg-[#2E2BD0]" : "bg-[#7BBAF5]" }`}>
              {
                <Link
                  to={"/signin"}
                >
                  ВОЙТИ
                </Link>
              }
            </li>
          )}
          {isAdmin && (
            <Link
              className={`px-4 py-2 block text-[white] rounded-[10px] w-1/2 ${
                location.pathname === "/admin" ? "bg-[#2E2BD0]" : "bg-[#7BBAF5]"
              } `}
              to={"/admin"}
            >
              АДМИН ПАНЕЛЬ
            </Link>
          )}
          {isAuth && (
            <>
              <li
                className={`px-4 py-2 block text-[white] rounded-[10px] w-1/2 ${
                  location.pathname === "/contact-us" ? "bg-[#2E2BD0]" : "bg-[#7BBAF5]"
                }`}
              >
                <Link to={"/contact-us"}>ВАШИ ЗАЯВКИ</Link>
              </li>
              <li onClick={logout} className="border-[#7BBAF5] px-4 py-2 block text-[white] border-2 bg-[#7BBAF5] rounded-[10px] w-1/2">
                <button className="">ВЫЙТИ</button>
              </li>
            </>
          )}
        </ul>
      </ul>
    </ModalLayout>
  );
};
