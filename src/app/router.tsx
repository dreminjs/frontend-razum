import { createBrowserRouter } from "react-router-dom"
import { Home } from "../pages/home"
import { SignupPage } from "../pages/signup"
import { SigninPage } from "../pages/signin"
import { ContactUsPage } from "../pages/contact-us"
import { AdminPage } from "../pages/admin"


export const router = createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/signup",
        element:<SignupPage/>
    },
    {
        path:"/signin",
        element:<SigninPage/>
    },
    {
        path:'/contact-us',
        element:<ContactUsPage/>
    },
    {
        path:"/admin",
        element:<AdminPage/>
    }
])