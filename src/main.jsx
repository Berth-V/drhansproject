import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import './i18n';
import { initAnalytics } from './analytics/analytics';
import { SITE_CONFIG } from './config/siteConfig';

// Las etiquetas SEO de index.html son el respaldo para buscadores y redes sociales;
// en el navegador cada página pone las suyas con <Seo>, así que se quitan para no duplicarlas.
document.querySelectorAll('[data-static-seo]').forEach((node) => node.remove());
document.documentElement.lang = SITE_CONFIG.htmlLang;

initAnalytics();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
