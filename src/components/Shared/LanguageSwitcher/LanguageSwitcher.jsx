import { useLocation } from 'react-router-dom';
import { ALTERNATE_SITE } from '../../../config/siteConfig';
import "./LanguageSwitcher.css"

// Lleva a la misma página en el otro dominio (.com.mx ↔ .com)
export default function LanguageSwitcher() {
    const { pathname, search } = useLocation();
    const isEnglishTarget = ALTERNATE_SITE.language === 'en';

    return (
        <div className="language-switcher">
            <a
                href={`${ALTERNATE_SITE.domain}${pathname}${search}`}
                hrefLang={ALTERNATE_SITE.htmlLang}
                lang={ALTERNATE_SITE.language}
                className="language-switcher__btn"
            >
                {isEnglishTarget ? 'U.S. English' : 'MX Español'}
            </a>
        </div>
    );
}
