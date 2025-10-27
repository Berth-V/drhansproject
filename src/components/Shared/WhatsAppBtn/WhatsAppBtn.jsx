import './WhatsAppBtn.css';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/526645410955"
            className="whatsappBtn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact on WhatsApp"
        >
            <FaWhatsapp />
        </a>
    );
}
