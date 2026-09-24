import { SITE_CONFIG } from '../config/siteConfig';

export const trackPageView = (path) => {
    if (!window.gtag) return;
    window.gtag('event', 'page_view', {
        page_path: path,
        page_location: `${SITE_CONFIG.domain}${path}`,
        send_to: SITE_CONFIG.ga4
    });
};