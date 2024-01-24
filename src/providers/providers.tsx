"use client";
import LangProvider from "@/components/lang-provider";
import { store } from "@/containers/store";
import { Locale } from "@/utils/i18nConfig";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

type ProvidersProps = {
  children: ReactNode;
  lang: Locale;
};
function Providers({ children, lang }: ProvidersProps) {
  return (
    <Provider store={store}>
      <Toaster />
      <LangProvider lang={lang}>{children}</LangProvider>
    </Provider>
  );
}

export default Providers;
