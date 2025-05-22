import frontPage from '../../../assets/back-pattern.png';
import hanspic from '../../../assets/hans.png';
import icon1 from '../../../assets/x-ray.png'
import icon2 from '../../../assets/fracture.png'


function HomeSec1() {
  return (
    <section
      className="home__section1"
    >
      <img className="home__section1__pic" src={hanspic} />
      <div className="home__section1__textBox">
        <p className="home__section1__text">
          <b className='home__section1__text --blueText'>Lower Back Pain</b>
          , Knee, Wrist, Meniscus Rupture, Tendonitis, Among Many Other Conditions</p>
        <button className="home__section1__btn">Get your Appointment</button>
      </div>
      <img className='home__section1__icon1' src={icon1}/>
      <img className='home__section1__icon2' src={icon2}/>
    </section>
  );
}

export default HomeSec1;
