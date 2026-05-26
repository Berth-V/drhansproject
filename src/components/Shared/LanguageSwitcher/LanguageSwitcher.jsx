import "./LanguageSwitcher.css"

export default function LanguageSwitcher() {
    const hostname = window.location.hostname;
    const isSpanish = hostname.includes('.mx');

    const goSpanish = () => {
        window.location.href = 'https://hansruiztrauma.com.mx';
    };

    const goEnglish = () => {
        window.location.href = 'https://hansruiztrauma.com';
    };

    return (
        <div className="language-switcher">
            {isSpanish ? (
                <span onClick={goEnglish} className="switcher__btn">U.S English</span>
            ) : (
                <span onClick={goSpanish} className="switcher__btn">MX Español</span>
            )}
        </div>
    );
}
