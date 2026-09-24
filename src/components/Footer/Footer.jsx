import './Footer.css';
import { AiFillTikTok } from 'react-icons/ai';
import { RiInstagramFill } from 'react-icons/ri';
import { FaFacebookSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__column">
          <h3>{t('footer.name')}</h3>
          <p>{t('footer.specialty')}</p>
          <p className="footer__address">
            {t('footer.address.line1')}
            <br />
            {t('footer.address.line2')}
          </p>
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
          >
            <AiFillTikTok />
          </a>
          <a
            href="https://www.instagram.com/drhansruiz/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            <RiInstagramFill />
          </a>
          <a
            href="https://www.facebook.com/DrHansRuiz"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            <FaFacebookSquare />
          </a>
        </div>

        <p className="footer__privacy-wrapper">
          <Link to="/privacyPolicy" className="footer__link footer__privacy-link">
            {t('footer.privacyPolicy')}
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
