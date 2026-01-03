import './PrivacyPolicy.css';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <section className="privacy">
      <div className="privacy__container">
        <h1 className="privacy__title">{t('privacy.title')}</h1>

        <p className="privacy__text">
          {t('privacy.intro')}
          <a
            href="https://hansruiztrauma.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://hansruiztrauma.com
          </a>
          .
        </p>

        <h2 className="privacy__subtitle">{t('privacy.section1.title')}</h2>
        <p className="privacy__text">{t('privacy.section1.text')}</p>

        <h2 className="privacy__subtitle">{t('privacy.section2.title')}</h2>
        <ul className="privacy__list">
          {t('privacy.section2.items', { returnObjects: true }).map((item, i) => (
            <li key={i} className="privacy__list-item">{item}</li>
          ))}
        </ul>

        <h2 className="privacy__subtitle">{t('privacy.section3.title')}</h2>
        <p className="privacy__text">{t('privacy.section3.text')}</p>

        <h2 className="privacy__subtitle">{t('privacy.section4.title')}</h2>
        <p className="privacy__text">{t('privacy.section4.text')}</p>

        <h2 className="privacy__subtitle">{t('privacy.section5.title')}</h2>
        <p className="privacy__text">
          {t('privacy.section5.text1')}{' '}
          <a href="mailto:traumatologiahans@gmail.com">
            traumatologiahans@gmail.com
          </a>
          {t('privacy.section5.text2')}
        </p>

        <h2 className="privacy__subtitle">{t('privacy.section6.title')}</h2>
        <p className="privacy__text">{t('privacy.section6.text')}</p>

        <h2 className="privacy__subtitle">{t('privacy.section7.title')}</h2>
        <p className="privacy__text">{t('privacy.section7.text')}</p>

        <p className="privacy__update">{t('privacy.lastUpdated', { date: 'October 2025' })}</p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
