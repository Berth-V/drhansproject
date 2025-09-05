import user1 from '../../../../assets/x-ray.png';
import './Reviews.css'

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      name: 'Martha Pérez',
      text: 'Excelente atención del doctor, muy recomendable.',
      rating: 5,
      avatar: user1,
    },
    {
      id: 2,
      name: 'Luis Gómez',
      text: 'Trato profesional y muy claro en sus explicaciones.',
      rating: 5,
      avatar: user1,
    },
    {
      id: 3,
      name: 'Carla Rivera',
      text: 'Muy buena experiencia, me ayudó con mi dolor de espalda.',
      rating: 5,
      avatar: user1,
    },
  ];

  return (
    <section className="homeReviews">
      <div className="homeReviews__wrap">
        <h2 className="homeReviews__title">Words from Our Patients</h2>

        <div className="homeReviews__grid">
          {reviews.map((r) => (
            <article key={r.id} className="homeReviews__card">
              <span className="homeReviews__quote">“</span>

              <p className="homeReviews__text">{r.text}</p>

              <div className="homeReviews__footer">
                <img className="homeReviews__avatar" src={r.avatar} alt="" />
                <div className="homeReviews__meta">
                  <strong className="homeReviews__name">{r.name}</strong>
                  <div className="homeReviews__stars" aria-hidden="true">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#00C4FF">
                        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}