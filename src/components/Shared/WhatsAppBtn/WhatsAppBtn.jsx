import './WhatsAppBtn.css';
import { FaWhatsapp } from 'react-icons/fa';
import { trackWhatsApp } from '../../../analytics/events';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/526645410955"
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
