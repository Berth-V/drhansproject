const ADS_ID = 'AW-614898564';

// Etiquetas de las acciones de conversión en Google Ads (lo que va después de 'AW-614898564/').
// Si una queda vacía, solo se manda el evento de GA4.
const CONVERSION_LABELS = {
    llamada: '4yoXCMHA9LAdEIS3mqUC',
    whatsapp: 'P5UwCL7A9LAdEIS3mqUC',
    seguros: 'zV9PCMTA9LAdEIS3mqUC'
};

// Conversión de Ads + generate_lead en GA4. lead_source: 'llamada' | 'whatsapp' | 'seguros'
const trackLead = (leadSource) => {
    if (!window.gtag) return;
    const label = CONVERSION_LABELS[leadSource];
    if (label) {
        window.gtag('event', 'conversion', { send_to: `${ADS_ID}/${label}` });
    }
    window.gtag('event', 'generate_lead', { lead_source: leadSource });
};

export const trackCall = () => trackLead('llamada');

export const trackWhatsApp = () => trackLead('whatsapp');

export const trackInsuranceLead = () => trackLead('seguros');

const trackSocial = (network) => {
    if (!window.gtag) return;
    window.gtag('event', 'social_click', { social_network: network });
};

export const trackFacebook = () => trackSocial('facebook');

export const trackInstagram = () => trackSocial('instagram');

export const trackTikTok = () => trackSocial('tiktok');
