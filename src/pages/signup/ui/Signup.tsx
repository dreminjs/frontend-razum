import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Header } from "../../../features/header";
import { Container, useAppDispatch } from "../../../shared/";
import { useSignupMutation } from "../../../app";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ResponseMessageModal } from "../../../features/ResponseMessageModal";
import { setAuth } from "../../../app/store/authSlice";

const schema = yup.object({
  fullname: yup
    .string()
    .required("введите фио")
    .min(3, "минимальное кол-во символов 3")
    .max(150, "максимальное кол-во символов 150"),
  phone: yup
    .string()
    .required("пожалуйств введите номер телефона")
    .min(7, "минимальное кол-во символов 7")
    .max(25, "максимальное кол-во символов 25"),
  email: yup
    .string()
    .email("не правильный формат")
    .required("пожалуйста введите email"),
  password: yup
    .string()
    .min(3, "минимальное кол-во символов 3")
    .max(150, "максимальное кол-во символов 150"),
});

export const SignupPage = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [message, setMessage] = useState("");

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    signup(data);
  };

  const [signup, { isSuccess, isLoading, isError, data }] = useSignupMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuth(true));
      navigate("/contact-us");
      localStorage.setItem("userId", data.id);
    }
  }, [isSuccess]);


  useEffect(() => {
    if (isLoading) {
        setIsModalOpen(true);
        setMessage("Loading...");
        const id = setTimeout(() => {
          setMessage("")
          setIsModalOpen(false);
          return () => clearTimeout(id);
        }, 3500);
      }

      if (isError) {
        setIsModalOpen(true);
        setMessage("Проверте данные которые вы ввели");
        const id = setTimeout(() => {
          setMessage("")
          setIsModalOpen(false);
          return () => clearTimeout(id);
        }, 3500);
      }
  },[isLoading,isError])

  return (
    <div className="bg-[url('../../../src/assets/bg-spa.jpg')] min-h-screen bg-cover bg-no-repeat bg-center">
      <Header />
      <Container>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[75%] mx-auto py-[80px] bg-gradient-to-r from-[#54DED6] to-[#5957E1] rounded-[70px]"
        >
          <h3 className="text-center text-5xl text-[white] mb-5 max-[630px]:text-2xl">
            РЕГИСТРАЦИЯ
          </h3>
          <div className="">
            <input
              type="email"
              {...register("email")}
              placeholder="email"
              className="outline-none border-b-2 text-[white] border-[white] bg-transparent mb-5 placeholder-[white] w-[75%] mx-auto block"
            />
            {errors.email && (
              <p className="w-[75%] mx-auto mb-2 text-[red]">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="">
            <input
              type="text"
              {...register("phone")}
              placeholder="Номер телефона"
              className="outline-none border-b-2 text-[white] border-[white] bg-transparent mb-5 placeholder-[white] w-[75%] mx-auto block"
            />
            {errors.phone && (
              <p className="w-[75%] mx-auto mb-2 text-[red]">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="">
            <input
              type="text"
              {...register("fullname")}
              placeholder="ФИО"
              className="outline-none border-b-2 text-[white] border-[white] bg-transparent mb-5 placeholder-[white] w-[75%] mx-auto block"
            />
            {errors.fullname && (
              <p className="w-[75%] mx-auto mb-2 text-[red]">
                {errors.fullname.message}
              </p>
            )}
          </div>
          <div className="">
            <input
              type="text"
              {...register("password")}
              placeholder="Пароль"
              className="outline-none border-b-2 text-[white] border-[white] bg-transparent mb-5 placeholder-[white] w-[75%] mx-auto block"
            />
            {errors.password && (
              <p className="w-[75%] mx-auto mb-2 text-[red]">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className="bg-[#7BBAF5] text-[white] px-[25px] py-[10px] rounded-[10px] mx-auto text-center block mb-2 max-[650px]:text-[10px]">
            ЗАРЕГИСТРИРОВАТЬСЯ
          </button>
          <Link
            className="text-center block text-[white] underline"
            to="/signin"
          >
            Войти
          </Link>
        </form>
      </Container>
      <ResponseMessageModal
        message={message}
        onCloseModal={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        isError={isError}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </div>
  );
};
