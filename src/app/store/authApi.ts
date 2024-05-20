import { baseApi } from "./baseApi";



export const authApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        signup:builder.mutation({
            query:(body) => ({
                body,
                method:"POST",
                url:"/auth/signup"
            })
        }),
        signin:builder.mutation({
            query:(body) => ({
                body,
                method:"POST",
                url:"/auth/signin"
            })
        }),
        user:builder.query({
            query:(body) => ({
                body,
                method:"GET",
                url:"/user"
            })
        }),
    })
})

export const {useSigninMutation,useSignupMutation,useUserQuery} = authApi