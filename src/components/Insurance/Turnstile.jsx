import { useEffect, useRef } from 'react';

const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
let scriptPromise;

// El script de Cloudflare se carga una sola vez y solo en las páginas que usan el captcha
function loadTurnstile() {
  scriptPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(window.turnstile);
    script.onerror = () => {
      scriptPromise = undefined;
      reject(new Error('turnstile_script'));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

// Captcha de Cloudflare Turnstile: casi siempre invisible; solo muestra una casilla si duda.
// onToken(token) cuando lo resuelve y onToken(null) cuando expira o falla. Cada token sirve una
// sola vez: cambiar `resetKey` pide uno nuevo.
export default function Turnstile({ action, language, onToken, resetKey, className }) {
  const containerRef = useRef(null);
  const onTokenRef = useRef(onToken);

  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useEffect(() => {
    let widgetId;
    let cancelled = false;

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !containerRef.current) return;
        widgetId = turnstile.render(containerRef.current, {
          sitekey: import.meta.env.VITE_TURNSTILE_SITEKEY,
          action,
          language,
          appearance: 'interaction-only',
          callback: (token) => onTokenRef.current(token),
          'expired-callback': () => onTokenRef.current(null),
          'error-callback': () => onTokenRef.current(null),
        });
      })
      .catch(() => onTokenRef.current(null));

    return () => {
      cancelled = true;
      if (widgetId !== undefined) window.turnstile?.remove(widgetId);
    };
  }, [action, language, resetKey]);

  return <div ref={containerRef} className={className} />;
}
