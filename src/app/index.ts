export {router} from "./router"

export type {RootState,AppDispatch} from "./store/store"

export {store} from "./store/store"

export {authApi,useSigninMutation,useSignupMutation,useUserQuery} from "./store/authApi"

export{useGetMyOrdersQuery,useCreateOrderMutation,useChechOrderMutation,useGetPendingOrdersQuery} from "./store/orderApi"

import {setAdmin,setAuth} from "./store/authSlice"