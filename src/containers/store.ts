import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import langSlice from "./dictionary-slice";

export const store = configureStore({
  reducer: {
    user: authSlice.reducer,
    lang: langSlice.reducer,
  },
});

export type StoreType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
