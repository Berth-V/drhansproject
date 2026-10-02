import { SITES, resolveSiteId } from './sites';

// Sitio activo: .com.mx (español) o .com (inglés). Ver src/config/sites.js
const siteId = resolveSiteId(
    typeof window !== 'undefined' ? window.location.hostname : '',
    import.meta.env.VITE_SITE
);

export const SITE_CONFIG = {
    ...SITES[siteId],
    ga4: 'G-V67EQJ7MC3'
};

// El otro dominio (para el selector de idioma y los enlaces hreflang)
export const ALTERNATE_SITE = Object.values(SITES).find((site) => site.id !== siteId);

// El blog solo se escribe en español: los artículos de ambos dominios apuntan a .com.mx
export const BLOG_CANONICAL_DOMAIN = SITES.mx.domain;

// Textos de cada consultorio en i18n: offices.<id>.*
export const OFFICES = [
    {
        id: 'blue',
        appointmentOnly: false,
        mapsUrl: 'https://maps.app.goo.gl/dpBxPV4n5eVN1dWi9',
        embedSrc:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3363.7307095367255!2d-117.02497272400664!3d32.53333847376642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d949ded0c8ef3d%3A0xf3151848b6171d2!2sDr%20Hans%20Ruiz%20Traumat%C3%B3logo!5e0!3m2!1sen!2smx!4v1759176342362!5m2!1sen!2smx'
    },
    {
        id: 'saludable',
        appointmentOnly: true,
        mapsUrl: 'https://maps.app.goo.gl/39v9PGX1rF4TtEBH6',
        embedSrc:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3365.5!2d-117.0044807!3d32.4679242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d93758f608dfa1%3A0xa143aee94bbb63b4!2sColumna%20Saludable!5e0!3m2!1ses!2smx!4v1759176342362!5m2!1ses!2smx'
    }
];
