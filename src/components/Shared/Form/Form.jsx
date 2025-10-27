import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import TurnstileWidget from './TurnstileWidget';
import './Form.css';

export default function Form({ variant = 'full' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState({ sending: false, ok: null, error: '' });
  const [open, setOpen] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (status.sending) return;
    if (!consent) {
      setStatus({ sending: false, ok: false, error: 'Please accept our Privacy Policy.' });
      return;
    }

    setStatus({ sending: true, ok: null, error: '' });

    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => fd.append(key, value));
      fd.append('formId', 'appointment');
      if (import.meta.env.VITE_FORM_KEY) fd.append('form_key', import.meta.env.VITE_FORM_KEY);

      const res = await fetch(import.meta.env.VITE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: new URLSearchParams(fd),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json?.error || json?.message);

      setStatus({ sending: false, ok: true, error: '' });
      setFormData({ name: '', email: '', phone: '', message: '' });
      setConsent(false);
      if (window.turnstile?.reset) window.turnstile.reset();
      window.location.href = '/thankYou';
    } catch (err) {
      let message = 'Error while sending.';
      if (err?.name === 'AbortError') message = 'Request timeout. Try again.';
      else if (typeof err?.message === 'string') message = err.message;
      setStatus({ sending: false, ok: false, error: message });
      if (window.turnstile?.reset) window.turnstile.reset();
      console.error(err);
    }
  }

  const FormFields = (
    <>
      <div className="form__row">
        <input
          className="form__input"
          name="name"
          type="text"
          placeholder="Full Name"
          autoComplete="name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className="form__input"
          name="email"
          type="email"
          placeholder="Email Address"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="form__row">
        <input
          className="form__input"
          name="phone"
          type="tel"
          placeholder="Phone Number"
          autoComplete="tel"
          value={formData.phone}
          onChange={handleChange}
        />
        <div className="form__spacer" />
      </div>

      <textarea
        className="form__textarea"
        name="message"
        placeholder="Message"
        rows={5}
        value={formData.message}
        onChange={handleChange}
      />

      {import.meta.env.VITE_TURNSTILE_SITEKEY && (
        <div className="form__captcha">
          <TurnstileWidget />
        </div>
      )}

      <div className="form__consent">
        <input
          type="checkbox"
          id="consent"
          className="form__checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <label htmlFor="consent" className="form__consent-label">
          I agree to the{' '}
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="form__consent-link">
            Privacy Policy
          </a>
          .
        </label>
      </div>

      <button className="form__btn" type="submit" disabled={status.sending}>
        {status.sending ? 'Sending…' : 'Appointment'}
      </button>

      {status.ok && <p className="form__ok">Thanks! We’ll contact you soon.</p>}
      {status.ok === false && <p className="form__error">{status.error || 'There was a problem sending your message.'}</p>}
    </>
  );

  if (variant === 'full') {
    return (
      <section className="form form--full">
        <div className="form__wrap">
          <h2 className="form__title">Make an appointment</h2>
          <p className="form__subtitle">Book your consultation quickly and easily.</p>
          <form className="form__form" onSubmit={onSubmit}>
            {FormFields}
          </form>
        </div>
      </section>
    );
  }

  return (
    <div className="form form--sticky">
      <button className="form__toggle" onClick={() => setOpen((v) => !v)}>
        {open ? 'X' : 'Appointment →'}
      </button>
      <AnimatePresence>
        {open && (
          <motion.section
            className="form__panel"
            initial={{ x: -110, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -110, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 25 }}
          >
            <h2 className="form__title">Make an appointment</h2>
            <p className="form__subtitle">Book your consultation quickly and easily.</p>
            <form className="form__form" onSubmit={onSubmit}>
              {FormFields}
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};
