import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import partsDataEn from './components/Home/Sections/Skeleton/data/partsData';
import partsDataEs from './components/Home/Sections/Skeleton/data/partsData_es';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      partsData: partsDataEn,
    },
    es: {
      partsData: partsDataEs,
    },
  },
  lng: 'es',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
