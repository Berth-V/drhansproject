import './CallButton.css';
import { FaPhoneAlt } from 'react-icons/fa';

export default function CallButton() {
    const handleClick = () => {
        if (window.gtag) {
            window.gtag('event', 'CallClick', {
                event_category: 'Contact',
                event_label: 'Click Call Button',
            });
        }
    };

    return (
        <a
            href="tel:+526645410955"
            className="callBtn"
            aria-label="Call Now"
            onClick={handleClick}
        >
            <FaPhoneAlt />
        </a>
    );
}