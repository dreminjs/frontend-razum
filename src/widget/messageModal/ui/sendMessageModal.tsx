
import { ModalLayout } from "../../../shared"


interface IProps {
    onChangeMessage:(e:any) => void,
    message:string,
    isOpen:boolean,
    onCloseModal:() => void,
    onSendAnswer:(data:any) => void
}

export const sendMessageModal = ({onChangeMessage,onCloseModal,isOpen,message,onSendAnswer}:IProps) => {


    return (
        <ModalLayout styles="rounded-[30px]" onCloseModal={onCloseModal} isOpen={isOpen}>
            <div>
                <input className="block outline-none border-b-2 mb-5" placeholder="message" type="text" onChange={onChangeMessage} defaultValue={message}/>
                <button onClick={onSendAnswer} className="border-2 p-[5px] rounded-lg">send message</button>
            </div>
        </ModalLayout>
    )
}