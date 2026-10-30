import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import './HomeCta.css';
import { trackCall } from '../../../../analytics/events';

// Cierre del inicio: invita a agendar o llamar
export default function HomeCta() {
  const { t } = useTranslation();

  return (
    <section className="home-cta">
      <div className="home-cta__card">
        <div className="home-cta__text">
          <h2 className="home-cta__title">{t('homeCta.title')}</h2>
          <p className="home-cta__description">{t('homeCta.text')}</p>
        </div>
        <div className="home-cta__actions">
          <NavLink to="/contact" className="home-cta__btn home-cta__btn--primary">
            {t('header.appointment')}
          </NavLink>
          <a href="tel:+526645410955" className="home-cta__btn home-cta__btn--outline" onClick={trackCall}>
            {t('homeCta.call')}
          </a>
        </div>
      </div>
    </section>
  );
}
