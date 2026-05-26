import { useTranslation } from 'react-i18next';
import './DiscHernia.css';
import herniaImg from '../../../../assets/hernia.jpg';

export default function DiscHernia() {
    const { t } = useTranslation();

    return (
        <section className="disc">
            <div className="disc__wrap">

                <div className="disc__grid">

                    {/* img */}
                    <div className="disc__imageBox">
                        <img
                            src={herniaImg}
                            alt={t('disc.imageAlt')}
                            className="disc__image"
                            loading="lazy"
                        />
                    </div>

                    {/* content */}
                    <div className="disc__content">
                        <h2 className="disc__title">
                            {t('disc.title')}
                        </h2>

                        <p className="disc__description">
                            {t('disc.description')}
                        </p>

                        <ul className="disc__symptoms">
                            <li>{t('disc.symptom1')}</li>
                            <li>{t('disc.symptom2')}</li>
                            <li>{t('disc.symptom3')}</li>
                        </ul>

                        <p className="disc__ctaText">
                            {t('disc.ctaText')}
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}