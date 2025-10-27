import { useEffect, useState } from 'react';
import userFallback from '../../../../assets/x-ray.png';
import './Reviews.css';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          'https://script.google.com/macros/s/AKfycbzZNvfyrWd_RZC9A4u5p9DLX1s6FSlMWkHckQMuy3H74KKHwBrr9j9daPjU7ZfavzWR/exec'
        );
        const data = await res.json();
        setReviews(data.reviews || []);
      } catch (error) {
        console.error('Error al obtener reseñas:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) return <p>Loading reviews...</p>;

  return (
    <section className="homeReviews">
      <div className="homeReviews__wrap">
        <h2 className="homeReviews__title">Words from Our Patients</h2>

        <div className="homeReviews__grid">
          {reviews.length > 0 ? (
            reviews.map((r, i) => (
              <article key={i} className="homeReviews__card">
                <div className="homeReviews__txtBox">
                  <span className="homeReviews__quote">“</span>
                  <p className="homeReviews__text">{r.text}</p>
                </div>

                <div className="homeReviews__footer">
                  <img
                    className="homeReviews__avatar"
                    src={r.profile_photo_url || userFallback}
                    alt={r.author_name}
                  />
                  <div className="homeReviews__meta">
                    <strong className="homeReviews__name">
                      {r.author_name}
                    </strong>
                    <div className="homeReviews__stars" aria-hidden="true">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <svg
                          key={j}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="#00C4FF"
                        >
                          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <small style={{ opacity: 0.7 }}>{r.time}</small>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p>No reviews available</p>
          )}
        </div>
      </div>
    </section>
  );
}
