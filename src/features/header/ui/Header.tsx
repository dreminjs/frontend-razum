import { Container } from "../../../shared/";
import Logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";


export const Header = () => {

  return (
    <header className="py-5">
      <Container>
        <nav className="flex justify-between">
          <Link to={"/"}>
            <img src={Logo} alt="logo rozum systems" />
          </Link>
          <ul className="flex gap-3 items-center">
            <li className="border-[#7BBAF5] px-4 py-2 block text-[white] border-2 bg-[#7BBAF5] rounded-[10px]">
              <Link to={"/"}>
                ГЛАВНАЯ
              </Link>
            </li>
            {/* {!isAuth && (
              <>
                <li className="border-[#7BBAF5] px-4 py-2 block text-[white] border-2 bg-[#7BBAF5] rounded-[10px]">
                  <button className="">
                    ВЫЙТИ
                  </button>
                </li>
              </>
            )} */}
          </ul>
        </nav>
      </Container>
    </header>
  );
};
