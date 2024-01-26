import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultTranslation, getTranslations, Locale, Translations } from '@/utils/i18nConfig';

interface I18nState {
  lang: Locale;
  translations: {
    [key: string]: Translations;
  };
}

const initialState: I18nState = {
  lang: 'en',
  translations: defaultTranslation
};

export const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Locale>) => {
      const translations = getTranslations(action.payload);
      state.lang = action.payload;
      state.translations= translations
    },
  },
});

export const selectTranslations = (state: { i18n: I18nState }) =>
  state.i18n.translations[state.i18n.lang];

export const { setLanguage } = i18nSlice.actions;

export default i18nSlice;
