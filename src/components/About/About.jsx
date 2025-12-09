import './About.css';
import photo from '../../assets/about-photo.webp';
import { FaFacebookSquare } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { AiFillTikTok } from 'react-icons/ai';

const About = () => {
  return (
    <div className="doctor-profile">
      <div className="profile-header">
        <div className="photo-section">
          <div className="photo-placeholder">
            <img src={photo} alt="Dr Hans About Photo" />
          </div>
        </div>
        <div className="name-specialty">
          <h1>Dr. Hans Ruiz</h1>
          <h2>Traumatology</h2>
          <p>Follow me</p>
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
        <p>
          Hi there, I am Dr. Hans Ruiz Serna, I have experience in the
          management of sciatic, lumbar, and cervical pain using minimally
          invasive techniques, as well as in surgical procedures for joint
          prosthetics and spinal surgery.
          <br />
          Since 2014, I have dedicated myself to performing fracture repair
          surgeries, joint replacements, and comprehensive management of
          musculoskeletal injuries, offering precise, humane medical care
          focused on restoring my patients' mobility and quality of life.
        </p>
      </div>
      <div className="profile-content">
        <div className="left-column">
          <div className="info-section">
            <h3>EDUCATION:</h3>
            <p>UAS - Medicine</p>
          </div>
        </div>
        <div className="right-column">
          <div className="info-section">
            <h3>SPECIALITY:</h3>
            <p>UNAM - Traumatology and Orthopedics.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
