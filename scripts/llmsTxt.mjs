// Genera llms.txt de cada dominio: un resumen en texto del doctor, sus consultorios y las páginas del
// sitio para asistentes de IA (https://llmstxt.org). Lo usa scripts/build.mjs.
import { SITES, PROCEDURE_IDS } from '../src/config/sites.js';
import { CONSULTATION_PRICE } from '../src/config/consultation.js';
import { DOCTOR_NAME, LOCALES, OFFICES, PHONE, TEXTS } from './siteHead.mjs';
import { metaDescription } from './prerender.mjs';
import proceduresEs from '../src/components/Procedures/data/proceduresData.es.js';
import proceduresEn from '../src/components/Procedures/data/proceduresData.js';

const PROCEDURES = { es: proceduresEs, en: proceduresEn };

const LABELS = {
  es: {
    heading: 'Traumatólogo y Ortopedista en Tijuana, Baja California, México',
    fee: `Consulta: ${CONSULTATION_PRICE}`,
    phone: 'Teléfono y WhatsApp',
    otherLanguage: 'English version',
    offices: 'Consultorios',
    map: 'Mapa',
    pages: 'Páginas',
    procedures: 'Lesiones y tratamientos por zona del cuerpo',
    blog: 'Artículos del blog (en español)',
  },
  en: {
    heading: 'Orthopedic and Trauma Surgeon in Tijuana, Baja California, Mexico',
    fee: `Consultation: ${CONSULTATION_PRICE}`,
    phone: 'Phone and WhatsApp',
    otherLanguage: 'Versión en español',
    offices: 'Offices',
    map: 'Map',
    pages: 'Pages',
    procedures: 'Injuries and treatments by body area',
    blog: 'Blog articles (in Spanish)',
  },
};

const PAGES = [
  { path: '/about', key: 'about' },
  { path: '/procedures', key: 'procedures' },
  { path: '/contact', key: 'contact' },
  { path: '/blog', key: 'blog' },
  { path: '/preguntas', key: 'questions' },
];

const formatPhone = (phone) => phone.replace(/^\+52(\d{3})(\d{3})(\d{4})$/, '+52 $1 $2 $3');

export function buildLlmsTxt(site, posts) {
  const locale = LOCALES[site.language];
  const label = LABELS[site.language];
  const other = Object.values(SITES).find((s) => s.id !== site.id);
  const procedures = PROCEDURES[site.language];

  const lines = [
    `# ${DOCTOR_NAME}: ${label.heading}`,
    '',
    `> ${TEXTS[site.language].physicianDescription}`,
    '',
    `- ${label.fee}`,
    `- ${label.phone}: ${formatPhone(PHONE)}`,
    `- ${label.otherLanguage}: ${other.domain}/llms.txt`,
    '',
    `## ${label.offices}`,
    '',
    ...OFFICES.map((office) => {
      const text = locale.offices[office.id];
      const address = `${text.addressLine1} ${text.addressLine2}`.replace(/,\s*$/, '');
      const note = text.note ? ` | ${text.note}` : '';
      return `- ${text.name}: ${address} | ${text.days}, ${text.hours}${note} | ${label.map}: ${office.mapsUrl}`;
    }),
    '',
    `## ${label.pages}`,
    '',
    `- [${locale.seo.home.title}](${site.domain}/): ${locale.seo.home.description}`,
    ...PAGES.map(
      ({ path, key }) => `- [${locale.seo[key].title}](${site.domain}${path}): ${locale.seo[key].description}`
    ),
    '',
    `## ${label.procedures}`,
    '',
    ...PROCEDURE_IDS.filter((id) => procedures[id]).map(
      (id) => `- [${procedures[id].title}](${site.domain}/procedures/${id})`
    ),
  ];

  const articles = posts.filter((post) => post.title && /^[\w-]+$/.test(post.slug));
  if (articles.length) {
    lines.push(
      '',
      `## ${label.blog}`,
      '',
      ...articles.map(
        (post) => `- [${post.title}](${SITES.mx.domain}/blog/${post.slug}): ${metaDescription(post.content)}`
      )
    );
  }

  return `${lines.join('\n')}\n`;
}
