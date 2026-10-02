// Genera las etiquetas de <head> de index.html para cada dominio (lo usa vite.config.js) y las
// de cada página prerenderizada (scripts/prerender.mjs). Son las que leen los buscadores y redes
// sociales sin ejecutar JavaScript; en el navegador, main.jsx quita las marcadas con
// data-static-seo y cada página pone las suyas con <Seo>.
import es from '../src/locales/es.json' with { type: 'json' };
import en from '../src/locales/en.json' with { type: 'json' };
import { SITES } from '../src/config/sites.js';

export const LOCALES = { es, en };

const TEXTS = {
  es: {
    keywords:
      'traumatólogo Tijuana, ortopedista Tijuana, Dr Hans Ruiz, cirugía de columna Tijuana, cirugía ortopédica Tijuana, traumatología Baja California',
    physicianDescription:
      'Especialista en Traumatología y Ortopedia en Tijuana, Baja California. Cirugía de columna mínimamente invasiva, hernia discal, ciática, prótesis de rodilla y artroscopia de hombro y rodilla.',
    serviceName: 'Consulta de traumatología y ortopedia',
    saludableDescription: 'Consultorio vespertino, atención únicamente con cita previa.',
  },
  en: {
    keywords:
      'orthopedic surgeon Tijuana, spine surgeon Tijuana Mexico, Dr Hans Ruiz, knee replacement Tijuana, orthopedic surgery Mexico, trauma surgeon Baja California',
    physicianDescription:
      'Orthopedic and trauma surgeon in Tijuana, Baja California, Mexico. Minimally invasive spine surgery, herniated disc, sciatica, knee replacement, and shoulder and knee arthroscopy.',
    serviceName: 'Orthopedics and traumatology consultation',
    saludableDescription: 'Afternoon office, by appointment only.',
  },
};

export const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function physicianSchema(site, text) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: 'Dr. Hans Ruiz Serna',
    description: text.physicianDescription,
    url: site.domain,
    telephone: '+526645410955',
    priceRange: '$1,200 MXN',
    makesOffer: {
      '@type': 'Offer',
      price: '1200',
      priceCurrency: 'MXN',
      itemOffered: { '@type': 'Service', name: text.serviceName },
    },
    medicalSpecialty: ['Traumatology', 'Orthopedic Surgery'],
    affiliation: [
      {
        '@type': 'MedicalClinic',
        name: 'Hospital Blue',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Vía Ote. 9750-903, Zona Urbana Rio Tijuana',
          addressLocality: 'Tijuana',
          addressRegion: 'Baja California',
          postalCode: '22010',
          addressCountry: 'MX',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 32.5332576, longitude: -117.0225598 },
        hasMap: 'https://maps.app.goo.gl/dpBxPV4n5eVN1dWi9',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '14:00',
        },
      },
      {
        '@type': 'MedicalClinic',
        name: 'Columna Saludable',
        description: text.saludableDescription,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Colinas de Baja California',
          addressLocality: 'Tijuana',
          addressRegion: 'Baja California',
          postalCode: '22647',
          addressCountry: 'MX',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 32.4679242, longitude: -117.0044807 },
        hasMap: 'https://maps.app.goo.gl/39v9PGX1rF4TtEBH6',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '16:00',
          closes: '18:00',
        },
      },
    ],
    sameAs: ['https://www.doctoralia.com.mx/hans-ruiz-serna/traumatologo-ortopedista/tijuana'],
    areaServed: { '@type': 'City', name: 'Tijuana' },
  };
}

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

  return `${SEO_START}\n  ${tags.join('\n  ')}\n  ${SEO_END}`;
}

export function renderSiteHead(site) {
  const { title, description } = LOCALES[site.language].seo.home;
  const text = TEXTS[site.language];
  const schema = JSON.stringify(physicianSchema(site, text), null, 2).replace(/</g, '\\u003c');

  return `${renderSeoTags({ site, title, description, path: '/' })}
  <meta name="keywords" content="${escapeAttr(text.keywords)}" />

  <!-- Schema.org: Physician -->
  <script type="application/ld+json">
${schema}
  </script>`;
}
