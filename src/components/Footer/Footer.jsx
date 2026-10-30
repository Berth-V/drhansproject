import './Footer.css';
import { AiFillTikTok } from 'react-icons/ai';
import { RiInstagramFill } from 'react-icons/ri';
import { FaFacebookSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { trackTikTok, trackInstagram, trackFacebook } from '../../analytics/events';
import { useTranslation } from 'react-i18next';
import { OFFICES } from '../../config/siteConfig';
import logoIcon from '../../assets/logo icon.webp';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__column">
          <div className="footer__brand">
            <img className="footer__brand-icon" src={logoIcon} alt="" width="44" height="44" loading="lazy" />
            <div>
              <h3>{t('footer.name')}</h3>
              <p>{t('footer.specialty')}</p>
            </div>
          </div>
          {OFFICES.map((office) => (
            <a
              key={office.id}
              className="footer__address"
              href={office.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="footer__address-name">{t(`offices.${office.id}.name`)}</span>
              {t(`offices.${office.id}.addressLine1`)}
              <br />
              {t(`offices.${office.id}.addressLine2`)}
            </a>
          ))}
        </div>

        <div className="footer__column">
          <h3>{t('footer.quickLinks')}</h3>
          <ul>
            <li>
              <Link to="/procedures">{t('footer.procedures')}</Link>
            </li>
            <li>
              <Link to="/about">{t('footer.about')}</Link>
            </li>
            <li>
              <Link to="/contact">{t('footer.appointment')}</Link>
            </li>
            <li>
              <Link to="/blog">{t('footer.blog')}</Link>
            </li>
            <li>
              <Link to="/preguntas">{t('footer.questions')}</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>{t('footer.followMe')}</p>
        <div className="footer__social-icons">
          <a
            href="https://www.tiktok.com/@drhansruiz"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
            aria-label="TikTok"
            onClick={trackTikTok}
          >
            <AiFillTikTok />
          </a>
          <a
            href="https://www.instagram.com/drhansruiz/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
            aria-label="Instagram"
            onClick={trackInstagram}
          >
            <RiInstagramFill />
          </a>
          <a
            href="https://www.facebook.com/DrHansRuiz"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
            aria-label="Facebook"
            onClick={trackFacebook}
          >
            <FaFacebookSquare />
          </a>
        </div>

        <p className="footer__privacy-wrapper">
          <Link to="/privacyPolicy" className="footer__privacy-link">
            {t('footer.privacyPolicy')}
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
