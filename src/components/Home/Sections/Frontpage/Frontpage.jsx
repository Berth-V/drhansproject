import "./Frontpage.css";
import hanspic from '../../../../assets/hans.webp';
import icon1 from '../../../../assets/x-ray.webp';
import icon2 from '../../../../assets/fracture.webp';
import { NavLink } from 'react-router-dom';

function Frontpage() {
  return (
    <section className="frontpage">
      <img
        className="frontpage__pic"
        src={hanspic}
        alt="Dr. Hans"
        width="520"
        height="600"
        fetchpriority="high"
      />
      <div className="frontpage__textBox">
        <p className="frontpage__text">
          <b className="frontpage__text frontpage__text--blue">Lower Back Pain</b>,
          Knee, Wrist, Meniscus Rupture, Tendonitis, Sport Medicine, Management
          of Sciatic, Lumbar, and Cervical Pain, Among Many Other Conditions.
        </p>

        <div className="frontpage__ctaGroup">
          <NavLink className="frontpage__primaryBtn" to="/contact">
            Get Your Appointment
          </NavLink>

          <a className="frontpage__phoneCta" href="tel:+526645410955">
            <svg
              className="frontpage__phoneIcon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6.5 3.5l3 2.5-2 3c.8 1.6 2 3 3.5 4.5s2.9 2.7 4.5 3.5l3-2 2.5 3c-1.1 1.1-2.3 1.9-3.8 2.2-2 .4-4.7-.4-7.9-3.6s-4-5.9-3.6-7.9c.3-1.5 1.1-2.7 2.2-3.8z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="frontpage__phoneBtn">+52 664-541-09-55</span>
          </a>
        </div>
      </div>
      <img className="frontpage__icon frontpage__icon--1" src={icon1} alt="" />
      <img className="frontpage__icon frontpage__icon--2" src={icon2} alt="" />
    </section>
  );
}

export default Frontpage;
