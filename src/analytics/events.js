export const trackCall = () => {
    if (!window.gtag) return;
    window.gtag('event', 'conversion', {
        send_to: 'AW-614898564',
        event_category: 'contacto',
        event_label: 'llamada'
    });
    window.gtag('event', 'generate_lead', {
        event_category: 'contacto',
        event_label: 'llamada'
    });
};

export const trackWhatsApp = () => {
    if (!window.gtag) return;
    window.gtag('event', 'conversion', {
        send_to: 'AW-614898564',
        event_category: 'contacto',
        event_label: 'whatsapp'
    });
    window.gtag('event', 'generate_lead', {
        event_category: 'contacto',
        event_label: 'whatsapp'
    });
};

export const trackFacebook = () => {
    if (!window.gtag) return;
    window.gtag('event', 'social_click', {
        event_category: 'redes_sociales',
        event_label: 'facebook'
    });
};

export const trackInstagram = () => {
    if (!window.gtag) return;
    window.gtag('event', 'social_click', {
        event_category: 'redes_sociales',
        event_label: 'instagram'
    });
};

export const trackTikTok = () => {
    if (!window.gtag) return;
    window.gtag('event', 'social_click', {
        event_category: 'redes_sociales',
        event_label: 'tiktok'
    });
};