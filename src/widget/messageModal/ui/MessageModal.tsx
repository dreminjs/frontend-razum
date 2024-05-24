
import { ModalLayout } from "../../../shared"


interface IProps {
    onCloseModal:() => void,
    message:string,
    isOpen:boolean,
    status:string,
    text:string
}


export const MessageModal = ({message,isOpen,onCloseModal,status,text} : IProps) => {

    return (
        <ModalLayout styles={`rounded-3xl`} isOpen={isOpen} onCloseModal={onCloseModal}>
            <p className="underline mb-5 text-xl">{text}</p>
            <p className="mb-2">
                статус: {status === "pending" && "в ожидании..."} {status === "done" && "готово!"} {status === "canceled" && "отказано!"}
             </p>
             <p className="mb-2">
                {message && <p>сообщение от админа : {message}</p>}
             </p>
            <button className="bg-[#2E2BD0] text-white px-[30px] py-[5px] rounded-lg" onClick={onCloseModal}>
                Закрыть
            </button>
        </ModalLayout>
    )
}