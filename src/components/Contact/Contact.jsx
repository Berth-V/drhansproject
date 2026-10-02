import { useTranslation } from 'react-i18next';
import Seo from '../Shared/Seo/Seo';
import { CiPhone } from "react-icons/ci";
import { AiFillTikTok } from 'react-icons/ai';
import { RiInstagramFill } from 'react-icons/ri';
import { FaFacebookSquare } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import './Contact.css';
import { OFFICES } from '../../config/siteConfig';
import { trackCall, trackWhatsApp, trackFacebook, trackInstagram, trackTikTok } from '../../analytics/events.js';

export default function Contact() {
  const { t } = useTranslation();
  return (
    <section className="contact">
      <Seo title={t('seo.contact.title')} description={t('seo.contact.description')} path="/contact" />

      <div className="contact__glow" />

      <h2 className="contact__title">{t('contact.title')}</h2>
      <p className="contact__subtitle">{t('contact.description1')}</p>

      <a className="contact__phoneCta" href="tel:+526645410955" onClick={trackCall}>
        <span className="contact__phoneIcon"><CiPhone /></span>
        +52 664-541-09-55
      </a>
      <p className="contact__helptext">{t('contact.description2')}</p>

      <p className="contact__price">
        {t('contact.priceLabel')}: <strong>{t('contact.price')}</strong>
      </p>

      <div className="contact__schedule">
        <h3 className="contact__scheduleTitle">{t('offices.scheduleTitle')}</h3>
        <div className="contact__offices">
          {OFFICES.map((office) => (
            <div key={office.id} className="contact__office">
              <p className="contact__officeName">{t(`offices.${office.id}.name`)}</p>
              <p className="contact__officeAddress">
                {t(`offices.${office.id}.addressLine1`)}
                <br />
                {t(`offices.${office.id}.addressLine2`)}
              </p>
              <p className="contact__officeHours">
                {t(`offices.${office.id}.days`)}
                <br />
                <strong>{t(`offices.${office.id}.hours`)}</strong>
              </p>
              {office.appointmentOnly && (
                <p className="contact__officeNote">{t(`offices.${office.id}.note`)}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="contact__divider">
        <span className="contact__divider-line" />
        <span className="contact__divider-text">{t('contact.description3')}</span>
        <span className="contact__divider-line" />
      </div>

      <div className="contact__social-icons">
        <a href="https://wa.me/526645410955" target="_blank" rel="noopener noreferrer" className="contact__link" aria-label="WhatsApp" onClick={trackWhatsApp}>
          <IoLogoWhatsapp />
        </a>
        <a href="https://www.tiktok.com/@drhansruiz" target="_blank" rel="noopener noreferrer" className="contact__link" aria-label="TikTok" onClick={trackTikTok}>
          <AiFillTikTok />
        </a>
        <a href="https://www.instagram.com/drhansruiz/" target="_blank" rel="noopener noreferrer" className="contact__link" aria-label="Instagram" onClick={trackInstagram}>
          <RiInstagramFill />
        </a>
        <a href="https://www.facebook.com/DrHansRuiz" target="_blank" rel="noopener noreferrer" className="contact__link" aria-label="Facebook" onClick={trackFacebook}>
          <FaFacebookSquare />
        </a>
      </div>
    </section>
  );
}