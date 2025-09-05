import './About.css';

const About = () => {
  return (
    <div className="doctor-profile">
      <div className="profile-header">
        <div className="photo-section">
          <div className="photo-placeholder">
            {/* Espacio para la foto - puedes reemplazar esto con tu imagen */}
          </div>
          <div className="social-icons">
            <span>💬</span>
            <span>💮</span>
            <span>💯</span>
          </div>
        </div>
        
        <div className="name-specialty">
          <h1>Dr. Hans Ruiz</h1>
          <h2>Traumatology</h2>
          <p>Follow me - 💬 💮 💯</p>
        </div>
      </div>

      <div className="profile-content">
        <div className="left-column">
          <div className="info-section">
            <h3>EDUCATION:</h3>
            <p>Doctor of Medicine (MD)<br />Osteopathic Medicine</p>
          </div>

          <div className="info-section">
            <h3>MEDICAL CERTIFICATION:</h3>
            <p>National Trauma Association</p>
          </div>

          <div className="info-section">
            <h3>SURGERY CERTIFICATION:</h3>
            <p>Expert in Joint Care & Surgery</p>
          </div>

          <div className="info-section">
            <h3>RESEARCH:</h3>
            <p>Interest in joint recovery</p>
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

          <div className="info-section">
            <h3>CARDIOLOGY:</h3>
            <p>Certified for Sports Injuries</p>
          </div>

          <div className="info-section">
            <h3>PRO. AFFILIATIONS:</h3>
            <p>AO Trauma, National Board</p>
          </div>
        </div>
      </div>
      
      <div className="timeline-section">
        <h3>Timeline actualizable</h3>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-date">2024</div>
            <div className="timeline-content">Top Specialist Award</div>
          </div>
          <div className="timeline-item">
            <div className="timeline-date">2022</div>
            <div className="timeline-content">Joined Mediweb</div>
          </div>
          <div className="timeline-item">
            <div className="timeline-date">2020</div>
            <div className="timeline-content">Certified in Sports Injuries</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;