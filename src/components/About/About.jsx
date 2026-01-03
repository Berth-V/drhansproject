import './About.css';
import photo from '../../assets/about-photo.webp';
import { FaFacebookSquare } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { AiFillTikTok } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="doctor-profile">
      <div className="profile-header">
        <div className="photo-section">
          <div className="photo-placeholder">
            <img src={photo} alt={t('about.photoAlt')} />
          </div>
        </div>
        <div className="name-specialty">
          <h1>{t('about.name')}</h1>
          <h2>{t('about.profession')}</h2>
          <p>{t('about.followMe')}</p>
          <div className="social-links">
            <a
              href="https://www.tiktok.com/@drhansruiz"
              target="_blank"
              rel="noopener noreferrer"
              className="socialLink"
            >
              <AiFillTikTok />
            </a>
            <a
              href="https://www.instagram.com/drhansruiz/"
              target="_blank"
              rel="noopener noreferrer"
              className="socialLink"
            >
              <RiInstagramFill />
            </a>
            <a
              href="https://www.facebook.com/DrHansRuiz"
              target="_blank"
              rel="noopener noreferrer"
              className="socialLink"
            >
              <FaFacebookSquare />
            </a>
          </div>
        </div>
      </div>

      <div className="about-description">
        {t('about.description')
          .split('\n')
          .map((line, i) => (
            <p key={i}>{line}</p>
          ))}
      </div>

      <div className="profile-content">
        <div className="left-column">
          <div className="info-section">
            <h3>{t('about.education.title')}</h3>
            <p>{t('about.education.value')}</p>
          </div>
        </div>
        <div className="right-column">
          <div className="info-section">
            <h3>{t('about.speciality.title')}</h3>
            <p>{t('about.speciality.value')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
