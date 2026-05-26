import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

function TurnstileWidget() {
  const ref = useRef(null);
  const widgetIdRef = useRef(null); // <-- store the ID returned by render()
  const [token, setToken] = useState('');
  const { i18n } = useTranslation();

  useEffect(() => {
    const SITEKEY = import.meta.env.VITE_TURNSTILE_SITEKEY;

    if (!SITEKEY) {
      console.error("Turnstile SITEKEY missing");
      return;
    }

    const interval = setInterval(() => {
      if (window.turnstile && ref.current) {
        clearInterval(interval);

        try {
          if (widgetIdRef.current && window.turnstile.remove) {
            window.turnstile.remove(widgetIdRef.current);
          }

          widgetIdRef.current = window.turnstile.render(ref.current, {
            sitekey: SITEKEY,
            theme: 'light',
            appearance: 'always',
            callback: (t) => setToken(t || ''),
            'expired-callback': () => setToken(''),
            'error-callback': () => setToken(''),
          });
        } catch (err) {
          console.error("Turnstile render error:", err);
        }
      }
    }, 200);

    return () => {
      clearInterval(interval);
      if (widgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [i18n.language]);

  return (
    <>
      <div ref={ref} style={{ minHeight: 70 }} />
      {/* hidden input so your onSubmit can read it */}
      <input type="hidden" name="cf-turnstile-response" value={token} />
    </>
  );
}

export default TurnstileWidget;
