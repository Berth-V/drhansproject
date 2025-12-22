import { useState, useEffect, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import FormFields from './FormFields';
import useForm from './hooks/useForm';
import './Form.css';

const TurnstileWidgetLazy = lazy(() => import('./TurnstileWidget'));

export default function Form({ variant = 'full' }) {
  const [open, setOpen] = useState(false); // para sticky
  const [turnstileVisible, setTurnstileVisible] = useState(variant === 'full'); // <-- clave

  const {
    formData,
    consent,
    status,
    errors,
    setConsent,
    handleChange,
    onSubmit,
  } = useForm();

  const commonProps = {
    formData,
    consent,
    errors,
    setConsent,
    handleChange,
    TurnstileWidget: turnstileVisible ? TurnstileWidgetLazy : null,
  };

  // Para sticky: cargar Turnstile solo la primera vez que se abre
  const handleToggle = () => {
    setOpen((v) => !v);
    if (!turnstileVisible) setTurnstileVisible(true);
  };

  // --- Formulario grande (full) ---
  if (variant === 'full') {
    return (
      <section className="form form--full">
        <div className="form__wrap">
          <h2 className="form__title">Make an appointment</h2>
          <p className="form__subtitle">
            Book your consultation quickly and easily.
          </p>
          <form className="form__form" onSubmit={onSubmit}>
            <FormFields {...commonProps} />
            <button
              className="form__btn"
              type="submit"
              disabled={status.sending}
            >
              {status.sending ? 'Sending…' : 'Appointment'}
            </button>
            {status.ok && (
              <p className="form__ok">Thanks! We’ll contact you soon.</p>
            )}
            {status.ok === false && (
              <p className="form__error">
                {status.error || 'There was a problem sending your message.'}
              </p>
            )}
          </form>
        </div>
      </section>
    );
  }

  // --- Sticky / floating variant ---
  return (
    <div className="form form--sticky">
      <button className="form__toggle" onClick={handleToggle}>
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
            <p className="form__subtitle">
              Book your consultation quickly and easily.
            </p>
            <form className="form__form" onSubmit={onSubmit}>
              <FormFields {...commonProps} />
              <button
                className="form__btn"
                type="submit"
                disabled={status.sending}
              >
                {status.sending ? 'Sending…' : 'Appointment'}
              </button>
              {status.ok && (
                <p className="form__ok">Thanks! We’ll contact you soon.</p>
              )}
              {status.ok === false && (
                <p className="form__error">
                  {status.error || 'There was a problem sending your message.'}
                </p>
              )}
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
