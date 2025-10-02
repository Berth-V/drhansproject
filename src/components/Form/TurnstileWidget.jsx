import { useEffect, useRef, useState } from "react";

function TurnstileWidget() {
  const ref = useRef(null);
  const widgetIdRef = useRef(null);   // <-- guardamos el ID que devuelve render()
  const [token, setToken] = useState("");

  useEffect(() => {
    const SITEKEY = import.meta.env.VITE_TURNSTILE_SITEKEY;
    if (!SITEKEY) return;

    const render = () => {
      if (!window.turnstile || !ref.current) return;

      // 1) Si ya hay un widget, elimínalo (evita duplicados en StrictMode/HMR)
      try {
        if (widgetIdRef.current && window.turnstile.remove) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
        // (opcional, por si algo quedó pegado en el contenedor)
        ref.current.innerHTML = "";
      } catch {}

      // 2) Renderiza de forma explícita y guarda el widgetId
      widgetIdRef.current = window.turnstile.render(ref.current, {
        sitekey: SITEKEY,
        theme: "light",
        appearance: "always", // quítalo en prod si quieres modo invisible/auto
        callback: (t) => setToken(t || ""),
        "expired-callback": () => setToken(""),
        "error-callback": () => setToken(""),
      });
    };

    // Espera a que la API esté lista (con tu callback de index.html)
    if (window.__turnstileReady) render();
    else {
      const handler = () => render();
      document.addEventListener("turnstile-loaded", handler, { once: true });
      // cleanup del listener si se desmonta antes:
      return () => document.removeEventListener("turnstile-loaded", handler);
    }

    // Cleanup al desmontar (muy importante con StrictMode)
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
      {/* input oculto para que tu onSubmit lo lea */}
      <input type="hidden" name="cf-turnstile-response" value={token} />
    </>
  );
}

export default TurnstileWidget;
