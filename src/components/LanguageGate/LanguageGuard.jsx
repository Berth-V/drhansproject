import { useEffect, useState } from 'react';
import LanguageGate from './LanguageGate';

export default function LanguageGuard() {
    const [showGate, setShowGate] = useState(false);

    useEffect(() => {
        const lang = sessionStorage.getItem('lang');

        if (lang === 'es') {
            window.location.href = 'https://hansruiztrauma.com.mx';
            return;
        }

        if (lang === 'en') {
            window.location.href = 'https://hansruiztrauma.com';
            return;
        }

        setShowGate(true);
    }, []);

    if (!showGate) return null;

    return <LanguageGate />;
}
