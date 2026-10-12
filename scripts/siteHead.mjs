// Genera las etiquetas de <head> de index.html para cada dominio (lo usa vite.config.js) y las
// de cada página prerenderizada (scripts/prerender.mjs). Son las que leen los buscadores y redes
// sociales sin ejecutar JavaScript; en el navegador, main.jsx quita las marcadas con
// data-static-seo y cada página pone las suyas con <Seo>.
import es from '../src/locales/es.json' with { type: 'json' };
import en from '../src/locales/en.json' with { type: 'json' };
import { SITES } from '../src/config/sites.js';
import { CONSULTATION_FEE, CONSULTATION_CURRENCY, CONSULTATION_PRICE } from '../src/config/consultation.js';

// Igual que i18n.js en la app: pone el precio de la consulta donde los textos dicen {{price}}
const withPrice = (node) =>
  typeof node === 'string'
    ? node.replaceAll('{{price}}', CONSULTATION_PRICE)
    : Object.fromEntries(Object.entries(node).map(([key, value]) => [key, withPrice(value)]));

export const LOCALES = { es: withPrice(es), en: withPrice(en) };

export const TEXTS = {
  es: {
    keywords:
      'traumatólogo Tijuana, ortopedista Tijuana, Dr Hans Ruiz, cirugía de columna Tijuana, cirugía ortopédica Tijuana, traumatología Baja California',
    physicianDescription:
      'Especialista en Traumatología y Ortopedia en Tijuana, Baja California. Cirugía de columna mínimamente invasiva, hernia discal, ciática, prótesis de rodilla y cadera y artroscopia de hombro y rodilla.',
    serviceName: 'Consulta de traumatología y ortopedia',
    saludableDescription: 'Consultorio vespertino, atención únicamente con cita previa.',
  },
  en: {
    keywords:
      'orthopedic surgeon Tijuana, spine surgeon Tijuana Mexico, Dr Hans Ruiz, knee replacement Tijuana, hip replacement Tijuana, orthopedic surgery Mexico, trauma surgeon Baja California',
    physicianDescription:
      'Orthopedic and trauma surgeon in Tijuana, Baja California, Mexico. Minimally invasive spine surgery, herniated disc, sciatica, knee and hip replacement, and shoulder and knee arthroscopy.',
    serviceName: 'Orthopedics and traumatology consultation',
    saludableDescription: 'Afternoon office, by appointment only.',
  },
};

export const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export const PHONE = '+526645410955';
export const DOCTOR_NAME = 'Dr. Hans Ruiz Serna';

// Consultorios (textos visibles en locales/*.json → offices.<id>.*)
export const OFFICES = [
  {
    id: 'blue',
    name: 'Hospital Blue',
    streetAddress: 'Vía Ote. 9750-903, Zona Urbana Rio Tijuana',
    postalCode: '22010',
    geo: { latitude: 32.5332576, longitude: -117.0225598 },
    mapsUrl: 'https://maps.app.goo.gl/dpBxPV4n5eVN1dWi9',
    opens: '09:00',
    closes: '14:00',
  },
  {
    id: 'saludable',
    name: 'Columna Saludable',
    streetAddress: 'Colinas de Baja California',
    postalCode: '22647',
    geo: { latitude: 32.4679242, longitude: -117.0044807 },
    mapsUrl: 'https://maps.app.goo.gl/39v9PGX1rF4TtEBH6',
    opens: '16:00',
    closes: '18:00',
    appointmentOnly: true,
  },
];

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const postalAddress = (office) => ({
  '@type': 'PostalAddress',
  streetAddress: office.streetAddress,
  addressLocality: 'Tijuana',
  addressRegion: 'Baja California',
  postalCode: office.postalCode,
  addressCountry: 'MX',
});

const openingHours = (office) => ({
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: WEEKDAYS,
  opens: office.opens,
  closes: office.closes,
});

// El doctor (Physician es un tipo de LocalBusiness) con la dirección de su consultorio principal,
// y cada consultorio como MedicalClinic propio, enlazados con @id
function physicianSchema(site, text) {
  const offices = OFFICES.map((office) => ({
    '@type': 'MedicalClinic',
    '@id': `${site.domain}/#${office.id}`,
    name: office.name,
    ...(office.appointmentOnly && { description: text.saludableDescription }),
    telephone: PHONE,
    address: postalAddress(office),
    geo: { '@type': 'GeoCoordinates', ...office.geo },
    hasMap: office.mapsUrl,
    openingHoursSpecification: openingHours(office),
  }));
  const [main] = OFFICES;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Physician',
        '@id': `${site.domain}/#physician`,
        name: DOCTOR_NAME,
        description: text.physicianDescription,
        url: site.domain,
        telephone: PHONE,
        priceRange: CONSULTATION_PRICE,
        makesOffer: {
          '@type': 'Offer',
          price: String(CONSULTATION_FEE),
          priceCurrency: CONSULTATION_CURRENCY,
          itemOffered: { '@type': 'Service', name: text.serviceName },
        },
        medicalSpecialty: ['Traumatology', 'Orthopedic Surgery'],
        address: postalAddress(main),
        geo: { '@type': 'GeoCoordinates', ...main.geo },
        openingHoursSpecification: OFFICES.map(openingHours),
        location: offices.map((office) => ({ '@id': office['@id'] })),
        sameAs: ['https://www.doctoralia.com.mx/hans-ruiz-serna/traumatologo-ortopedista/tijuana'],
        areaServed: { '@type': 'City', name: 'Tijuana' },
      },
      ...offices,
    ],
  };
}

export const jsonLdScript = (data, attrs = '') =>
  `<script${attrs} type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

// Marcas que delimitan las etiquetas propias de cada página (scripts/prerender.mjs las reemplaza)
export const SEO_START = '<!-- SEO:START -->';
export const SEO_END = '<!-- SEO:END -->';

/**
 * Etiquetas SEO de una página, igual que src/components/Shared/Seo/Seo.jsx.
 * Llevan data-static-seo para que main.jsx las quite y no se dupliquen con las de <Seo>.
 */
export function renderSeoTags({
  site,
  title,
  description,
  path,
  canonicalDomain = site.domain,
  alternates = true,
  type = 'website',
  image,
  locale = site.ogLocale,
  jsonLd,
}) {
  const canonicalUrl = `${canonicalDomain}${path}`;
  const tags = [
    `<title data-static-seo>${escapeAttr(title)}</title>`,
    `<meta data-static-seo name="description" content="${escapeAttr(description)}" />`,
    `<link data-static-seo rel="canonical" href="${escapeAttr(canonicalUrl)}" />`,
  ];
  if (alternates) {
    for (const s of Object.values(SITES)) {
      tags.push(`<link data-static-seo rel="alternate" hreflang="${s.htmlLang}" href="${escapeAttr(`${s.domain}${path}`)}" />`);
    }
    tags.push(`<link data-static-seo rel="alternate" hreflang="x-default" href="${escapeAttr(`${SITES.mx.domain}${path}`)}" />`);
  }
  tags.push(
    `<meta data-static-seo property="og:type" content="${type}" />`,
    `<meta data-static-seo property="og:site_name" content="Dr. Hans Ruiz" />`,
    `<meta data-static-seo property="og:locale" content="${locale}" />`,
    `<meta data-static-seo property="og:title" content="${escapeAttr(title)}" />`,
    `<meta data-static-seo property="og:description" content="${escapeAttr(description)}" />`,
    `<meta data-static-seo property="og:url" content="${escapeAttr(canonicalUrl)}" />`
  );
  if (image) tags.push(`<meta data-static-seo property="og:image" content="${escapeAttr(image)}" />`);
  tags.push(`<meta data-static-seo name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`);
  if (jsonLd) tags.push(jsonLdScript(jsonLd, ' data-static-seo'));

  return `${SEO_START}\n  ${tags.join('\n  ')}\n  ${SEO_END}`;
}

export function renderSiteHead(site) {
  const { title, description } = LOCALES[site.language].seo.home;
  const text = TEXTS[site.language];
  const schema = JSON.stringify(physicianSchema(site, text), null, 2).replace(/</g, '\\u003c');

  return `${renderSeoTags({ site, title, description, path: '/' })}
  <meta name="keywords" content="${escapeAttr(text.keywords)}" />

  <!-- Schema.org: Physician y sus consultorios -->
  <script type="application/ld+json">
${schema}
  </script>`;
}
