import React, { ReactNode, useEffect } from "react";
import { Locale } from "@/utils/i18nConfig";
import useTranslations from "@/hooks/useTranslations";

interface LangProviderProps{
  lang: Locale,
  children: ReactNode
}

function LangProvider({lang, children} : LangProviderProps) {

  const { setLang } = useTranslations()

  useEffect(() => {
    setLang(lang)
  }, [lang, setLang]);

  return <div>{children}</div>;
}

export default LangProvider;
