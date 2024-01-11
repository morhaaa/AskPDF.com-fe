"use client";
import { store } from "@/containers/store";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

type ProvidersProps = {
  children: ReactNode;
};
function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <Toaster />
      {children}
    </Provider>
  );
}

export default Providers;
