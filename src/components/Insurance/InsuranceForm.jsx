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
import { trackInsuranceLead, trackUploadDocs, trackWhatsApp } from '../../analytics/events';
import { createInsuranceLead, saveLeadFiles } from '../../firebase/insuranceLeads';
import { uploadInsuranceDocument } from '../../api/insuranceDocuments';

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
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const leadIdRef = useRef(null); // para asociar los documentos del paso 2
  const [files, setFiles] = useState({ summary: null, policy: null, study: null });
  const [fileErrors, setFileErrors] = useState({});
  const [uploadState, setUploadState] = useState({}); // por documento: 'uploading' | 'done'
  const [uploadedFiles, setUploadedFiles] = useState({}); // por documento: datos del archivo ya en Hostinger
  const [sendingDocs, setSendingDocs] = useState(false);
  const [docsError, setDocsError] = useState(false);
  const [finished, setFinished] = useState(false);
  const step2Ref = useRef(null);

  const insurerOptions = t('insurance.form.insurerOptions', { returnObjects: true });
  const pendingDocs = DOCUMENTS.filter(({ id }) => files[id] && uploadState[id] !== 'done');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleStep1 = async (event) => {
    event.preventDefault();
    if (form.website || submitting) return; // bot o doble clic

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    setSubmitError(false);
    try {
      leadIdRef.current = await createInsuranceLead(form);
    } catch (error) {
      console.error('Error al guardar el lead de seguros:', error);
      setSubmitError(true);
      return;
    } finally {
      setSubmitting(false);
    }

    trackInsuranceLead();
    // TODO: aviso por EmailJS sin datos médicos
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
    setUploadState((prev) => ({ ...prev, [id]: undefined }));
  };

  // Sube uno por uno los documentos pendientes; los que fallan se pueden reintentar
  const handleSendDocuments = async () => {
    if (sendingDocs || pendingDocs.length === 0) return;
    setSendingDocs(true);
    setDocsError(false);

    const uploaded = { ...uploadedFiles };
    let failed = false;
    for (const { id } of pendingDocs) {
      setUploadState((prev) => ({ ...prev, [id]: 'uploading' }));
      try {
        uploaded[id] = await uploadInsuranceDocument(leadIdRef.current, id, files[id]);
        setUploadState((prev) => ({ ...prev, [id]: 'done' }));
      } catch (error) {
        console.error(`Error al subir el documento ${id}:`, error);
        failed = true;
        const code = { file_size: 'size', file_type: 'type' }[error.message] ?? 'upload';
        setFileErrors((prev) => ({ ...prev, [id]: code }));
        setUploadState((prev) => ({ ...prev, [id]: undefined }));
      }
    }
    setUploadedFiles(uploaded);

    const saved = Object.values(uploaded);
    if (saved.length > 0) {
      try {
        await saveLeadFiles(leadIdRef.current, saved);
      } catch (error) {
        console.error('Error al anotar los documentos en el lead:', error);
        failed = true;
      }
    }
    setSendingDocs(false);

    if (failed) {
      setDocsError(true);
      return;
    }
    if (saved.length === DOCUMENTS.length) trackUploadDocs();
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
              maxLength={120}
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
                  maxLength={60}
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
                <input className="insurance-form__input" type="text" maxLength={80} {...fieldProps('insurerOther')} />
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
              maxLength={300}
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

            <button
              type="submit"
              className="insurance-form__btn insurance-form__btn--primary insurance-form__btn--full"
              disabled={submitting}
            >
              {submitting ? t('insurance.form.step1.sending') : t('insurance.form.step1.submit')}
            </button>
            {submitError && (
              <span className="insurance-form__error" role="alert">
                {t('insurance.form.errors.submit')}
              </span>
            )}
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
                {uploadState[id] && (
                  <span
                    className={`insurance-form__doc-status ${uploadState[id] === 'done' ? 'insurance-form__doc-status--done' : ''}`}
                  >
                    {t(`insurance.form.step2.${uploadState[id]}`)}
                  </span>
                )}
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
                  disabled={sendingDocs}
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
            disabled={pendingDocs.length === 0 || sendingDocs}
          >
            {sendingDocs ? t('insurance.form.step2.sending') : t('insurance.form.step2.send')}
          </button>
          <button
            type="button"
            className="insurance-form__btn insurance-form__btn--outline"
            onClick={() => setFinished(true)}
            disabled={sendingDocs}
          >
            {t('insurance.form.step2.later')}
          </button>
        </div>
        {docsError && (
          <p className="insurance-form__error" role="alert">
            {t('insurance.form.errors.upload')}
          </p>
        )}

        <p className="insurance-form__privacy">
          <FaLock aria-hidden="true" />
          {t('insurance.form.step2.privacy')}
        </p>

        {!step1Done && <p className="insurance-form__locked-note">{t('insurance.form.step2.locked')}</p>}
      </div>
    </div>
  );
}
