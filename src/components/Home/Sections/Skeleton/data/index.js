import i18n from '../../../../../i18n';

// Cada archivo pesa ~2 MB y cada dominio usa un solo idioma: se descarga únicamente el que toca.
// Home.jsx llama a loadPartsData() junto con la carga del esqueleto, antes de mostrarlo.
let partsData = [];

export function loadPartsData() {
  const lang = i18n.language.startsWith('es') ? 'es' : 'en';
  const load = lang === 'es' ? import('./partsData_es.json') : import('./partsData.json');
  return load.then((module) => {
    partsData = module.default;
  });
}

export function getPartsData() {
  return partsData;
}
