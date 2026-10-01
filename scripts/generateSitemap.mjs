// Genera public/sitemap.xml con las páginas fijas + los artículos del blog (Firestore).
// Se ejecuta antes de cada build: `pnpm run build` (o solo: `pnpm run sitemap`).
// Si no puede leer Firestore, conserva el sitemap actual y no detiene el build.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT = resolve(ROOT, 'public/sitemap.xml');
const DOMAIN = 'https://hansruiztrauma.com.mx';

const PROCEDURES = [
  'ankle', 'cervicalSpine', 'clavicle', 'elbow', 'femur', 'foot', 'forearm', 'hand',
  'hip', 'humerus', 'knee', 'lumbarSpine', 'shoulder', 'thoracicSpine', 'tibiaFibula', 'wrist',
];

const STATIC_PAGES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/procedures', changefreq: 'monthly', priority: '0.8' },
  ...PROCEDURES.map((id) => ({ path: `/procedures/${id}`, changefreq: 'monthly', priority: '0.7' })),
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
  { path: '/blog', changefreq: 'daily', priority: '0.9' },
  { path: '/preguntas', changefreq: 'weekly', priority: '0.7' },
];

function loadEnv() {
  const env = { ...process.env };
  try {
    for (const line of readFileSync(resolve(ROOT, '.env'), 'utf8').split(/\r?\n/)) {
      const match = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
      if (match && !(match[1] in env)) env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
    }
  } catch {
    // Sin .env: se usan solo las variables del entorno
  }
  return env;
}

// Lee la colección `posts` con la API REST de Firestore (lectura pública)
async function fetchPosts({ VITE_FIREBASE_PROJECT_ID: projectId, VITE_FIREBASE_API_KEY: apiKey }) {
  if (!projectId) throw new Error('Falta VITE_FIREBASE_PROJECT_ID');

  const base = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/posts`;
  const posts = [];
  let pageToken = '';

  do {
    const params = new URLSearchParams({ pageSize: '300' });
    if (apiKey) params.set('key', apiKey);
    if (pageToken) params.set('pageToken', pageToken);

    const res = await fetch(`${base}?${params}`);
    if (!res.ok) throw new Error(`Firestore respondió ${res.status}`);
    const data = await res.json();

    for (const doc of data.documents ?? []) {
      const fields = doc.fields ?? {};
      const slug = fields.slug?.stringValue;
      if (!slug || fields.published?.booleanValue === false) continue;
      posts.push({
        slug,
        lastmod: fields.publishedAt?.timestampValue ?? doc.updateTime,
      });
    }
    pageToken = data.nextPageToken ?? '';
  } while (pageToken);

  return posts.sort((a, b) => (b.lastmod ?? '').localeCompare(a.lastmod ?? ''));
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    lastmod && `    <lastmod>${lastmod.slice(0, 10)}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].filter(Boolean).join('\n');
}

async function main() {
  let posts;
  try {
    posts = await fetchPosts(loadEnv());
  } catch (err) {
    console.warn(`[sitemap] No se pudieron leer los artículos (${err.message}). Se conserva el sitemap actual.`);
    return;
  }

  const entries = [
    ...STATIC_PAGES.map((page) => urlEntry({ loc: `${DOMAIN}${page.path}`, ...page })),
    ...posts.map((post) =>
      urlEntry({
        loc: `${DOMAIN}/blog/${encodeURIComponent(post.slug)}`,
        lastmod: post.lastmod,
        changefreq: 'monthly',
        priority: '0.8',
      })
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;

  writeFileSync(OUTPUT, xml);
  console.log(`[sitemap] ${STATIC_PAGES.length} páginas + ${posts.length} artículos → public/sitemap.xml`);
}

main();
