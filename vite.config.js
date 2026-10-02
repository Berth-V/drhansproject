import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { SITES, DEFAULT_SITE_ID } from './src/config/sites.js';
import { renderSiteHead } from './scripts/siteHead.mjs';

// https://vite.dev/config/
// Sitio: VITE_SITE (lo pone scripts/build.mjs) o el modo (`vite --mode us`). Por defecto, .com.mx
export default defineConfig(({ mode }) => {
  const siteId = SITES[process.env.VITE_SITE]
    ? process.env.VITE_SITE
    : SITES[mode]
      ? mode
      : DEFAULT_SITE_ID;
  const site = SITES[siteId];

  // Vite expone en import.meta.env las variables VITE_* que ya existen en process.env
  process.env.VITE_SITE = siteId;

  return {
    plugins: [
      react(),
      {
        name: 'site-head',
        transformIndexHtml: (html) =>
          html
            .replace('%SITE_HTML_LANG%', site.htmlLang)
            .replace('<!-- SITE_HEAD -->', renderSiteHead(site)),
      },
    ],
  };
});
