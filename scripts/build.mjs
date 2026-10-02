// Build de los dos dominios:
//   pnpm build      → dist/mx (hansruiztrauma.com.mx) y dist/us (hansruiztrauma.com)
//   pnpm build:mx   → solo dist/mx
//   pnpm build:us   → solo dist/us
// Cada carpeta se sube completa (incluye .htaccess) al public_html de su dominio en Hostinger.
import { existsSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import { SITES } from '../src/config/sites.js';
import { loadEnv, fetchPosts, buildSitemap, buildRobots } from './generateSitemap.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const requested = process.argv.slice(2);
const siteIds = requested.length ? requested : Object.keys(SITES);
const unknown = siteIds.filter((id) => !SITES[id]);
if (unknown.length) {
  console.error(`Sitio desconocido: ${unknown.join(', ')}. Opciones: ${Object.keys(SITES).join(', ')}`);
  process.exit(1);
}

// Quita lo que no sea una carpeta de sitio (restos de builds anteriores a dist/mx y dist/us)
const DIST = resolve(ROOT, 'dist');
if (existsSync(DIST)) {
  for (const entry of readdirSync(DIST)) {
    if (!SITES[entry]) rmSync(resolve(DIST, entry), { recursive: true, force: true });
  }
}

let posts = [];
try {
  posts = await fetchPosts(loadEnv(ROOT));
} catch (err) {
  console.warn(`\n[sitemap] AVISO: no se pudieron leer los artículos (${err.message}).`);
  console.warn('[sitemap] El sitemap de .com.mx saldrá sin artículos del blog. Vuelve a correr el build con conexión.\n');
}

for (const id of siteIds) {
  const site = SITES[id];
  const outDir = resolve(DIST, id);
  console.log(`\n▶ ${site.domain} → dist/${id}`);

  process.env.VITE_SITE = id;
  await build({
    root: ROOT,
    mode: 'production',
    build: { outDir, emptyOutDir: true },
  });

  writeFileSync(resolve(outDir, 'sitemap.xml'), buildSitemap(site, posts));
  writeFileSync(resolve(outDir, 'robots.txt'), buildRobots(site));
  console.log(`[sitemap] dist/${id}/sitemap.xml${id === 'mx' ? ` (incluye ${posts.length} artículos)` : ''} y robots.txt`);
}
