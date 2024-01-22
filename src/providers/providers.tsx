"use client";
import { store } from "@/containers/store";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import MaxWithProvider from "./max-width-provider";

type ProvidersProps = {
  children: ReactNode;
};
function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <MaxWithProvider>
        <Toaster />
        {children}
      </MaxWithProvider>
    </Provider>
  );
}

export default Providers;
