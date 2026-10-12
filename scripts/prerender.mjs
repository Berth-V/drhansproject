// Crea un HTML por página (about.html, procedures/knee.html, blog/<slug>.html, ...) con:
//  - su título, descripción, canonical, hreflang y Open Graph (lo que leen Facebook, WhatsApp, X y buscadores)
//  - el texto de la página dentro de #root, capturado con Puppeteer (scripts/snapshot.mjs), para los
//    bots de IA que no ejecutan JavaScript. En el navegador ese texto se oculta (ver index.html).
// La app es la misma en todas: React arranca igual y main.jsx reemplaza las etiquetas por las de <Seo>.
// Archivos especiales:
//  - index.html: el home, con su contenido.
//  - app.html: index.html sin contenido, para las rutas que solo resuelve la app (/admin, /login y
//    artículos publicados después del último build). Ver public/.htaccess.
//  - 404.html: la página de "no encontrada" con noindex; .htaccess la sirve con código 404.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { SITES, PROCEDURE_IDS } from '../src/config/sites.js';
import { DOCTOR_NAME, LOCALES, SEO_START, SEO_END, escapeAttr, renderSeoTags } from './siteHead.mjs';
import { snapshotPages } from './snapshot.mjs';
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

// Ruta que no existe en la app: se captura como 404.html
const NOT_FOUND_PATH = '/pagina-no-encontrada-404';

const ROOT_EMPTY = '<div id="root"></div>';

const ENTITIES = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };

// Texto plano del contenido del post, igual que getMetaDescription en BlogPost.jsx
export function metaDescription(html) {
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

// Mismo JSON-LD que pone BlogPost.jsx con <Seo>
function articleSchema(post, description) {
  const domain = SITES.mx.domain;
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    headline: post.title,
    description,
    url: `${domain}/blog/${post.slug}`,
    inLanguage: 'es',
    ...(post.lastmod && { datePublished: post.lastmod }),
    ...(post.imageUrl && { image: post.imageUrl }),
    author: { '@type': 'Physician', name: DOCTOR_NAME, url: domain },
    publisher: { '@type': 'Physician', name: DOCTOR_NAME },
  };
}

// Páginas de un sitio con sus etiquetas SEO
function sitePages(site, posts) {
  const seo = LOCALES[site.language].seo;
  const pages = [{ path: '/', file: 'index.html', ...seo.home }];

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
    const description = metaDescription(post.content);
    pages.push({
      path: `/blog/${post.slug}`,
      title: `${post.title} | ${seo.blogPost.titleSuffix}`,
      description,
      canonicalDomain: SITES.mx.domain,
      alternates: false,
      type: 'article',
      image: post.imageUrl || undefined,
      locale: SITES.mx.ogLocale,
      jsonLd: articleSchema(post, description),
    });
  }

  return pages;
}

export async function prerenderSite({ root, site, outDir, posts }) {
  const template = readFileSync(resolve(outDir, 'index.html'), 'utf8');
  const start = template.indexOf(SEO_START);
  const end = template.indexOf(SEO_END);
  if (start === -1 || end === -1) throw new Error('index.html no tiene las marcas SEO:START / SEO:END');
  if (!template.includes(ROOT_EMPTY)) throw new Error(`index.html no tiene ${ROOT_EMPTY}`);

  const pages = sitePages(site, posts);

  // Antes de tocar index.html: la copia vacía para las rutas que solo resuelve la app
  writeFileSync(resolve(outDir, 'app.html'), template);

  let contents = {};
  try {
    contents = await snapshotPages({
      root,
      outDir,
      language: site.language,
      paths: [...pages.map((page) => page.path), NOT_FOUND_PATH],
    });
  } catch (err) {
    console.warn(`[prerender] AVISO: no se pudo capturar el contenido (${err.message.split('\n')[0]}).`);
    console.warn('[prerender] Las páginas salen solo con sus etiquetas SEO.');
  }

  const render = (headTags, content) => {
    const body = content ? `<div id="root"><div data-prerendered>${content}</div></div>` : ROOT_EMPTY;
    return (template.slice(0, start) + headTags + template.slice(end + SEO_END.length)).replace(
      ROOT_EMPTY,
      () => body
    );
  };

  for (const page of pages) {
    const file = resolve(outDir, page.file ?? `${page.path.slice(1)}.html`);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, render(renderSeoTags({ site, ...page }), contents[page.path]));
  }

  const notFoundTitle = LOCALES[site.language].seo.notFound.title;
  writeFileSync(
    resolve(outDir, '404.html'),
    render(
      `${SEO_START}\n  <title data-static-seo>${escapeAttr(notFoundTitle)}</title>\n  <meta data-static-seo name="robots" content="noindex" />\n  ${SEO_END}`,
      contents[NOT_FOUND_PATH]
    )
  );

  const withContent = pages.filter((page) => contents[page.path]).length;
  return { pages: pages.length, withContent };
}
