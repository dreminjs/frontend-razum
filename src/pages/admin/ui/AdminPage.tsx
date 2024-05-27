import { useEffect, useState } from "react";
import { useChechOrderMutation, useGetPendingOrdersQuery } from "../../../app";
import { SendMessageModal } from "../../../widget/messageModal";
import { Container, useAppSelector } from "../../../shared";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../features/header";
import { Layout } from "../../../shared/ui/Layout";
import { ResponseMessageModal } from "../../../features/ResponseMessageModal";

export const AdminPage = () => {
  const [checkOrder, { isSuccess: checkOrderIsSuccess }] =
    useChechOrderMutation();

  const { data: pendingOrders, refetch,isSuccess,isLoading,isError } = useGetPendingOrdersQuery("");

  const { isAdmin } = useAppSelector((state) => state.auth);

  const [message, setMessage] = useState("");

  const [id, setId] = useState("");

  const handleChangeTextMessage = (e: any) => setMessage(e.target.value);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);

  const [isRejected, setIsRejected] = useState(false);

  const navigate = useNavigate();

  const handleAllowOrder = (e: any) => {
    setIsModalOpen(true);
    setIsRejected(false);
    setId(e.target.id);
  };

  const handleCancelOrder = (e: any) => {
    setIsModalOpen(true);
    setIsRejected(true);
    setId(e.target.id);
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin]);

  const onSubmit = () => {
    if (message.length >= 1) {
      checkOrder({
        body: { message, status: isRejected ? "canceled" : "done" },
        id,
      });
      setIsResponseModalOpen(false)
      setMessage("");
    }
  };

  useEffect(() => {
    if (checkOrderIsSuccess) {
      setIsRejected(false);
      setIsModalOpen(false);
      setIsResponseModalOpen(false)
      refetch();
    }
  }, [checkOrderIsSuccess]);

  useEffect(() => {
    if (isLoading) {
      setMessage("Loading...");
      setIsResponseModalOpen(true);
      const id = setTimeout(() => {
        setMessage("");
        setIsResponseModalOpen(false);
        return () => clearTimeout(id);
      }, 3500);
    }

    if (isError) {
      setMessage("Проверте данные которые вы ввели");
      setIsResponseModalOpen(true);
      const id = setTimeout(() => {
        setMessage("");
        setIsResponseModalOpen(false);
        return () => clearTimeout(id);
      }, 3500);
    }
  }, [isLoading, isError]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Layout>
      <div className="bg-[#55C7D8] py-[25px] rounded-[75px] max-[700px]:px-[0px] px-[50px] max-[1200px]:w-[95%] w-[85%] mx-auto">
        <h3 className="text-3xl text-center mt-[10px] mb-[30px] text-[white]">
          Админ панель
        </h3>
        <h3 className="mb-[15px] text-2xl text-center text-[white]">Заявки</h3>
        <ul className="list-none mx-auto max-[1200px]:w-[75%] w-[50%] bg-[white] basis-[40%] rounded-[40px] py-[15px] h-[calc(100vh-400px)] overflow-auto px-5 py-5">
          {pendingOrders?.map((order: any, idx: number) => (
            <li className="mb-[15px] border-2 px-[10px] py-[5px]" key={idx}>
              <p className=" text-[20px]">{order.text}</p>
              <div>
                <button
                  id={order.id}
                  onClick={handleAllowOrder}
                  className="text-[35px] mr-[15px]"
                >
                  ✅
                </button>
                <button
                  id={order.id}
                  onClick={handleCancelOrder}
                  className="text-[35px]"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
          {pendingOrders?.length === 0 && (
            <li className="text-center text-[white] text-[30px]">нет заявок</li>
          )}
        </ul>
        <SendMessageModal
          onCloseModal={handleCloseModal}
          message={message}
          isOpen={isModalOpen}
          onChangeMessage={handleChangeTextMessage}
          onSendAnswer={onSubmit}
        />
        <ResponseMessageModal
          message={message}
          onCloseModal={() => setIsModalOpen(false)}
          isOpen={isResponseModalOpen}
          isError={isError}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </div>
    </Layout>
  );
};
