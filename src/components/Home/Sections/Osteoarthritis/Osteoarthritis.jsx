import { useTranslation } from 'react-i18next';
import './Osteoarthritis.css';
import osteoImg from '../../../../assets/osteo.jpg';

export default function Osteoarthritis() {
    const { t } = useTranslation();

    return (
        <section className="osteo">
            <div className="osteo__wrap">

                <div className="osteo__grid">

                    {/* 🖼️ IMAGEN */}
                    <div className="osteo__imageBox">
                        <img
                            src={osteoImg}
                            alt={t('osteo.imageAlt')}
                            className="osteo__image"
                            loading="lazy"
                        />
                    </div>

                    {/* 🧠 CONTENIDO */}
                    <div className="osteo__content">
                        <h2 className="osteo__title">
                            {t('osteo.title')}
                        </h2>

                        <p className="osteo__description">
                            {t('osteo.description')}
                        </p>

                        <ul className="osteo__symptoms">
                            <li>{t('osteo.symptom1')}</li>
                            <li>{t('osteo.symptom2')}</li>
                            <li>{t('osteo.symptom3')}</li>
                        </ul>

                        <p className="osteo__ctaText">
                            {t('osteo.ctaText')}
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}