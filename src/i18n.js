import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { SITE_CONFIG } from './config/siteConfig';
import { CONSULTATION_PRICE } from './config/consultation';

import en from './locales/en.json';
import es from './locales/es.json';

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      es: { translation: es }
    },
    lng: SITE_CONFIG.language,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
      // {{price}} en los textos: precio de la consulta (src/config/consultation.js)
      defaultVariables: { price: CONSULTATION_PRICE }
    }
  });
}

export default i18n;