import { baseApi } from "./baseApi";




export const orderApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        getMyOrders:builder.query({
            query:() => ({
                url:"order",
                credentials:"include"
            })
        }),
        createOrder:builder.mutation({
            query:({body,userId}) => ({
                url:"order",
                body,
                method:"POST",
                credentials:"include",
                headers:{
                    "userId":userId
                }
            })
        })
    })
})

export const {useGetMyOrdersQuery,useCreateOrderMutation} = orderApi