import type { Locale } from "@/utils/i18nConfig";

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  it: () => import("./it.json").then((module) => module.default),
};

export type Dictionary = { [key: string]: string };

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]?.() ?? dictionaries.en();
