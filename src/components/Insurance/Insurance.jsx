import './Insurance.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaCheck, FaUserMd, FaWhatsapp } from 'react-icons/fa';
import Seo from '../Shared/Seo/Seo';
import InsuranceForm from './InsuranceForm';
import Map from '../Home/Sections/Map/Map';
import { OFFICES } from '../../config/siteConfig';
import { trackWhatsApp } from '../../analytics/events';

const WHATSAPP_NUMBER = '526645410955';

// Landing para pacientes con seguro de gastos médicos mayores (destino de la campaña de Ads).
// Usa su propio header mínimo: el Header global se oculta en esta ruta (App.jsx).
export default function Insurance() {
  const { t } = useTranslation();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t('insurance.whatsappMessage')
  )}`;
  const insurers = t('insurance.insurers.items', { returnObjects: true });
  const steps = t('insurance.steps.items', { returnObjects: true });

  return (
    <div className="insurance">
      <Seo title={t('seo.insurance.title')} description={t('seo.insurance.description')} path="/seguros" />

      <header className="insurance__header">
        <div className="insurance__container insurance__header-inner">
          <div className="insurance__brand">
            <span className="insurance__brand-mark" aria-hidden="true">
              HR
            </span>
            <span>
              <span className="insurance__brand-name">{t('footer.name')}</span>
              <span className="insurance__brand-tagline">{t('insurance.header.tagline')}</span>
            </span>
          </div>
          <Link to="/" className="insurance__back">
            <FaArrowLeft aria-hidden="true" />
            {t('insurance.header.back')}
          </Link>
        </div>
      </header>

      <section className="insurance__hero">
        <div className="insurance__container insurance__hero-inner">
          <div className="insurance__hero-text">
            <span className="insurance__pill">{t('insurance.hero.eyebrow')}</span>
            <h1 className="insurance__title">{t('insurance.hero.title')}</h1>
            <p className="insurance__subtitle">{t('insurance.hero.subtitle')}</p>

            <div className="insurance__actions">
              <a href="#request" className="insurance__btn insurance__btn--primary">
                {t('insurance.hero.cta')}
              </a>
              <a
                href={whatsappUrl}
                className="insurance__btn insurance__btn--outline"
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsApp}
              >
                <FaWhatsapp aria-hidden="true" />
                {t('insurance.hero.whatsapp')}
              </a>
            </div>

            <ul className="insurance__checks">
              <li>
                <FaCheck aria-hidden="true" />
                {t('insurance.hero.checkApproval')}
              </li>
              <li>
                <FaCheck aria-hidden="true" />
                {t('insurance.hero.checkOffices')}
              </li>
            </ul>
          </div>

          {/* Espacio para la foto profesional del doctor (pendiente) */}
          <div className="insurance__photo" aria-hidden="true">
            <FaUserMd />
          </div>
        </div>
      </section>

      {/* Lista en i18n: solo las aseguradoras que el doctor confirme (los logos van después) */}
      <section className="insurance__container">
        <div className="insurance__insurers">
          <h2 className="insurance__insurers-title">{t('insurance.insurers.title')}</h2>
          <ul className="insurance__insurers-list">
            {insurers.map((name, index) => (
              <li key={index} className="insurance__insurer">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="insurance__container insurance__statement">
        <h2 className="insurance__statement-text">{t('insurance.statement')}</h2>
      </section>

      <section className="insurance__container">
        <div className="insurance__steps">
          <h2 className="insurance__steps-title">{t('insurance.steps.title')}</h2>
          <ol className="insurance__steps-list">
            {steps.map((step, index) => (
              <li key={index} className="insurance__step">
                <span className="insurance__step-number" aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className="insurance__step-title">{step.title}</h3>
                <p className="insurance__step-text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="request" className="insurance__container insurance__request">
        <span className="insurance__eyebrow">{t('insurance.request.eyebrow')}</span>
        <h2 className="insurance__request-title">{t('insurance.request.title')}</h2>
        <InsuranceForm whatsappUrl={whatsappUrl} />
      </section>

      <section className="insurance__container insurance__offices">
        <h2 className="insurance__offices-title">{t('offices.title')}</h2>
        <div className="insurance__offices-grid">
          {OFFICES.map((office) => (
            <article key={office.id} className="insurance__office">
              <div className="insurance__office-map">
                <Map embedSrc={office.embedSrc} title={t(`offices.${office.id}.name`)} />
              </div>
              <div className="insurance__office-info">
                <h3 className="insurance__office-name">{t(`offices.${office.id}.name`)}</h3>
                <p className="insurance__office-text">
                  {t(`offices.${office.id}.addressLine1`)} {t(`offices.${office.id}.addressLine2`)}
                </p>
                <p className="insurance__office-text">
                  {t(`offices.${office.id}.days`)} · {t(`offices.${office.id}.hours`)}
                </p>
                {office.appointmentOnly && (
                  <p className="insurance__office-note">{t(`offices.${office.id}.note`)}</p>
                )}
                <a
                  className="insurance__office-link"
                  href={office.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('offices.howToGet')} →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
