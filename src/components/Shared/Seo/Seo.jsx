import { Helmet } from 'react-helmet-async';
import { SITES } from '../../../config/sites';
import { SITE_CONFIG } from '../../../config/siteConfig';

/**
 * Etiquetas SEO de cada página: título, descripción, canonical, hreflang y Open Graph.
 *
 * - path: ruta de la página ("/about"). El canonical usa el dominio activo.
 * - canonicalDomain: fuerza otro dominio para el canonical (artículos del blog).
 * - alternates: false para páginas que no tienen versión traducida.
 * - locale: idioma del contenido para Open Graph, si no es el del sitio.
 */
export default function Seo({
  title,
  description,
  path,
  type = 'website',
  image,
  canonicalDomain = SITE_CONFIG.domain,
  alternates = true,
  locale = SITE_CONFIG.ogLocale,
  children,
}) {
  const canonicalUrl = `${canonicalDomain}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {alternates &&
        Object.values(SITES).map((site) => (
          <link key={site.id} rel="alternate" hrefLang={site.htmlLang} href={`${site.domain}${path}`} />
        ))}
      {alternates && <link rel="alternate" hrefLang="x-default" href={`${SITES.mx.domain}${path}`} />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Dr. Hans Ruiz" />
      <meta property="og:locale" content={locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />

      {children}
    </Helmet>
  );
}
