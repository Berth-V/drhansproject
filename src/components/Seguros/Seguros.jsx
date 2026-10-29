import './Seguros.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaCheck, FaUserMd, FaWhatsapp } from 'react-icons/fa';
import Seo from '../Shared/Seo/Seo';
import { trackWhatsApp } from '../../analytics/events';

const WHATSAPP_NUMBER = '526645410955';

// Landing para pacientes con seguro de gastos médicos mayores (destino de la campaña de Ads).
// Usa su propio header mínimo: el Header global se oculta en esta ruta (App.jsx).
export default function Seguros() {
  const { t } = useTranslation();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t('seguros.whatsappMessage')
  )}`;

  return (
    <div className="seguros">
      <Seo title={t('seo.seguros.title')} description={t('seo.seguros.description')} path="/seguros" />

      <header className="seguros__header">
        <div className="seguros__container seguros__header-inner">
          <div className="seguros__brand">
            <span className="seguros__brand-mark" aria-hidden="true">
              HR
            </span>
            <span>
              <span className="seguros__brand-name">{t('footer.name')}</span>
              <span className="seguros__brand-tagline">{t('seguros.header.tagline')}</span>
            </span>
          </div>
          <Link to="/" className="seguros__back">
            <FaArrowLeft aria-hidden="true" />
            {t('seguros.header.back')}
          </Link>
        </div>
      </header>

      <section className="seguros__hero">
        <div className="seguros__container seguros__hero-inner">
          <div className="seguros__hero-text">
            <span className="seguros__pill">{t('seguros.hero.eyebrow')}</span>
            <h1 className="seguros__title">{t('seguros.hero.title')}</h1>
            <p className="seguros__subtitle">{t('seguros.hero.subtitle')}</p>

            <div className="seguros__actions">
              <a href="#solicitud" className="seguros__btn seguros__btn--primary">
                {t('seguros.hero.cta')}
              </a>
              <a
                href={whatsappUrl}
                className="seguros__btn seguros__btn--outline"
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsApp}
              >
                <FaWhatsapp aria-hidden="true" />
                {t('seguros.hero.whatsapp')}
              </a>
            </div>

            <ul className="seguros__checks">
              <li>
                <FaCheck aria-hidden="true" />
                {t('seguros.hero.checkApproval')}
              </li>
              <li>
                <FaCheck aria-hidden="true" />
                {t('seguros.hero.checkOffices')}
              </li>
            </ul>
          </div>

          {/* Espacio para la foto profesional del doctor (pendiente) */}
          <div className="seguros__photo" aria-hidden="true">
            <FaUserMd />
          </div>
        </div>
      </section>
    </div>
  );
}
