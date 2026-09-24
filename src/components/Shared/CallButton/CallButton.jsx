import './CallButton.css';
import { FaPhoneAlt } from 'react-icons/fa';
import { trackCall } from '../../../analytics/events';

export default function CallButton() {

    return (
        <a
            href="tel:+526645410955"
            className="call-btn"
            aria-label="Call Now"
            onClick={trackCall}
        >
            <FaPhoneAlt />
        </a>
    );
}
