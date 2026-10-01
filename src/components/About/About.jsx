import './About.css';
import photo from '../../assets/about-photo.webp';
import { Helmet } from 'react-helmet-async';
import { FaFacebookSquare } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { AiFillTikTok } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="doctor-profile">
      <Helmet>
        <title>Sobre el Dr. Hans Ruiz — Traumatólogo en Tijuana</title>
        <meta name="description" content="Conoce la formación, experiencia y especialidad del Dr. Hans Ruiz, traumatólogo y ortopedista en Tijuana, Baja California." />
        <link rel="canonical" href="https://hansruiztrauma.com.mx/about" />
      </Helmet>

      <div className="doctor-profile__header">
        <div className="doctor-profile__photo-section">
          <div className="doctor-profile__photo">
            <img src={photo} alt={t('about.photoAlt')} />
          </div>
        </div>
        <div className="doctor-profile__name-specialty">
          <h1>{t('about.name')}</h1>
          <h2>{t('about.profession')}</h2>
          <p>{t('about.followMe')}</p>
          <div className="doctor-profile__social-links">
            <a href="https://www.tiktok.com/@drhansruiz" target="_blank" rel="noopener noreferrer" className="doctor-profile__social-link">
              <AiFillTikTok />
            </a>
            <a href="https://www.instagram.com/drhansruiz/" target="_blank" rel="noopener noreferrer" className="doctor-profile__social-link">
              <RiInstagramFill />
            </a>
            <a href="https://www.facebook.com/DrHansRuiz" target="_blank" rel="noopener noreferrer" className="doctor-profile__social-link">
              <FaFacebookSquare />
            </a>
          </div>
        </div>
      </div>

      <div className="doctor-profile__description">
        {t('about.description')
          .split('\n')
          .map((line, i) => (
            <p key={i}>{line}</p>
          ))}
      </div>

      <div className="doctor-profile__content">
        <div className="doctor-profile__col--left">
          <div className="doctor-profile__info">
            <h3>{t('about.education.title')}</h3>
            <p>{t('about.education.value')}</p>
          </div>
        </div>
        <div className="doctor-profile__col--right">
          <div className="doctor-profile__info">
            <h3>{t('about.speciality.title')}</h3>
            <p>{t('about.speciality.value')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;