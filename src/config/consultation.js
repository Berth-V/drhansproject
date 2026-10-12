// Precio de la consulta: cambiarlo SOLO aquí. Lo usan la app (i18n.js reemplaza {{price}} en los
// textos de es.json/en.json) y los scripts de build (datos estructurados de Google y llms.txt),
// así que este archivo no debe importar nada de Vite ni de React.
export const CONSULTATION_FEE = 1000;
export const CONSULTATION_CURRENCY = 'MXN';

// Texto que se muestra en la página, p. ej. "$1,000 MXN"
export const CONSULTATION_PRICE = `$${CONSULTATION_FEE.toLocaleString('en-US')} ${CONSULTATION_CURRENCY}`;
