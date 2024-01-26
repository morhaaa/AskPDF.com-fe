import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import i18nSlice from "./i18nSlice";

export const store = configureStore({
  reducer: {
    user: authSlice.reducer,
    i18n: i18nSlice.reducer,
  },
});

export type StoreType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
