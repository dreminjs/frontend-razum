
import { ModalLayout } from "../../../shared/"


interface IProps {
    onChangeMessage:(e:any) => void,
    message:string,
    isOpen:boolean,
    onCloseModal:() => void,
    onSendAnswer:(data:any) => void
}

export const MessageModal = ({onChangeMessage,onCloseModal,isOpen,message,onSendAnswer}:IProps) => {


    return (
        <ModalLayout onCloseModal={onCloseModal} isOpen={isOpen}>
            <div>
                <input className="block outline-none border-b-2 mb-2" placeholder="message" type="text" onChange={onChangeMessage} defaultValue={message}/>
                <button onClick={onSendAnswer} className="border-2 p-[5px]">send message</button>
            </div>
        </ModalLayout>
    )
}