import { useTranslation } from 'react-i18next';
import reviews from './data/reviews';
import './Reviews.css';

export default function Reviews() {
  const { t } = useTranslation();

  return (
    <section className="homeReviews">
      <div className="homeReviews__wrap">
        <h2 className="homeReviews__title">
          {t('reviews.title')}
        </h2>

        <div className="homeReviews__grid">
          {reviews.length > 0 ? (
            reviews.map((r, i) => (
              <article key={i} className="homeReviews__card">
                <div className="homeReviews__txtBox">
                  <span className="homeReviews__quote">“</span>

                  <p className="homeReviews__text">
                    {r.text}
                  </p>
                </div>

                <div className="homeReviews__footer">
                  {r.profile_photo_url && (
                    <img
                      className="homeReviews__avatar"
                      src={r.profile_photo_url}
                      alt={r.author_name}
                      loading="lazy"
                    />
                  )}

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

                    <small style={{ opacity: 0.7 }}>
                      {r.time}
                    </small>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p>{t('reviews.empty')}</p>
          )}
        </div>
        <a href='https://www.google.com/maps/place/Dr+Hans+Ruiz+Traumat%C3%B3logo/@32.5332621,-117.0251347,17z/data=!3m1!4b1!4m18!1m9!3m8!1s0x80d949ded0c8ef3d:0xf3151848b6171d2!2sDr+Hans+Ruiz+Traumat%C3%B3logo!8m2!3d32.5332576!4d-117.0225598!9m1!1b1!16s%2Fg%2F11jdchmvqr!3m7!1s0x80d949ded0c8ef3d:0xf3151848b6171d2!8m2!3d32.5332576!4d-117.0225598!9m1!1b1!16s%2Fg%2F11jdchmvqr?entry=ttu&g_ep=EgoyMDI2MDQyMC4wIKXMDSoASAFQAw%3D%3D'
          className='homeReviews__btn'
          target='blank_'>
          {t('reviews.button')}
        </a>
      </div>
    </section>
  );
}
