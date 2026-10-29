import './WhatsAppBtn.css';
import { FaWhatsapp } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackWhatsApp } from '../../../analytics/events';

const WHATSAPP_URL = 'https://wa.me/526645410955';

export default function WhatsAppButton() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  // En la landing de seguros el chat abre con un mensaje para identificar al paciente
  const href =
    pathname === '/seguros'
      ? `${WHATSAPP_URL}?text=${encodeURIComponent(t('insurance.whatsappMessage'))}`
      : WHATSAPP_URL;

  return (
    <a
      href={href}
      className="whatsapp-btn"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact on WhatsApp"
      onClick={trackWhatsApp}
    >
      <FaWhatsapp />
    </a>
  );
}
