import { CiPhone } from "react-icons/ci";
import { AiFillTikTok } from 'react-icons/ai';
import { RiInstagramFill } from 'react-icons/ri';
import { FaFacebookSquare } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import './Contact.css';

export default function Contact() {
  return (
    <section className="contact">
      <div className="contact__glow" />

      <h2 className="contact__title">Contáctanos</h2>
      <p className="contact__subtitle">Estamos para atenderte</p>

      <a className="contact__phoneCta" href="tel:+526645410955">
        <span className="contact__phoneIcon"><CiPhone /></span>
        +52 664-541-09-55
      </a>
      <p className="contact__helptext">Llámanos directamente</p>

      <div className="contact__divider">
        <span className="contact__divider-line" />
        <span className="contact__divider-text">o encuéntranos en</span>
        <span className="contact__divider-line" />
      </div>

      <div className="contact__social-icons">
        <a
          href="https://wa.me/526645410955"
          target="_blank"
          rel="noopener noreferrer"
          className="contact__link"
          aria-label="WhatsApp"
        >
          <IoLogoWhatsapp />
        </a>
        <a
          href="https://www.tiktok.com/@drhansruiz"
          target="_blank"
          rel="noopener noreferrer"
          className="contact__link"
          aria-label="TikTok"
        >
          <AiFillTikTok />
        </a>
        <a
          href="https://www.instagram.com/drhansruiz/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact__link"
          aria-label="Instagram"
        >
          <RiInstagramFill />
        </a>
        <a
          href="https://www.facebook.com/DrHansRuiz"
          target="_blank"
          rel="noopener noreferrer"
          className="contact__link"
          aria-label="Facebook"
        >
          <FaFacebookSquare />
        </a>
      </div>
    </section>
  );
}
