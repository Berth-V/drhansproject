import './LanguageGate.css';

export default function LanguageGate() {
    const selectLang = (lang) => {
        sessionStorage.setItem('lang', lang);

        if (lang === 'es') {
            window.location.href = 'https://hansruiztrauma.com.mx';
        } else {
            window.location.href = 'https://hansruiztrauma.com';
        }
    };

    return (
        <main className="language-gate">
            <section className="card">
                <h1>Idioma / Language</h1>

                <div className="actions">
                    <button onClick={() => selectLang('es')}>
                        Español
                    </button>

                    <button onClick={() => selectLang('en')}>
                        English
                    </button>
                </div>
            </section>

            <noscript>
                <div className="noscript">
                    <a href="https://hansruiztrauma.com.mx">Español</a>
                    <a href="https://hansruiztrauma.com">English</a>
                </div>
            </noscript>
        </main>
    );
}
