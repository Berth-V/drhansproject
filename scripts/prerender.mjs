// Crea un HTML por página (about.html, procedures/knee.html, blog/<slug>.html, ...) con su título,
// descripción, canonical, hreflang y Open Graph ya escritos. Así Facebook, WhatsApp, X y los
// buscadores ven las etiquetas correctas sin ejecutar JavaScript. La app es la misma en todas:
// React arranca igual y main.jsx reemplaza estas etiquetas por las de <Seo>.
// .htaccess sirve /about → about.html, y si no existe el archivo cae a index.html.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { SITES, PROCEDURE_IDS } from '../src/config/sites.js';
import { LOCALES, SEO_START, SEO_END, renderSeoTags } from './siteHead.mjs';
import proceduresEs from '../src/components/Procedures/data/proceduresData.es.js';
import proceduresEn from '../src/components/Procedures/data/proceduresData.js';

const PROCEDURES = { es: proceduresEs, en: proceduresEn };

// Rutas fijas → clave de textos en locales/*.json (seo.<clave>)
const STATIC_ROUTES = [
  { path: '/about', key: 'about' },
  { path: '/procedures', key: 'procedures' },
  { path: '/contact', key: 'contact' },
  { path: '/blog', key: 'blog' },
  { path: '/preguntas', key: 'questions' },
  { path: '/privacyPolicy', key: 'privacy' },
];

const ENTITIES = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };

// Texto plano del contenido del post, igual que getMetaDescription en BlogPost.jsx
function metaDescription(html) {
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => {
      if (code[0] === '#') {
        const n = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
        return Number.isNaN(n) ? match : String.fromCodePoint(n);
      }
      return ENTITIES[code.toLowerCase()] ?? match;
    })
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > 155 ? `${text.slice(0, 155).trim()}…` : text;
}

const fill = (template, values) =>
  template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? '');

export function prerenderSite({ site, outDir, posts }) {
  const template = readFileSync(resolve(outDir, 'index.html'), 'utf8');
  const start = template.indexOf(SEO_START);
  const end = template.indexOf(SEO_END);
  if (start === -1 || end === -1) throw new Error('index.html no tiene las marcas SEO:START / SEO:END');

  const seo = LOCALES[site.language].seo;
  const pages = [];

  for (const { path, key } of STATIC_ROUTES) {
    pages.push({ path, title: seo[key].title, description: seo[key].description });
  }

  const procedures = PROCEDURES[site.language];
  for (const id of PROCEDURE_IDS) {
    const part = procedures[id];
    if (!part) continue;
    pages.push({
      path: `/procedures/${id}`,
      title: fill(seo.procedureDetail.title, { part: part.title }),
      description: fill(seo.procedureDetail.description, { part: part.title.toLowerCase() }),
    });
  }

  // Los artículos están en español en los dos dominios: canonical a .com.mx, sin hreflang
  for (const post of posts) {
    if (!post.title || !/^[\w-]+$/.test(post.slug)) continue;
    pages.push({
      path: `/blog/${post.slug}`,
      title: `${post.title} | ${seo.blogPost.titleSuffix}`,
      description: metaDescription(post.content),
      canonicalDomain: SITES.mx.domain,
      alternates: false,
      type: 'article',
      image: post.imageUrl || undefined,
      locale: SITES.mx.ogLocale,
    });
  }

  for (const page of pages) {
    const html =
      template.slice(0, start) + renderSeoTags({ site, ...page }) + template.slice(end + SEO_END.length);
    const file = resolve(outDir, `${page.path.slice(1)}.html`);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
  }

  return pages.length;
}
