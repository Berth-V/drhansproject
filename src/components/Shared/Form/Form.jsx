import { useState, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import FormFields from './FormFields';
import useForm from './hooks/useForm';
import { useTranslation } from 'react-i18next';
import './Form.css';

const TurnstileWidgetLazy = lazy(() => import('./TurnstileWidget'));

export default function Form({ variant = 'full' }) {
  const { t } = useTranslation();
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

  const handleToggle = () => {
    setOpen((v) => !v);
    if (!turnstileVisible) setTurnstileVisible(true);
  };

  // --- Formulario grande (full) ---
  if (variant === 'full') {
    return (
      <section className="form form--full">
        <div className="form__wrap">
          <h2 className="form__title">{t('form.title')}</h2>
          <p className="form__subtitle">{t('form.subtitle')}</p>
          <form className="form__form" onSubmit={onSubmit}>
            <FormFields {...commonProps} />
            <button className="form__btn" type="submit" disabled={status.sending}>
              {status.sending ? t('form.sending') : t('form.button')}
            </button>
            {status.ok && <p className="form__ok">{t('form.success')}</p>}
            {status.ok === false && (
              <p className="form__error">
                {status.error || t('form.error')}
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
        {open ? 'X' : t('form.toggle')}
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
            <h2 className="form__title">{t('form.title')}</h2>
            <p className="form__subtitle">{t('form.subtitle')}</p>
            <form className="form__form" onSubmit={onSubmit}>
              <FormFields {...commonProps} />
              <button className="form__btn" type="submit" disabled={status.sending}>
                {status.sending ? t('form.sending') : t('form.button')}
              </button>
              {status.ok && <p className="form__ok">{t('form.success')}</p>}
              {status.ok === false && (
                <p className="form__error">
                  {status.error || t('form.error')}
                </p>
              )}
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
