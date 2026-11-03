// Genera sitemap.xml y robots.txt de cada dominio. Lo usa scripts/build.mjs.
// Los artículos del blog solo van en el sitemap de .com.mx: están en español y en .com
// su canonical apunta a .com.mx.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SITES, STATIC_PAGES } from '../src/config/sites.js';

export function loadEnv(root) {
  const env = { ...process.env };
  try {
    for (const line of readFileSync(resolve(root, '.env'), 'utf8').split(/\r?\n/)) {
      const match = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
      if (match && !(match[1] in env)) env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
    }
  } catch {
    // Sin .env: se usan solo las variables del entorno
  }
  return env;
}

// Lee los `posts` publicados con la API REST de Firestore. La consulta filtra por published == true
// porque las reglas solo dejan leer esos (los borradores son del doctor)
export async function fetchPosts({ VITE_FIREBASE_PROJECT_ID: projectId, VITE_FIREBASE_API_KEY: apiKey }) {
  if (!projectId) throw new Error('Falta VITE_FIREBASE_PROJECT_ID');

  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery${apiKey ? `?key=${apiKey}` : ''}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: 'posts' }],
        where: {
          fieldFilter: { field: { fieldPath: 'published' }, op: 'EQUAL', value: { booleanValue: true } },
        },
      },
    }),
  });
  if (!res.ok) throw new Error(`Firestore respondió ${res.status}`);

  const posts = [];
  for (const { document: doc } of await res.json()) {
    const fields = doc?.fields ?? {};
    const slug = fields.slug?.stringValue;
    if (!slug) continue;
    posts.push({
      slug,
      lastmod: fields.publishedAt?.timestampValue ?? doc.updateTime,
      title: fields.title?.stringValue ?? '',
      content: fields.content?.stringValue ?? '',
      imageUrl: fields.imageUrl?.stringValue ?? '',
    });
  }

  return posts.sort((a, b) => (b.lastmod ?? '').localeCompare(a.lastmod ?? ''));
}

function urlEntry({ loc, lastmod, changefreq, priority, alternates = [] }) {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    ...alternates.map(
      ({ hreflang, href }) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`
    ),
    lastmod && `    <lastmod>${lastmod.slice(0, 10)}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].filter(Boolean).join('\n');
}

// Cada página fija existe en los dos dominios: se enlazan entre sí con hreflang
function pageAlternates(path) {
  return [
    ...Object.values(SITES).map((s) => ({ hreflang: s.htmlLang, href: `${s.domain}${path}` })),
    { hreflang: 'x-default', href: `${SITES.mx.domain}${path}` },
  ];
}

export function buildSitemap(site, posts) {
  const entries = STATIC_PAGES.map((page) =>
    urlEntry({ loc: `${site.domain}${page.path}`, alternates: pageAlternates(page.path), ...page })
  );

  if (site.id === 'mx') {
    entries.push(
      ...posts.map((post) =>
        urlEntry({
          loc: `${site.domain}/blog/${encodeURIComponent(post.slug)}`,
          lastmod: post.lastmod,
          changefreq: 'monthly',
          priority: '0.8',
        })
      )
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
}

export function buildRobots(site) {
  return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /login

Sitemap: ${site.domain}/sitemap.xml
`;
}
