import store from 'store';
import en from './en';
import vn from './vn';

import i18next from "i18next";
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them)
var defaultLang = 'vn';

var resources = {
  en: {
    translation: en
  },

  vn: {
    translation: vn
  }
};

i18next.use(initReactI18next) // passes i18n down to react-i18next
.init({
  resources: resources,
  lng: store.get('lang') || defaultLang,

  keySeparator: false, // we do not use keys in form messages.welcome

  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18n;