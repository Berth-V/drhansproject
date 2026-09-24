import { useTranslation } from 'react-i18next';
import { CiPhone } from "react-icons/ci";
import { AiFillTikTok } from 'react-icons/ai';
import { RiInstagramFill } from 'react-icons/ri';
import { FaFacebookSquare } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import './Contact.css';
import { trackCall, trackWhatsApp, trackFacebook, trackInstagram, trackTikTok } from '../../analytics/events.js';

export default function Contact() {
  const { t } = useTranslation();
  return (
    <section className="contact">
      <div className="contact__glow" />

      <h2 className="contact__title">{t('contact.title')}</h2>
      <p className="contact__subtitle">{t('contact.description1')}</p>

      <a className="contact__phoneCta" href="tel:+526645410955" onClick={trackCall}>
        <span className="contact__phoneIcon"><CiPhone /></span>
        +52 664-541-09-55
      </a>
      <p className="contact__helptext">{t('contact.description2')}</p>

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