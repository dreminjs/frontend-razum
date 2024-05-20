import { ReactNode } from "react"

export const Container = ({children}:{children:ReactNode}) => {

    return (
        <div className="max-w-[80%] mx-auto">{children}</div>
    )
}