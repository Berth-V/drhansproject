import { useTranslation } from 'react-i18next';
import './Sciatica.css';
import sciaticaImg from '../../../../assets/sciatica.jpg';

export default function Sciatica() {
    const { t } = useTranslation();

    return (
        <section className="sciatica">
            <div className="sciatica__wrap">

                <div className="sciatica__grid">

                    {/* content */}
                    <div className="sciatica__content">
                        <h2 className="sciatica__title">
                            {t('sciatica.title')}
                        </h2>

                        <p className="sciatica__description">
                            {t('sciatica.description')}
                        </p>

                        <ul className="sciatica__symptoms">
                            <li>{t('sciatica.symptom1')}</li>
                            <li>{t('sciatica.symptom2')}</li>
                            <li>{t('sciatica.symptom3')}</li>
                        </ul>

                        <p className="sciatica__ctaText">
                            {t('sciatica.ctaText')}
                        </p>
                    </div>

                    {/* img */}
                    <div className="sciatica__imageBox">
                        <img
                            src={sciaticaImg}
                            alt={t('sciatica.imageAlt')}
                            className="sciatica__image"
                            loading="lazy"
                        />
                    </div>

                </div>

            </div>
        </section>
    );
}