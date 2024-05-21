import { Container } from "../../../shared"
import { Header } from "../../../features/header"
import {useGetMyOrdersQuery,useCreateOrderMutation} from "../../../app/"
import * as yup from "yup"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from "react";

const schema = yup.object({
    text:yup.string().required("введите текст").min(3,"минимальное кол-во символов 3").max(150,"максимальное кол-во символов 250"),
})

export const ContactUsPage = () => {

    const {data,isLoading,isSuccess,refetch} = useGetMyOrdersQuery("")

    const [createOrder,{isLoading:creatingOrderIsLoading,isSuccess:creatingOrderIsSuccess}] = useCreateOrderMutation()


    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });

    useEffect(() => {
        if(creatingOrderIsSuccess){
            refetch()
        }
    },[creatingOrderIsSuccess])

    const submit = (data:any) => createOrder({body:data,userId:localStorage.getItem("userId")},)

    return (
        <div className="bg-[url('../../../src/assets/bg-spa.jpg')] min-h-screen bg-cover bg-no-repeat bg-center ">
            <Header/>
            <Container>
                <div className="bg-[#55C7D8] py-[25px] rounded-[75px] px-[100px]">
                    <h3 className="text-[44px] text-[white] text-center">Свяжись с нами</h3>
                    <div className="flex justify-between">
                        <form onSubmit={handleSubmit(submit)} className="basis-[40%] flex flex-col justify-between items-start">
                            <input type="text" {...register('text')} placeholder="Опишите свой проект" className="outline-none bg-transparent text-[white] placeholder-[white] border-b-2 border-[white] block w-full" />
                            <button className="bg-[white] px-[20px] py-[10px] rounded-[10px] text-[#2E2BD0] mt-auto">Отправить</button>
                        </form>
                        <ul className="h-[600px] bg-[white] basis-[40%] rounded-[40px]">
                            {
                               isSuccess && data.map((el:any) => (
                                    <li>
                                        <p>
                                            {el.text}
                                        </p>
                                        <p>
                                            {el.status}
                                        </p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    )
}