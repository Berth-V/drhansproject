import './Footer.css';
import { AiFillTikTok } from 'react-icons/ai';
import { RiInstagramFill } from 'react-icons/ri';
import { FaFacebookSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>Dr. Hans Ruiz</h3>
          <p>Traumatology and Orthopedics</p>
          <p className="footer-address">
            Vía Ote. 9750-903, Zona Urbana Rio Tijuana,<br />
            22010 Tijuana, B.C.
          </p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/procedures">Procedures</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Get Your Appointment</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Follow Me</p>
        <div className="social-icons">
          <a
            href="https://www.tiktok.com/@drhansruiz"
            target="_blank"
            rel="noopener noreferrer"
            className="footerLink"
          >
            <AiFillTikTok />
          </a>
          <a
            href="https://www.instagram.com/drhansruiz/"
            target="_blank"
            rel="noopener noreferrer"
            className="footerLink"
          >
            <RiInstagramFill />
          </a>
          <a
            href="https://www.facebook.com/DrHansRuiz"
            target="_blank"
            rel="noopener noreferrer"
            className="footerLink"
          >
            <FaFacebookSquare />
          </a>
        </div>

        {/* Privacy Policy */}
        <p className="privacy-wrapper">
          <Link to="/privacyPolicy" className="footerLink privacy-link">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
