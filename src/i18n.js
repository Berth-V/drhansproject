import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import es from './locales/es.json';

const hostname = window.location.hostname;
const defaultLng = hostname.includes('.mx') ? 'es' : 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en
    },
    es: {
      translation: es
    }
  },
  lng: defaultLng,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
