import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function FormFields({
  formData,
  consent,
  errors,
  setConsent,
  handleChange,
  TurnstileWidget,
}) {
  const { t } = useTranslation();

  return (
    <>
      <div className="form__row">
        <div className="form__field">
          <input
            className={`form__input ${errors.name ? 'form__input--error' : ''}`}
            name="name"
            type="text"
            placeholder={t('formFields.name')}
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="form__error-msg">{errors.name}</span>}
        </div>

        <div className="form__field">
          <input
            className={`form__input ${errors.email ? 'form__input--error' : ''}`}
            name="email"
            type="email"
            placeholder={t('formFields.email')}
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="form__error-msg">{errors.email}</span>}
        </div>
      </div>

      <div className="form__row">
        <div className="form__field">
          <input
            className={`form__input ${errors.phone ? 'form__input--error' : ''}`}
            name="phone"
            type="tel"
            placeholder={t('formFields.phone')}
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="form__error-msg">{errors.phone}</span>}
        </div>

        <div className="form__spacer" />
      </div>

      <div className="form__row">
        <div className="form__field">
          <textarea
            className="form__textarea"
            name="message"
            placeholder={t('formFields.message')}
            rows={5}
            value={formData.message}
            onChange={handleChange}
          />
        </div>
      </div>

      {TurnstileWidget && (
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
          {t('formFields.consentPrefix')}{' '}
          <Link to="/privacyPolicy" target="_blank" className="form__consent-link">
            {t('formFields.privacyPolicy')}
          </Link>
        </label>
      </div>
    </>
  );
}
