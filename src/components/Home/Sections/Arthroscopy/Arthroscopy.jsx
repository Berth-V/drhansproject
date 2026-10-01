import { useTranslation } from 'react-i18next';
import './Arthroscopy.css';
import arthroscopyImg from '../../../../assets/arthroscopy.png';

export default function Arthroscopy() {
    const { t } = useTranslation();

    return (
        <section className="arthroscopy">
            <div className="arthroscopy__wrap">

                <div className="arthroscopy__grid">

                    {/* img */}
                    <div className="arthroscopy__imageBox">
                        <img
                            src={arthroscopyImg}
                            alt={t('arthroscopy.imageAlt')}
                            className="arthroscopy__image"
                            loading="lazy"
                        />
                    </div>

                    <div className="arthroscopy__content">
                        <h2 className="arthroscopy__title">
                            {t('arthroscopy.title')}
                        </h2>

                        <p className="arthroscopy__description">
                            {t('arthroscopy.description')}
                        </p>

                        <ul className="arthroscopy__symptoms">
                            <li>{t('arthroscopy.symptom1')}</li>
                            <li>{t('arthroscopy.symptom2')}</li>
                            <li>{t('arthroscopy.symptom3')}</li>
                        </ul>

                        <p className="arthroscopy__ctaText">
                            {t('arthroscopy.ctaText')}
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}