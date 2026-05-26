import './PrivacyPolicy.css';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  const renderParagraphs = (key) => {
    const content = t(key, { returnObjects: true });

    if (Array.isArray(content)) {
      return content.map((paragraph, index) => (
        <p key={index} className="privacy__text">
          {paragraph}
        </p>
      ));
    }

    return <p className="privacy__text">{content}</p>;
  };

  return (
    <section className="privacy">
      <div className="privacy__container">
        <h1 className="privacy__title">{t('privacy.title')}</h1>

        <p className="privacy__text">
          {t('privacy.intro')}{' '}
          <a
            href="https://hansruiztrauma.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://hansruiztrauma.com
          </a>
          .
        </p>

        {/* Section 1 */}
        <h2 className="privacy__subtitle">
          {t('privacy.section1.title')}
        </h2>
        {renderParagraphs('privacy.section1.text')}

        {/* Section 2 */}
        <h2 className="privacy__subtitle">
          {t('privacy.section2.title')}
        </h2>

        <ul className="privacy__list">
          {t('privacy.section2.items', { returnObjects: true }).map(
            (item, i) => (
              <li key={i} className="privacy__list-item">
                {item}
              </li>
            )
          )}
        </ul>

        {/* Section 3 */}
        <h2 className="privacy__subtitle">
          {t('privacy.section3.title')}
        </h2>
        {renderParagraphs('privacy.section3.text')}

        {/* Section 4 */}
        <h2 className="privacy__subtitle">
          {t('privacy.section4.title')}
        </h2>
        {renderParagraphs('privacy.section4.text')}

        {/* Section 5 */}
        <h2 className="privacy__subtitle">
          {t('privacy.section5.title')}
        </h2>
        {renderParagraphs('privacy.section5.text')}

        {/* Section 6 */}
        <h2 className="privacy__subtitle">
          {t('privacy.section6.title')}
        </h2>

        <p className="privacy__text">
          {t('privacy.section6.text1')}{' '}
          <a href="mailto:oficina@hansruiztrauma.com">
            oficina@hansruiztrauma.com
          </a>
          {t('privacy.section6.text2')}
        </p>

        {/* Section 7 */}
        <h2 className="privacy__subtitle">
          {t('privacy.section7.title')}
        </h2>
        {renderParagraphs('privacy.section7.text')}

        {/* Section 8 */}
        <h2 className="privacy__subtitle">
          {t('privacy.section8.title')}
        </h2>
        {renderParagraphs('privacy.section8.text')}

        <p className="privacy__update">
          {t('privacy.lastUpdated', { date: 'May 2026' })}
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;