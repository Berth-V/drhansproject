import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import TurnstileWidget from "./TurnstileWidget";
import "./Form.css";

export default function Form({ variant = "full" }) {
  const [status, setStatus] = useState({ sending: false, ok: null, error: "" });
  const [open, setOpen] = useState(true);

  async function onSubmit(e) {
    e.preventDefault();
    if (status.sending) return; // evita doble click
    setStatus({ sending: true, ok: null, error: "" });

    const form = e.currentTarget;

    // Verifica Turnstile (solo si hay SITEKEY configurada)
    const tokenInput = form.querySelector('input[name="cf-turnstile-response"]');
    if (import.meta.env.VITE_TURNSTILE_SITEKEY && (!tokenInput || !tokenInput.value)) {
      setStatus({
        sending: false,
        ok: false,
        error: "Por favor completa el verificador (captcha) antes de enviar.",
      });
      if (window.turnstile?.reset) window.turnstile.reset();
      return;
    }

    try {
      // 1) Datos del formulario
      const fd = new FormData(form);

      // 1.1) ID de formulario que espera el Apps Script (útil si usas FORMS_CONFIG)
      fd.append("formId", "appointment");

      // 1.2) Llave compartida (opcional): solo si existe en .env
      const fk = import.meta.env.VITE_FORM_KEY;
      if (fk) fd.append("form_key", fk);

      // 2) Timeout con AbortController
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 15000);

      // 3) POST a Apps Script (x-www-form-urlencoded)
      const res = await fetch(import.meta.env.VITE_APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams(fd),
        signal: ctrl.signal,
      });
      clearTimeout(timer);

      // 4) Parseo y validación
      let json;
      try {
        json = await res.json();
      } catch {
        const text = await res.text();
        throw new Error(text || `Respuesta no válida del servidor (HTTP ${res.status})`);
      }

      if (!res.ok || !json.ok) {
        const msg = json?.error || json?.message || `No se pudo enviar (HTTP ${res.status})`;
        throw new Error(msg);
      }

      // 5) Éxito
      setStatus({ sending: false, ok: true, error: "" });
      form.reset();
      if (window.turnstile?.reset) window.turnstile.reset();
    } catch (err) {
      let message = "Ocurrió un error al enviar.";
      if (err?.name === "AbortError") message = "La solicitud tardó demasiado. Intenta de nuevo.";
      else if (typeof err?.message === "string" && err.message) message = err.message;

      console.error(err);
      setStatus({ sending: false, ok: false, error: message });

      if (window.turnstile?.reset) window.turnstile.reset();
    }
  }

  // === Reutilizamos la misma estructura de campos para FULL y STICKY ===
  function Fields() {
    return (
      <>
        <div className="homeForm__row">
          <input
            className="homeForm__input"
            name="name"
            type="text"
            placeholder="Full Name"
            autoComplete="name"
            required
          />
          <input
            className="homeForm__input"
            name="email"
            type="email"
            placeholder="Email Address"
            autoComplete="email"
            required
          />
        </div>

        <div className="homeForm__row">
          <input
            className="homeForm__input"
            name="phone"
            type="tel"
            placeholder="Phone Number"
            autoComplete="tel"
          />
          <div className="homeForm__spacer" />
        </div>

        <textarea
          className="homeForm__textarea"
          name="message"
          placeholder="Message"
          rows={5}
        />

        {/* Turnstile (opcional): si definiste VITE_TURNSTILE_SITEKEY en .env, se renderiza */}
        {import.meta.env.VITE_TURNSTILE_SITEKEY && (
          <div className="homeForm__captcha">
            <TurnstileWidget />
          </div>
        )}

        <button className="homeForm__btn" type="submit" disabled={status.sending}>
          {status.sending ? "Sending…" : "Appointment"}
        </button>

        {status.ok && <p className="homeForm__ok">Thanks! We’ll contact you soon.</p>}
        {status.ok === false && (
          <p className="homeForm__error">
            {status.error || "There was a problem sending your message."}
          </p>
        )}
      </>
    );
  }

  if (variant === "full") {
    return (
      <section className="homeForm homeForm--full">
        <div className="homeForm__wrap">
          <h2 className="homeForm__title">Make an appointment</h2>
          <p className="homeForm__subtitle">Book your consultation quickly and easily.</p>
          <form className="homeForm__form" onSubmit={onSubmit}>
            <Fields />
          </form>
        </div>
      </section>
    );
  }

  // STICKY (con toggle y animación)
  return (
    <div className="homeForm homeForm--sticky">
      <button className="homeForm__toggle" onClick={() => setOpen((v) => !v)}>
        {open ? "✕" : "Form"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.section
            className="homeForm__panel"
            initial={{ x: "-110%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-110%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 25 }}
          >
            <h2 className="homeForm__title">Make an appointment</h2>
            <p className="homeForm__subtitle">Book your consultation quickly and easily.</p>
            <form className="homeForm__form" onSubmit={onSubmit}>
              <Fields />
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
