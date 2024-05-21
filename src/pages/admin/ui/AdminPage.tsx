import { useEffect, useState } from "react";
import { useChechOrderMutation, useGetPendingOrdersQuery } from "../../../app";
import { MessageModal } from "../../../widget/messageModal";
import { useAppSelector } from "../../../shared";
import { useNavigate } from "react-router-dom";

export const AdminPage = () => {
  const [checkOrder, { isSuccess: checkOrderIsSuccess }] =
    useChechOrderMutation();

  const { data: pendingOrders,refetch } = useGetPendingOrdersQuery("");

  const { isAdmin } = useAppSelector(state => state.auth)

  const [message, setMessage] = useState("");

  const [id, setId] = useState("");

  const handleChangeTextMessage = (e: any) => setMessage(e.target.value);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);

  const [isRejected, setIsRejected] = useState(false);

  const navigate = useNavigate()

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
    if(!isAdmin){
      navigate("/")
    }
  },[isAdmin])

  const onSubmit = () => {

    if (message.length >= 1) {
      checkOrder({
        body: { message, status: isRejected ? "canceled" : "done" },
        id
      });
    }
  };

  useEffect(() => {
    if (checkOrderIsSuccess) {
      setIsRejected(false);
      setIsModalOpen(false)
      refetch()
    }
  }, [checkOrderIsSuccess]);

  return (
    <div>
      <h3 className="text-3xl text-center mt-[10px] mb-[30px]">Админ панель</h3>

      <h3 className="mb-[15px] text-2xl text-center">Заявки</h3>
      <ul className="list-none mx-auto w-[50%]">
        {pendingOrders?.map((order: any, idx: number) => (
          <li className="mb-[15px] border-2 px-[10px] py-[5px]" key={idx}>
            <p>{order.text}</p>
            <div>
              <button
                id={order.id}
                onClick={handleAllowOrder}
                className="text-[20px]"
              >
                ✅
              </button>
              <button
                id={order.id}
                onClick={handleCancelOrder}
                className="text-[20px]"
              >
                ❌
              </button>
            </div>
          </li>
        ))}
        {pendingOrders?.length === 0 && <li>нет заявок</li>}
      </ul>
      <MessageModal
        onCloseModal={handleCloseModal}
        message={message}
        isOpen={isModalOpen}
        onChangeMessage={handleChangeTextMessage}
        onSendAnswer={onSubmit}
      />
    </div>
  );
};
