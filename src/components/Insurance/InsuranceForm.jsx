import './InsuranceForm.css';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaCheckCircle,
  FaFileMedical,
  FaLock,
  FaShieldAlt,
  FaWhatsapp,
  FaXRay,
} from 'react-icons/fa';
import { trackWhatsApp } from '../../analytics/events';

const OTHER_INSURER = 'other';
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_FILES = '.pdf,.jpg,.jpeg,.png,.heic,.heif,application/pdf,image/*';
const ACCEPTED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png', 'heic', 'heif'];

const DOCUMENTS = [
  { id: 'summary', icon: FaFileMedical },
  { id: 'policy', icon: FaShieldAlt },
  { id: 'study', icon: FaXRay },
];

const EMPTY_FORM = {
  name: '',
  whatsapp: '',
  insurer: '',
  insurerOther: '',
  policy: '',
  diagnosis: '',
  consent: false,
  website: '', // honeypot: los humanos no lo ven
};

// 10 dígitos (MX), 52 + 10 dígitos, o 1 + 10 dígitos (EE. UU.)
function isValidWhatsapp(value) {
  const digits = value.replace(/\D/g, '');
  return (
    digits.length === 10 ||
    (digits.length === 12 && digits.startsWith('52')) ||
    (digits.length === 11 && digits.startsWith('1'))
  );
}

function validate(form) {
  const errors = {};
  if (form.name.trim().length < 3) errors.name = 'name';
  if (!isValidWhatsapp(form.whatsapp)) errors.whatsapp = 'whatsapp';
  if (!form.insurer) errors.insurer = 'insurer';
  if (form.insurer === OTHER_INSURER && !form.insurerOther.trim()) errors.insurerOther = 'insurerOther';
  if (!form.policy.trim()) errors.policy = 'policy';
  if (!form.diagnosis.trim()) errors.diagnosis = 'diagnosis';
  if (!form.consent) errors.consent = 'consent';
  return errors;
}

function isAcceptedFile(file) {
  const extension = file.name.split('.').pop().toLowerCase();
  return file.type.startsWith('image/') || file.type === 'application/pdf' || ACCEPTED_EXTENSIONS.includes(extension);
}

export default function InsuranceForm({ whatsappUrl }) {
  const { t } = useTranslation();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [step1Done, setStep1Done] = useState(false);
  const [files, setFiles] = useState({ summary: null, policy: null, study: null });
  const [fileErrors, setFileErrors] = useState({});
  const [finished, setFinished] = useState(false);
  const step2Ref = useRef(null);

  const insurerOptions = t('insurance.form.insurerOptions', { returnObjects: true });
  const hasFiles = Object.values(files).some(Boolean);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleStep1 = (event) => {
    event.preventDefault();
    if (form.website) return; // bot

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // TODO (paso 5): crear insuranceLeads/{leadId} en Firestore, trackInsuranceLead() y aviso por EmailJS
    setStep1Done(true);
    requestAnimationFrame(() => step2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const handleFile = (id, event) => {
    const file = event.target.files[0];
    if (!file) return;

    let error;
    if (!isAcceptedFile(file)) error = 'type';
    else if (file.size > MAX_FILE_SIZE) error = 'size';

    setFileErrors((prev) => ({ ...prev, [id]: error }));
    setFiles((prev) => ({ ...prev, [id]: error ? null : file }));
  };

  const handleSendDocuments = () => {
    // TODO: subir los archivos al endpoint PHP y, con los tres, marcar estatus "completo" + upload_docs
    setFinished(true);
  };

  if (finished) {
    return (
      <div className="insurance-form__thanks">
        <FaCheckCircle className="insurance-form__thanks-icon" aria-hidden="true" />
        <h3 className="insurance-form__thanks-title">{t('insurance.form.thanks.title')}</h3>
        <p className="insurance-form__thanks-text">{t('insurance.form.thanks.text')}</p>
        <a
          href={whatsappUrl}
          className="insurance-form__btn insurance-form__btn--primary"
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWhatsApp}
        >
          <FaWhatsapp aria-hidden="true" />
          {t('insurance.form.thanks.whatsapp')}
        </a>
      </div>
    );
  }

  const fieldError = (name) =>
    errors[name] && (
      <span className="insurance-form__error" id={`insurance-${name}-error`}>
        {t(`insurance.form.errors.${errors[name]}`)}
      </span>
    );

  const fieldProps = (name) => ({
    id: `insurance-${name}`,
    name,
    value: form[name],
    onChange: handleChange,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `insurance-${name}-error` : undefined,
  });

  return (
    <div className="insurance-form">
      {/* Paso 1 */}
      <div className="insurance-form__card">
        <div className="insurance-form__card-head">
          <h3 className="insurance-form__card-title">{t('insurance.form.step1.title')}</h3>
          <span className="insurance-form__badge">{t('insurance.form.step1.badge')}</span>
        </div>

        {step1Done ? (
          <div className="insurance-form__done">
            <FaCheckCircle aria-hidden="true" />
            <p>{t('insurance.form.step1.done')}</p>
          </div>
        ) : (
          <form className="insurance-form__fields" onSubmit={handleStep1} noValidate>
            <label className="insurance-form__label" htmlFor="insurance-name">
              {t('insurance.form.fields.name')}
            </label>
            <input
              className="insurance-form__input"
              type="text"
              autoComplete="name"
              placeholder={t('insurance.form.placeholders.name')}
              {...fieldProps('name')}
            />
            {fieldError('name')}

            <label className="insurance-form__label" htmlFor="insurance-whatsapp">
              {t('insurance.form.fields.whatsapp')}
            </label>
            <input
              className="insurance-form__input"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder={t('insurance.form.placeholders.whatsapp')}
              {...fieldProps('whatsapp')}
            />
            {fieldError('whatsapp')}

            <div className="insurance-form__row">
              <div>
                <label className="insurance-form__label" htmlFor="insurance-insurer">
                  {t('insurance.form.fields.insurer')}
                </label>
                <select className="insurance-form__input" {...fieldProps('insurer')}>
                  <option value="">{t('insurance.form.placeholders.insurer')}</option>
                  {insurerOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                  <option value={OTHER_INSURER}>{t('insurance.form.otherInsurer')}</option>
                </select>
                {fieldError('insurer')}
              </div>
              <div>
                <label className="insurance-form__label" htmlFor="insurance-policy">
                  {t('insurance.form.fields.policy')}
                </label>
                <input
                  className="insurance-form__input"
                  type="text"
                  placeholder={t('insurance.form.placeholders.policy')}
                  {...fieldProps('policy')}
                />
                {fieldError('policy')}
              </div>
            </div>

            {form.insurer === OTHER_INSURER && (
              <>
                <label className="insurance-form__label" htmlFor="insurance-insurerOther">
                  {t('insurance.form.fields.insurerOther')}
                </label>
                <input className="insurance-form__input" type="text" {...fieldProps('insurerOther')} />
                {fieldError('insurerOther')}
              </>
            )}

            <label className="insurance-form__label" htmlFor="insurance-diagnosis">
              {t('insurance.form.fields.diagnosis')}
            </label>
            <input
              className="insurance-form__input"
              type="text"
              placeholder={t('insurance.form.placeholders.diagnosis')}
              {...fieldProps('diagnosis')}
            />
            {fieldError('diagnosis')}

            <input
              className="insurance-form__honeypot"
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <label className="insurance-form__consent">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
                aria-invalid={Boolean(errors.consent)}
              />
              <span>
                {t('insurance.form.consent.before')}
                <Link to="/privacyPolicy" target="_blank">
                  {t('insurance.form.consent.link')}
                </Link>
                {t('insurance.form.consent.after')}
              </span>
            </label>
            {fieldError('consent')}

            <button type="submit" className="insurance-form__btn insurance-form__btn--primary insurance-form__btn--full">
              {t('insurance.form.step1.submit')}
            </button>
          </form>
        )}
      </div>

      {/* Paso 2: bloqueado hasta terminar el paso 1 (los archivos se asocian al lead) */}
      <div
        ref={step2Ref}
        className={`insurance-form__card insurance-form__card--dark ${step1Done ? '' : 'insurance-form__card--locked'}`}
        inert={!step1Done}
      >
        <div className="insurance-form__card-head">
          <h3 className="insurance-form__card-title">{t('insurance.form.step2.title')}</h3>
          <span className="insurance-form__badge insurance-form__badge--solid">{t('insurance.form.step2.badge')}</span>
        </div>
        <p className="insurance-form__intro">{t('insurance.form.step2.intro')}</p>

        <ul className="insurance-form__docs">
          {DOCUMENTS.map(({ id, icon: Icon }) => (
            <li key={id} className="insurance-form__doc">
              <Icon className="insurance-form__doc-icon" aria-hidden="true" />
              <div className="insurance-form__doc-info">
                <span className="insurance-form__doc-title">{t(`insurance.form.documents.${id}.title`)}</span>
                <span className="insurance-form__doc-hint">
                  {files[id] ? files[id].name : t(`insurance.form.documents.${id}.hint`)}
                </span>
                {fileErrors[id] && (
                  <span className="insurance-form__error">{t(`insurance.form.errors.file_${fileErrors[id]}`)}</span>
                )}
              </div>
              <label className="insurance-form__upload">
                {files[id] ? t('insurance.form.step2.change') : t('insurance.form.step2.upload')}
                <input
                  type="file"
                  accept={ACCEPTED_FILES}
                  onChange={(event) => handleFile(id, event)}
                  className="insurance-form__file"
                />
              </label>
            </li>
          ))}
        </ul>

        <div className="insurance-form__actions">
          <button
            type="button"
            className="insurance-form__btn insurance-form__btn--primary"
            onClick={handleSendDocuments}
            disabled={!hasFiles}
          >
            {t('insurance.form.step2.send')}
          </button>
          <button
            type="button"
            className="insurance-form__btn insurance-form__btn--outline"
            onClick={() => setFinished(true)}
          >
            {t('insurance.form.step2.later')}
          </button>
        </div>

        <p className="insurance-form__privacy">
          <FaLock aria-hidden="true" />
          {t('insurance.form.step2.privacy')}
        </p>

        {!step1Done && <p className="insurance-form__locked-note">{t('insurance.form.step2.locked')}</p>}
      </div>
    </div>
  );
}
