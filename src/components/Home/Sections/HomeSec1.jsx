import frontPage from '../../../assets/back-pattern.png';
import hanspic from '../../../assets/hans-pic.jpg';

function HomeSec1() {
  return (
    <section
      className="home__section1"
      style={{
        background: `url(${frontPage}) no-repeat center/100%`,
      }}
    >
      <img className="home__section1__pic" src={hanspic} />
      <div className="home__section1__textBox">
        {/*<p className="p">Lower Back Pain, Knee, Wrist, Meniscus Rupture, Tendonitis, Among Many Other Conditions</p*/}
        {/*<button className="home__section1__btn">Get your Appointment</button>*/}
      </div>
    </section>
  );
}

export default HomeSec1;
