import { Container } from "../../../shared";
import { Header } from "../../../features/header";
import { useGetMyOrdersQuery, useCreateOrderMutation } from "../../../app/";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

const schema = yup.object({
  text: yup
    .string()
    .required("введите текст")
    .min(3, "минимальное кол-во символов 3")
    .max(150, "максимальное кол-во символов 250"),
});

export const ContactUsPage = () => {
  const { data, isLoading, isSuccess, refetch } = useGetMyOrdersQuery(
    localStorage.getItem("userId")
  );

  const [
    createOrder,
    { isLoading: creatingOrderIsLoading, isSuccess: creatingOrderIsSuccess },
  ] = useCreateOrderMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (creatingOrderIsSuccess) {
      refetch();
    }
  }, [creatingOrderIsSuccess]);

  const submit = (data: any) => {
    createOrder({ body: data, userId: localStorage.getItem("userId") });
    reset();
  };

  console.log(localStorage.getItem("userId"));

  return (
    <div className="bg-[url('../../../src/assets/bg-spa.jpg')] min-h-screen bg-cover bg-no-repeat bg-center ">
      <Header />
      <Container>
        <div className="bg-[#55C7D8] py-[25px] rounded-[75px] px-[100px]">
          <h3 className="text-[44px] text-[white] text-center">
            Свяжись с нами
          </h3>
          <div className="flex justify-between">
            <form
              onSubmit={handleSubmit(submit)}
              className="basis-[40%] flex flex-col justify-between items-start"
            >
              <input
                type="text"
                {...register("text")}
                placeholder="Опишите свой проект"
                className="outline-none bg-transparent text-[white] placeholder-[white] border-b-2 border-[white] block w-full mb-5"
              />
              <button className="bg-[white] px-[20px] py-[10px] rounded-[10px] text-[#2E2BD0] mt-auto">
                Отправить
              </button>
            </form>
            <ul className="bg-[white] basis-[40%] rounded-[40px] py-[15px]">
              {isSuccess &&
                data?.map((el: any, idx: number) => (
                  <li
                    key={idx}
                    className={`mx-auto w-[80%] px-[5px] py-[15px] border-2 rounded-[25px] mb-2 ${
                      el.status === "canceled" && "border-[red] mb-2"
                    } ${el.status === "done" && "border-[green]"}
                        ${el.status === "pending" && "border-[gray]"} 
                    `}
                  >
                    <div>
                      <p>{el.text}</p>
                    </div>
                    {
                        el.status !== "pending"
                             &&
                        <p>message: {el.message}</p>
                    }

                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};
