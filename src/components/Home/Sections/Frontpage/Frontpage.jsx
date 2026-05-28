import './Frontpage.css';
import hanspic from '../../../../assets/hans.webp';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

function Frontpage() {
  const { t } = useTranslation();
  return (
    <section className="frontpage">
      <div className="frontpage__textBox">
        <div className="frontpage__text">
          <h1 className="frontpage__title">
            {t('frontpage.title')}
          </h1>
          <p className="frontpage__description">
            {t('frontpage.description')}
          </p>
        </div>
        <div className="frontpage__ctaGroup">
          <NavLink className="frontpage__primaryBtn" to="/contact">
            {t('frontpage.cta')}
          </NavLink>
          <a className="frontpage__phoneCta" href="tel:+526645410955">
            <svg
              className="frontpage__phoneIcon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6.5 3.5l3 2.5-2 3c.8 1.6 2 3 3.5 4.5s2.9 2.7 4.5 3.5l3-2 2.5 3c-1.1 1.1-2.3 1.9-3.8 2.2-2 .4-4.7-.4-7.9-3.6s-4-5.9-3.6-7.9c.3-1.5 1.1-2.7 2.2-3.8z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="frontpage__phoneBtn">+52 664-541-09-55</span>
          </a>
        </div>
      </div>
      <img
        className="frontpage__pic"
        src={hanspic}
        alt="Dr. Hans"
        width="520"
        height="600"
        fetchPriority="high"
      />
    </section>
  );
}

export default Frontpage;
