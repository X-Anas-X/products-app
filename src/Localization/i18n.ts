import {I18n} from 'i18n-js';
import en from './en.json';
import sw from './sw.json';
import {store} from '../Store';

const i18n = new I18n({
  en: {...en},
  sw: {...sw},
});

i18n.defaultLocale = 'en';
i18n.locale = store.getState().ConfigsReducer.language || i18n.defaultLocale;
i18n.enableFallback = true;

store.subscribe(() => {
  const language = store.getState().ConfigsReducer.language;
  if (language !== i18n.locale) {
    i18n.locale = language || i18n.defaultLocale;
  }
});

export default i18n;
