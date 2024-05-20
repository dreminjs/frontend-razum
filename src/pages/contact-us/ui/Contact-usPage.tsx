import { Container } from "../../../shared"
import { Header } from "../../../features/header"



export const ContactUsPage = () => {



    return (
        <div className="bg-[url('../../../src/assets/bg-spa.jpg')] min-h-screen bg-cover bg-no-repeat bg-center ">
            <Header/>
            <Container>
                <div className="bg-[#55C7D8] py-[25px] rounded-[75px] px-[100px]">
                    <h3 className="text-[44px] text-[white] text-center">Свяжись с нами</h3>
                    <div className="flex justify-between">
                        <form className="basis-[40%] flex flex-col justify-between items-start">
                            <input type="text" placeholder="Опишите свой проект" className="outline-none bg-transparent text-[white] placeholder-[white] border-b-2 border-[white] block w-full" />
                            <button className="bg-[white] px-[20px] py-[10px] rounded-[10px] text-[#2E2BD0] mt-auto">Отправить</button>
                        </form>
                        <ul className="h-[600px] bg-[white] basis-[40%] rounded-[40px]">123</ul>
                    </div>
                </div>
            </Container>
        </div>
    )
}