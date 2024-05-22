import { Link } from "react-router-dom";

import Logo from "../../../assets/logo.png";

import Burger from "../../../assets/burger.svg";

import { MenuModal } from "../../../widget/menu";

import { useEffect, useState } from "react";

import { Container, useAppDispatch, useAppSelector } from "../../../shared/";
import { useUserQuery } from "../../../app";
import { setAdmin, setAuth } from "../../../app/store/authSlice";

export const Home = () => {
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  const { isAuth, isAdmin } = useAppSelector((state) => state.auth);

  const { data, isSuccess } = useUserQuery(localStorage.getItem("userId"));

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAdmin(data.role === "admin" ? true : false));
      dispatch(setAuth(true));
    } else {
      dispatch(setAuth(false));
      dispatch(setAdmin(false));
    }
  }, [isSuccess]);

  return (
    <div className="bg-[#7BBAF5]">
      <MenuModal
        isOpen={isModalOpen}
        onOpenModal={handleOpenModal}
        onCloseModal={handleCloseModal}
      />
      <header className="px-10 pt-[49px] pb-[20px] bg-[url('../../../src/assets/header-background.jpg')] min-h-screen bg-cover bg-no-repeat bg-center mb-20">
        <nav className="flex items-center justify-between border-b-2 pb-4 mb-14 max-sm:flex-col max-sm:gap-4">
          <Link to={"/"}>
            <img src={Logo} alt="logo rozum systems" />
          </Link>
          <ul className="flex gap-[17px] max-md:hidden">
            <li className="border-[#7BBAF5] px-4 py-2 block text-[white] border-2 bg-[#7BBAF5] rounded-[10px]">
              <a className="text-neutral-50" href="#about">
                О НАС
              </a>
            </li>
            <li className="border-[#7BBAF5] px-4 py-2 block text-[white] border-2 bg-[#7BBAF5] rounded-[10px]">
              <a className="text-neutral-50" href="#services">
                УСЛУГИ
              </a>
            </li>
            {!isAuth && (
              <>
                <li className="border-[#7BBAF5] px-4 py-2 block text-[white] border-2 bg-[#7BBAF5] rounded-[10px]">
                  <Link className="text-neutral-50" to={"/signin"}>
                    ВОЙТИ
                  </Link>
                </li>
              </>
            )}
            {isAuth && (
              <>
                <li className="border-[#7BBAF5] px-4 py-2 block text-[white] border-2 bg-[#7BBAF5] rounded-[10px]">
                  <button className="text-neutral-50">ВЫЙТИ</button>
                </li>
                <li className="border-[#7BBAF5] px-4 py-2 block text-[white] border-2 bg-[#7BBAF5] rounded-[10px]">
                  <Link to={"/contact-us"}>ВАШИ ЗАЯВКИ</Link>
                </li>
              </>
            )}
            {isAdmin && (
              <>
                <li>
                  <Link
                    to={"admin"}
                    className="border-[#7BBAF5] px-4 py-2 block text-[white] border-2 bg-[#7BBAF5] rounded-[10px]"
                  >
                    АДМИН ПАНЕЛЬ
                  </Link>
                </li>
              </>
            )}
          </ul>
          <button onClick={handleOpenModal} className="md:hidden">
            <img src={Burger} className="h-14 w-14" alt="" />
          </button>
        </nav>
        <h1 className="text-neutral-50 text-5xl max-w-full max-[400px]:text-[40px] max-[400px]:text-[25px]">
          RozumSystems - <br />
          разработка гибких инструментов автоматизации вашего бизнеса
        </h1>
      </header>
      <section id="about" className="mb-[125px]">
        <Container>
          <h3 className="text-center text-5xl mb-5">О НАС</h3>
          <div className="flex gap-[15px] justify-center max-[1000px]:block">
            <div className="basis-[40%] max-[1000px]:mb-[15px]">
              <p className="text-[#2F353F] mb-[12px]">
                Наша IT-компания – надежный партнер в реализации ваших самых
                амбициозных проектов. . Наши высококвалифицированные специалисты
                готовы реализовать любые технические задачи. Мы ценим
                уникальность каждого клиента. Наша команда разрабатывает
                персонализированные решения, отвечающие вашим уникальным
                потребностям и целям.
              </p>
              <p className="text-[#2F353F] mb-[12px]">
                Мы используем лучшие практики, проверенные методологии
                разработки и проверенные временем оптимальные модели доставки
                для разработки и создания приложений в фиксированные сроки.
              </p>
              <p className="text-[#2F353F] ">
                Выбирайте нас и дайте своему бизнесу тот импульс, которого он
                заслуживает! С нами ваш успех – наше призвание.
              </p>
            </div>
            <ul className="basis-[40%] grid grid-rows-2 grid-cols-2">
              <li className="group hover:bg-gradient-to-l from-[#2E2BD0] to-[#7876F2] hover:text-white border-2 py-[45px] max-[1200px]:py-[0px] text-centers justify-items-center items-center grid border-[#7876F2] rounded-[40px]">
                <div>
                  <p className="text-[#7876F2] group-hover:text-[white] text-3xl">7</p>
                  <p>лет на рынке</p>
                </div>
              </li>
              <li className="group hover:bg-gradient-to-l from-[#2E2BD0] to-[#7876F2] px-[15px] hover:text-white border-2 py-[45px] text-centers justify-items-center items-center grid border-[#7876F2] rounded-[40px]">
                <div>
                  <p className="text-[#7876F2] group-hover:text-[white] text-3xl">100</p>
                  <p>клиентов по всему миру</p>
                </div>
              </li>
              <li className="group hover:bg-gradient-to-l from-[#2E2BD0] to-[#7876F2] hover:text-white border-2 py-[45px] text-centers justify-items-center items-center grid border-[#7876F2] rounded-[40px]">
                <div>
                  <p className="text-[#7876F2] group-hover:text-[white] text-3xl">10+</p>
                  <p>
                    сильных <br /> разработчиков
                  </p>
                </div>
              </li>
              <li className="group hover:bg-gradient-to-l from-[#2E2BD0] to-[#7876F2] hover:text-white border-2 py-[45px] text-centers justify-items-center items-center grid border-[#7876F2] rounded-[40px]">
                <div>
                  <p className="text-[#7876F2] group-hover:text-[white] text-3xl">8-10</p>
                  <p>
                    недель работы над <br /> проектом
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </Container>
      </section>
      <section className="mb-[125px]">
        <Container>
          <h3 className="text-center text-5xl mb-5">Почему мы?</h3>
          <h4 className="text-center w-[70%] mx-auto text-[#2F353F] mb-[20px]">
            Несмотря на молодость нашей компании, мы уже успели поработать с
            такими серьезными представителями бизнес-среды, как Volvo, QIWI, EMS
            Russian Post, Alfa Bank, Beeline, FC BATE и другие.
          </h4>
          <ul className="grid-rows-2 grid-cols-3 w-[75%] mx-auto grid max-[1200px]:grid-cols-2 max-[1200px]:grid-rows-3 max-[940px]:grid-rows-6 max-[940px]:grid-cols-1 gap-[15px]">
            <li className="group hover:bg-gradient-to-l from-[#2E2BD0] to-[#7876F2] hover:text-white border-2 border-[#2E2BD0] rounded-[40px] p-5">
              <p className="text-[black] group-hover:text-white">Индивидуальный подход</p>
              <p className="text-[#2F353F] group-hover:text-white">
                Мы трепетно относимся к каждому из наших клиентов и всегда
                готовы предложить эксклюзивные решения и услышать и воплотить в
                жизнь каждую вашу идею.
              </p>
            </li>
            <li className="group hover:bg-gradient-to-l from-[#2E2BD0] to-[#7876F2] hover:text-white border-2 border-[#2E2BD0] rounded-[40px] p-5">
              <p className="text-[black] group-hover:text-white">Высококвалифицированный персонал</p>
              <p className="text-[#2F353F] group-hover:text-white">
                Наши сотрудники имеют многолетний опыт в различных сферах и
                этапах разработки программного обеспечения.
              </p>
            </li>
            <li className="group hover:bg-gradient-to-l from-[#2E2BD0] to-[#7876F2] hover:text-white border-2 border-[#2E2BD0] rounded-[40px] p-5"> 
              <p className="text-[black] group-hover:text-white">Официальный контракт</p>
              <p className="text-[#2F353F] group-hover:text-white">
                Мы работаем по предварительно заключенному договору и несем
                полную ответственность за выполнение своих обязательств
              </p>
            </li>
            <li className="group hover:bg-gradient-to-l from-[#2E2BD0] to-[#7876F2] hover:text-white border-2 border-[#2E2BD0] rounded-[40px] p-5">
              <p className="text-[black] group-hover:text-white">Качественное ПО</p>
              <p className="text-[#2F353F] group-hover:text-white">
                Мы оказываем широкий спектр услуг в сфере оценки качества
                программного обеспечения, а также несем ответственность за
                качество разрабатываемого нами ПО.
              </p>
            </li>
            <li className="group hover:bg-gradient-to-l from-[#2E2BD0] to-[#7876F2] border-2 border-[#2E2BD0] rounded-[40px] p-5">
              <p className="text-[black] group-hover:text-white">Уникальные проекты</p>
              <p className="text-[#2F353F] group-hover:text-white">
                Мы разрабатываем нешаблонные решения для вашего бизнеса.
              </p>
            </li>
            <li className="group hover:bg-gradient-to-l from-[#2E2BD0] to-[#7876F2] border-2 border-[#2E2BD0] rounded-[40px] p-5">
              <p className="text-[black] group-hover:text-white">Современный инструментарий</p>
              <p className="text-[#2F353F] group-hover:text-white">
                Мы уверены, что по итогам нашего сотрудничества вы получите
                прогрессивный инструмент для работ, соответствующий самым
                современным тенденциям в области разработок и качества ПО.
              </p>
            </li>
          </ul>
        </Container>
      </section>
      <section id="services" className="mb-[125px]">
        <Container>
          <h3 className="text-center text-5xl mb-5">Наши услуги</h3>
          <h4 className="text-center w-[70%] mx-auto text-[#2F353F] mb-[20px]">
            Компания Rozum Systems занимается разработкой программного
            обеспечения любого уровня сложности. Команда высококлассных
            разработчиков поможет найти конкретно необходимое вам бизнес-решение
            и успешно реализовать его в кратчайшие сроки.
          </h4>
          <ul className="flex justify-between max-[825px]:flex-col max-[825px]:gap-[15px]">
            <li className="group hover:bg-gradient-to-l from-[#2E2BD0] to-[#7876F2] basis-[30%] bg-[#93A3B3] px-[25px] py-[25px] flex flex-col items-center justify-between rounded-[24px]">
              <h4 className="text-[#170F49] font-black mb-5 group-hover:text-white" >
                Веб-сайт разработка
              </h4>
              <p className="mb-[22px] group-hover:text-white">
                Мы предлагаем разработку комплексного пакета услуг по созданию
                вашего персонального сайта любого уровня сложности, с
                возможностью подключения внутренних систем заказчика, внешних
                аналитических систем, а также разработки собственных систем
                анализа данных, отвечающих специфике вашего бизнес-проекта. .
              </p>
              <Link to={isAuth ? "/contact-us" : "/signin"} className="bg-[#2E2BD0] text-center px-[25px] py-[10px] text-white rounded-[100px] group-hover:bg-[white] group-hover:text-black" type="button">Заказать сейчас</Link>
            </li>
            <li className="group hover:bg-gradient-to-l from-[#2E2BD0] to-[#7876F2] basis-[30%] bg-[#93A3B3] px-[25px] py-[25px] flex flex-col items-center justify-between text-center rounded-[24px]">
              <h4 className="text-[#170F49] font-black mb-5 group-hover:text-white">
                Мобильные приложения
              </h4>
              <p className="group-hover:text-white">
                Мы разрабатываем эргономичные мобильные инструменты любой
                сложности для комфорта ваших клиентов. Мы поможем вам сделать
                ваш бизнес доступнее, оптимизировать бизнес-процессы и сделать
                ваши услуги и продукты привлекательными на любом смартфоне или
                планшете
              </p>
              <Link to={isAuth ? "/contact-us" : "/signin"} className="bg-[#2E2BD0] text-center px-[25px] py-[10px] text-white rounded-[100px] group-hover:bg-[white] group-hover:text-black" type="button">Заказать сейчас</Link>
            </li>
            <li className="group hover:bg-gradient-to-l from-[#2E2BD0] to-[#7876F2] basis-[30%] bg-[#93A3B3] px-[25px] py-[25px] flex flex-col items-center justify-between text-center rounded-[24px]">
              <h4 className="text-[#170F49] font-black mb-5 group-hover:text-white">Разработка ПО</h4>
              <p className="group-hover:text-white">
                Мы предоставляем полный спектр профессиональных услуг в области
                разработки программного обеспечения любой сложности –
                проектирование, написание, тестирование и поддержка компьютерных
                программ для решения ваших бизнес-задач.
              </p>
              <Link to={isAuth ? "/contact-us" : "/signin"} className="bg-[#2E2BD0] text-center px-[25px] py-[10px] text-white rounded-[100px] group-hover:bg-[white] group-hover:text-black" type="button">Заказать сейчас</Link>
            </li> 
          </ul>
        </Container>
      </section>
      <footer>
        <Container>
          <div className="py-[80px] border-t-2 border-[#2F353F]">
            <Link to={"/"} className="mb-5 block">
              <img src={Logo} alt="logo rozum systems" />
            </Link>

            <p>+7 495 744 11 77</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};
