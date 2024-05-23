import { useEffect, useState } from "react";
import { useChechOrderMutation, useGetPendingOrdersQuery } from "../../../app";
import { sendMessageModal } from "../../../widget/messageModal";
import { useAppSelector } from "../../../shared";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../features/header";

export const AdminPage = () => {
  const [checkOrder, { isSuccess: checkOrderIsSuccess }] =
    useChechOrderMutation();

  const { data: pendingOrders, refetch } = useGetPendingOrdersQuery("");

  const { isAdmin } = useAppSelector((state) => state.auth);

  const [message, setMessage] = useState("");

  const [id, setId] = useState("");

  const handleChangeTextMessage = (e: any) => setMessage(e.target.value);

  const [isModalOpen, setIsModalOpen] = useState(false);

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

      setMessage("")
    }
  };

  useEffect(() => {
    if (checkOrderIsSuccess) {
      setIsRejected(false);
      setIsModalOpen(false);
      refetch();
    }
  }, [checkOrderIsSuccess]);

  useEffect(() => {
    refetch();
  }, []);

  console.log(pendingOrders)

  return (
    <div className="bg-[url('../../../src/assets/bg-spa.jpg')] min-h-screen bg-cover bg-no-repeat bg-center ">
      <Header />
      <div className="bg-[#55C7D8] py-[25px] rounded-[75px] px-[100px] w-[85%] mx-auto">
        <h3 className="text-3xl text-center mt-[10px] mb-[30px] text-[white]">
          Админ панель
        </h3>
        <h3 className="mb-[15px] text-2xl text-center text-[white]">Заявки</h3>
        <ul className="list-none mx-auto w-[50%]">
          {pendingOrders?.map((order: any, idx: number) => (
            <li className="mb-[15px] border-2 px-[10px] py-[5px]" key={idx}>
              <p className="text-white text-[20px]">{order.text}</p>
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
          {pendingOrders?.length === 0 && <li className="text-center text-[white] text-[30px]">нет заявок</li>}
        </ul>
        <sendMessageModal
          onCloseModal={handleCloseModal}
          message={message}
          isOpen={isModalOpen}
          onChangeMessage={handleChangeTextMessage}
          onSendAnswer={onSubmit}
        />
      </div>
    </div>
  );
};
