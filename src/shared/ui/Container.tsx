import { ReactNode } from "react"

export const Container = ({children}:{children:ReactNode}) => {

    return (
        <div className="max-[900px]:max-w-[95%] max-w-[80%] mx-auto">{children}</div>
    )
}