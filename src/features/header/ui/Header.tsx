import { Container,useAppSelector } from "../../../shared/";
import Logo from "../../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import {useUserQuery} from "../../../app"
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../shared/";
import {} from "../../../app/"
import { setAdmin, setAuth } from "../../../app/store/authSlice";
import Burger from "../../../assets/burger.svg";
import { MenuModal } from "../../../widget/menu";
export const Header = () => {

  const {isAuth,isAdmin} = useAppSelector(state => state.auth)

  const {data,isSuccess} = useUserQuery(localStorage.getItem("userId"))

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const logout = () => {
    dispatch(setAuth(false))
    dispatch(setAdmin(false))
    localStorage.clear()
    navigate("/")
  }

  useEffect(() => {

    console.log(isSuccess)
    if(isSuccess){        
      dispatch(setAdmin(data.role === "admin" ? true : false))
      dispatch(setAuth(true))
    }else{
      dispatch(setAuth(false))
      dispatch(setAdmin(false))
    }
  },[isSuccess])

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
    <header className="py-5">
      <Container>
        <nav className="flex justify-between">
          <Link to={"/"}>
            <img src={Logo} alt="logo rozum systems" className="basis-[25%]" />
          </Link>
          <ul className="flex gap-3 items-center max-md:hidden">
            <li className="border-[#7BBAF5] px-4 py-2 block text-[white] border-2 bg-[#7BBAF5] rounded-[10px]">
              <Link to={"/"}>
                ГЛАВНАЯ
              </Link>
            </li>
            {
              isAdmin && (
                <Link className="border-[#7BBAF5] px-4 py-2 block text-[white] border-2 bg-[#7BBAF5] rounded-[10px]" to={'/admin'}>АДМИН ПАНЕЛЬ</Link>
              )
            }
            {isAuth && (
              <>
                <li className="border-[#7BBAF5] px-4 py-2 block text-[white] border-2 bg-[#7BBAF5] rounded-[10px]">
                  <button onClick={logout} className="">
                    ВЫЙТИ
                  </button>
                </li>
                <li className="border-[#7BBAF5] px-4 py-2 block text-[white] border-2 bg-[#7BBAF5] rounded-[10px]">
                  <Link to={'/contact-us'}>
                    ВАШИ ЗАЯВКИ
                  </Link>
                </li>
              </>
            )}
          </ul>
          <button onClick={handleOpenModal} className="md:hidden">
            <img src={Burger} className="h-14 w-14" alt="" />
          </button>
        </nav>
      </Container>
    </header>
    <MenuModal
        isOpen={isModalOpen}
        onOpenModal={handleOpenModal}
        onCloseModal={handleCloseModal}
      />
    </>
  );
};
