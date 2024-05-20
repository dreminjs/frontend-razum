import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
import { authSlice } from "./authSlice";

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [authSlice.name]: authSlice.reducer,
});
