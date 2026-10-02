// Datos de cada dominio. Lo usan la app, vite.config.js y los scripts de build,
// así que este archivo no debe importar nada de Vite ni de React.
export const SITES = {
  mx: {
    id: 'mx',
    language: 'es',
    htmlLang: 'es-MX',
    ogLocale: 'es_MX',
    domain: 'https://hansruiztrauma.com.mx',
  },
  us: {
    id: 'us',
    language: 'en',
    htmlLang: 'en-US',
    ogLocale: 'en_US',
    domain: 'https://hansruiztrauma.com',
  },
};

export const DEFAULT_SITE_ID = 'mx';

// Rutas públicas fijas (sitemap y enlaces alternos entre dominios)
export const PROCEDURE_IDS = [
  'ankle', 'cervicalSpine', 'clavicle', 'elbow', 'femur', 'foot', 'forearm', 'hand',
  'hip', 'humerus', 'knee', 'lumbarSpine', 'shoulder', 'thoracicSpine', 'tibiaFibula', 'wrist',
];

export const STATIC_PAGES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/procedures', changefreq: 'monthly', priority: '0.8' },
  ...PROCEDURE_IDS.map((id) => ({ path: `/procedures/${id}`, changefreq: 'monthly', priority: '0.7' })),
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
  { path: '/blog', changefreq: 'daily', priority: '0.9' },
  { path: '/preguntas', changefreq: 'weekly', priority: '0.7' },
  { path: '/privacyPolicy', changefreq: 'yearly', priority: '0.3' },
];

// Elige el sitio: en producción manda el dominio real (así, si se sube la carpeta
// equivocada, el idioma sigue siendo el correcto); en local, el modo del build.
export function resolveSiteId(hostname, buildSiteId) {
  const host = (hostname || '').toLowerCase();
  if (host.endsWith('hansruiztrauma.com.mx')) return 'mx';
  if (host.endsWith('hansruiztrauma.com')) return 'us';
  return SITES[buildSiteId] ? buildSiteId : DEFAULT_SITE_ID;
}
