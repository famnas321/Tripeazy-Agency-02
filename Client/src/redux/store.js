import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlices"


export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});