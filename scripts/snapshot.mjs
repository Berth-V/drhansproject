// Abre el sitio ya construido en un Chrome invisible (Puppeteer), deja que React, i18next y Firestore
// pinten cada página igual que en el navegador de un paciente, y copia el HTML de #root.
// prerender.mjs lo mete en el archivo de cada página para que los bots que no ejecutan JavaScript
// (ChatGPT, Claude, Perplexity) lean el texto real. Lo usa scripts/prerender.mjs.
import { preview } from 'vite';
import puppeteer from 'puppeteer';
import { LOCALES } from './siteHead.mjs';

// Mientras alguno de estos textos ("Cargando...", "Cargando artículo...") siga en pantalla, la página no está lista
function loadingTexts(language) {
  const texts = [];
  const walk = (node) => {
    for (const [key, value] of Object.entries(node)) {
      if (typeof value === 'string' && key === 'loading') texts.push(value);
      else if (value && typeof value === 'object') walk(value);
    }
  };
  walk(LOCALES[language]);
  return texts;
}

// Imágenes, fuentes, mapas, videos y analítica no aportan texto: se bloquean (así tampoco cuentan visitas en GA)
const BLOCKED_TYPES = new Set(['image', 'media', 'font']);
const BLOCKED_HOSTS = /google-analytics\.com|googletagmanager\.com|maps\.google|maps\.googleapis|maps\.gstatic|youtube\.com|ytimg\.com|emailjs\.com/;

async function snapshotPage(browser, url, loading) {
  const page = await browser.newPage();
  try {
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (BLOCKED_TYPES.has(req.resourceType()) || BLOCKED_HOSTS.test(req.url())) req.abort();
      else req.continue();
    });

    // networkidle2 tolera las conexiones que Firestore deja abiertas
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60_000 });
    await page.waitForFunction(
      (texts) => {
        const root = document.getElementById('root');
        if (!root || !root.children.length) return false;
        const text = root.innerText;
        return !texts.some((t) => text.includes(t));
      },
      { timeout: 30_000, polling: 200 },
      loading
    );

    // Espera a que el contenido deje de cambiar (secciones lazy, artículos relacionados, etc.)
    let previous = -1;
    for (let i = 0; i < 20; i++) {
      const length = await page.evaluate(() => document.getElementById('root').innerHTML.length);
      if (length === previous) break;
      previous = length;
      await new Promise((r) => setTimeout(r, 400));
    }

    return await page.evaluate(() => {
      const clone = document.getElementById('root').cloneNode(true);
      // Sin íconos ni el esqueleto SVG (pesan mucho y no tienen texto), mapas, videos ni formularios
      clone.querySelectorAll('script, style, noscript, svg, iframe, video, canvas, form').forEach((n) => n.remove());
      // Los estilos en línea son de las animaciones (opacity: 0, transform...)
      clone.querySelectorAll('[style]').forEach((n) => n.removeAttribute('style'));
      return clone.innerHTML.trim();
    });
  } finally {
    await page.close();
  }
}

/**
 * Devuelve { [ruta]: html de #root } para cada ruta. Las que fallan se omiten con un aviso,
 * y esa página se queda solo con sus etiquetas SEO.
 */
export async function snapshotPages({ root, outDir, language, paths, concurrency = 4 }) {
  const server = await preview({
    root,
    configFile: false,
    logLevel: 'silent',
    build: { outDir },
    preview: { port: 4300, strictPort: false, open: false },
  });
  const baseUrl = server.resolvedUrls.local[0].replace(/\/$/, '');
  const browser = await puppeteer.launch({ headless: true });
  const loading = loadingTexts(language);
  const results = {};

  try {
    const queue = [...paths];
    const worker = async () => {
      while (queue.length) {
        const path = queue.shift();
        try {
          results[path] = await snapshotPage(browser, `${baseUrl}${path}`, loading);
        } catch (err) {
          console.warn(`[prerender] AVISO: ${path} se queda sin contenido (${err.message.split('\n')[0]})`);
        }
      }
    };
    await Promise.all(Array.from({ length: concurrency }, worker));
  } finally {
    await browser.close();
    await new Promise((resolve) => server.httpServer.close(resolve));
  }

  return results;
}
