import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '@/containers/store';
import { Locale } from '@/utils/i18nConfig';
import { setLanguage } from '@/containers/i18nSlice';

export default function useTranslations() {

  const dispatch = useDispatch();
  const t = useSelector((state: StoreType) => state.i18n.translations);
  const lang = useSelector((state: StoreType) => state.i18n.lang);
  const setLang = (lang: Locale) => dispatch(setLanguage(lang));

  return { t, lang, setLang };

}