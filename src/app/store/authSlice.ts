import { createSlice } from "@reduxjs/toolkit"

interface IStore {
    isAuth:boolean
}

const initialState:IStore = {
    isAuth:false,

}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state,{payload} : {payload:boolean}) {
            state.isAuth = payload
        }
    }
  })

export const {setAuth} = authSlice.actions