import { createSlice } from "@reduxjs/toolkit"

interface IStore {
    isAuth:boolean,
    isAdmin:boolean,
}

const initialState:IStore = {
    isAuth:false,
    isAdmin:false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state,{payload} : {payload:boolean}) {
            state.isAuth = payload
        },
        setAdmin(state,{payload} : {payload:boolean}) {
            state.isAdmin = payload
        }
    }
  })

export const {setAuth,setAdmin} = authSlice.actions