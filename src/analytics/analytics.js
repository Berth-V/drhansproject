import { SITE_CONFIG } from '../config/siteConfig';

export const initAnalytics = () => {
    // dynamic Gtag
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.ga4}`;
    document.head.appendChild(script);

    // dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());

    // GA4 by domain
    gtag('config', SITE_CONFIG.ga4);

    // Google Ads por both domains
    gtag('config', 'AW-614898564');
};