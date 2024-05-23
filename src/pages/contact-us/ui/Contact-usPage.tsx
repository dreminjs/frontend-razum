import { Container } from "../../../shared";
import { Header } from "../../../features/header";
import { useGetMyOrdersQuery, useCreateOrderMutation } from "../../../app/";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect,useState } from "react";
import { MessageModal } from "../../../widget/messageModal/ui/MessageModal";

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

  const [text,setText] = useState("")

  const [status,setStatus] = useState("")

  const [message,setMessage] = useState("")

  const [isModalOpen,setIsModalOpen] = useState(false)


  const handleOpenModal = (payload:any) => {
    setIsModalOpen(true)
    setStatus(payload.status)
    setText(payload.text)
    setMessage(payload.message)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

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


  return (
    <>
    <div className="bg-[url('../../../src/assets/bg-spa.jpg')] min-h-screen bg-cover bg-no-repeat bg-center py-[15px]">
      <Header />
      <Container>
        <div className="bg-[#55C7D8] py-[25px] rounded-[75px] max-[540px]:px-[10px] px-[100px]">
          <h3 className="text-[30px] min-[1000px]:text-[44px] text-[white] text-centerm mb-5">
            Свяжись с нами
          </h3>
          <div className="min-[1000px]:flex min-[1000px]:justify-between flex-wrap w-full">
            <form
              onSubmit={handleSubmit(submit)}
              className="basis-[40%] mb-[15px]"
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
                    <>                  
                      <div className="max-[1000px]:hidden">
                        <p>{el.text}</p>
                      </div>
                      {
                        el.status !== "pending"
                        &&
                        <p className="max-[1000px]:hidden">message: {el.message}</p>
                      }
                      <button onClick={handleOpenModal.bind(null,{status:el.status,text:el.text,message:el.message})} className="min-[1000px]:hidden w-full">
                          {el.text}
                      </button>
                    </>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
    <MessageModal
      isOpen={isModalOpen}
      onCloseModal={handleCloseModal}
      text={text}
      message=""
      status={status}
    />
    </>
  );
};
