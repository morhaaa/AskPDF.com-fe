import en from '@/dictionaries/en.json';
import it from '@/dictionaries/it.json';

export const i18n = {
  defaultLocale: "en",
  locales: ["en", "it"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export const defaultTranslation = en

export const getTranslations = (locale: Locale): Translations => {
 const translations: Record<Locale, Translations> = {
    en,
    it,
  };
  return translations[locale];
};

export interface Translations {
  [key: string]: any;
}
