import { useTranslation } from 'react-i18next';
import "./LanguageSwitcher.css"

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const isSpanish = i18n.language === 'es';

    const toggle = () => {
        window.location.href = isSpanish
            ? 'https://hansruiztrauma.com'
            : 'https://hansruiztrauma.com.mx';
    };

    return (
        <div className="language-switcher">
            <span onClick={toggle} className="language-switcher__btn">
                {isSpanish ? 'U.S English' : 'MX Español'}
            </span>
        </div>
    );
}
