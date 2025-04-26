import frontPage from '../../../assets/frontpage3.jpg';

function HomeSec1() {
  return (
    <section
      className="home__section1"
      style={{
        background: `url(${frontPage}) no-repeat center/100%`,
      }}
    >
      <div className="home__section1__background__filter">
        <div className="home__section1__textBox">
          <p className="p">
            Lower Back Pain, Knee, Wrist, Meniscus Rupture, Tendonitis, Among
            Many Other Conditions
          </p>
          <button className="home__section1__btn">Get your Appointment</button>
        </div>
      </div>
    </section>
  );
}

export default HomeSec1;
