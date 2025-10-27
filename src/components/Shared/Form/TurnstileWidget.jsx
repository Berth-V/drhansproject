import { useEffect, useRef, useState } from 'react';

function TurnstileWidget() {
  const ref = useRef(null);
  const widgetIdRef = useRef(null); // <-- store the ID returned by render()
  const [token, setToken] = useState('');

  useEffect(() => {
    const SITEKEY = import.meta.env.VITE_TURNSTILE_SITEKEY;
    if (!SITEKEY) return;

    const render = () => {
      if (!window.turnstile || !ref.current) return;

      // If there's already a widget, remove it (prevents duplicates in StrictMode/HMR)
      try {
        if (widgetIdRef.current && window.turnstile.remove) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
        // (optional, in case something remains stuck in the container)
        ref.current.innerHTML = '';
      } catch { }

      // Explicitly render and save the widgetId
      widgetIdRef.current = window.turnstile.render(ref.current, {
        sitekey: SITEKEY,
        theme: 'light',
        appearance: 'always', // remove in prod if you want invisible/auto mode
        callback: (t) => setToken(t || ''),
        'expired-callback': () => setToken(''),
        'error-callback': () => setToken(''),
      });
    };

    // Wait for the API to be ready (using your index.html callback)
    if (window.__turnstileReady) render();
    else {
      const handler = () => render();
      document.addEventListener('turnstile-loaded', handler, { once: true });
      // cleanup the listener if unmounted before:
      return () => document.removeEventListener('turnstile-loaded', handler);
    }

    // Cleanup on unmount (very important with StrictMode)
    return () => {
      try {
        if (widgetIdRef.current && window.turnstile?.remove) {
          window.turnstile.remove(widgetIdRef.current);
        }
      } finally {
        widgetIdRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div ref={ref} style={{ minHeight: 70 }} />
      {/* hidden input so your onSubmit can read it */}
      <input type="hidden" name="cf-turnstile-response" value={token} />
    </>
  );
}

export default TurnstileWidget;
