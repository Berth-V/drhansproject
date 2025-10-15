import './About.css';
import photo from '../../assets/about-photo.jpg'
import { FaFacebookSquare } from "react-icons/fa"; 
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTikTok } from "react-icons/ai";

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
          <a href='https://www.tiktok.com/@drhansruiz' target="_blank" className='socialLinks'>
            <AiFillTikTok />
          </a>
          <a href='https://www.instagram.com/drhansruiz/' target="_blank" className='socialLinks'>
            <RiInstagramFill/>
          </a>
            <a href='https://www.facebook.com/DrHansRuiz' target="_blank" className='socialLinks'>
          <FaFacebookSquare />
          </a>
        </div>
      </div>

      <div className="profile-content">
        <div className="left-column">
          <div className="info-section">
            <h3>EDUCATION:</h3>
            <p>Doctor of Medicine (MD)<br />UMAE Hospital Lomas Verdes</p>
          </div>

          <div className="info-section">
            <h3>CERTIFICATION:</h3>
            <p>National Trauma Association</p>
          </div>

          <div className="info-section">
            <h3>SURGERY CERTIFICATION:</h3>
            <p>Expert in Joint Care & Surgery</p>
          </div>

          <div className="info-section">
            <h3>AWARDS & RECOGNITION:</h3>
            <p>Top Specialist 2024</p>
          </div>
        </div>

        <div className="right-column">
          <div className="info-section">
            <h3>CURRENT POSITION:</h3>
            <p>Senior Doctor at Mediweb</p>
          </div>

          <div className="info-section">
            <h3>HOSPITAL AFFILIATIONS:</h3>
            <p>Certified in Internal Medicine</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;