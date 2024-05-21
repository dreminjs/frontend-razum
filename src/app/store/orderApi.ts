import { baseApi } from "./baseApi";




export const orderApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        getMyOrders:builder.query({
            query:() => ({
                url:"order",
                credentials:"include"
            })
        }),
        chechOrder:builder.mutation({
            query:({body,id}) => ({
                url:`order/${id}`,
                credentials:"include",
                body,
                method:"PUT"
            })
        }),
        getPendingOrders:builder.query({
            query:() => ({
                url:"order/admin",
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
                    "userId":String(userId)
                }
            })
        })
    })
})

export const {useGetMyOrdersQuery,useCreateOrderMutation,useChechOrderMutation,useGetPendingOrdersQuery,} = orderApi