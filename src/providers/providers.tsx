"use client";
import { store } from "@/containers/store";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import LangProvider from "@/components/lang-provider";
import { Locale } from "@/utils/i18nConfig";


type ProvidersProps = {
  children: ReactNode;
  locale: Locale
};

function Providers({children, locale}: ProvidersProps) {
  return (   
    <Provider store={store}>
      <LangProvider lang={locale}>
           <Toaster />
           {children}
           </LangProvider>
    </Provider>
  );
}

export default Providers;
