import './WhatsAppBtn.css';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const handleClick = () => {
    if (window.gtag) {
      window.gtag('event', 'WhatsappClick', {
        event_category: 'Contact',
        event_label: 'Click WhatsApp',
      });
    }
  };

  return (
    <a
      href="https://wa.me/526645410955"
      className="whatsappBtn"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact on WhatsApp"
      onClick={handleClick}
    >
      <FaWhatsapp />
    </a>
  );
}
