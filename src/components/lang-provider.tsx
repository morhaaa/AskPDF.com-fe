import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLang } from "@/containers/dictionary-slice";
import { AppDispatch } from "@/containers/store";
import { Locale } from "@/utils/i18nConfig";

function LangProvider({
  lang,
  children,
}: {
  lang: Locale;
  children: ReactNode;
}) {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setLang(lang));
  }, [lang, dispatch]);

  return <div>{children}</div>;
}

export default LangProvider;
