import { ReactNode } from "react"
import { Header } from "../../features/header"
import { Container } from "./Container"





export const Layout = ({children}:{children:ReactNode}) => {

    return (
        <div className="bg-[url('../../../src/assets/bg-spa.jpg')] min-h-screen bg-cover bg-no-repeat bg-center ">
        <Header />
        <Container>
            {children}
        </Container>
        </div>
    )
}