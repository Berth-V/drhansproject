import partsDataEn from './partsData.json';
import partsDataEs from './partsData_es.json';
import i18n from '../../../../../i18n';

export function getPartsData() {
  const lang = i18n.language.startsWith('es') ? 'es' : 'en';
  return lang === 'es' ? partsDataEs : partsDataEn;
}