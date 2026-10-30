import './CallButton.css';
import { FaPhoneAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { trackCall } from '../../../analytics/events';

export default function CallButton() {
    const { t } = useTranslation();

    return (
        <a
            href="tel:+526645410955"
            className="call-btn"
            aria-label={t('common.call')}
            onClick={trackCall}
        >
            <FaPhoneAlt aria-hidden="true" />
            <span className="call-btn__label">{t('common.call')}</span>
        </a>
    );
}
