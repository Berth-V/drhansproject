import { useTranslation } from 'react-i18next';
import './Scoliosis.css';
import scoliosisImg from '../../../../assets/scoliosis.jpg';

export default function Scoliosis() {
    const { t } = useTranslation();

    return (
        <section className="scoliosis">
            <div className="scoliosis__wrap">

                <div className="scoliosis__grid">

                    <div className="scoliosis__content">
                        <h2 className="scoliosis__title">
                            {t('scoliosis.title')}
                        </h2>

                        <p className="scoliosis__description">
                            {t('scoliosis.description')}
                        </p>

                        <ul className="scoliosis__signs">
                            <li>{t('scoliosis.sign1')}</li>
                            <li>{t('scoliosis.sign2')}</li>
                            <li>{t('scoliosis.sign3')}</li>
                        </ul>

                        <p className="scoliosis__ctaText">
                            {t('scoliosis.ctaText')}
                        </p>
                    </div>

                    {/* img */}
                    <div className="scoliosis__imageBox">
                        <img
                            src={scoliosisImg}
                            alt={t('scoliosis.imageAlt')}
                            className="scoliosis__image"
                            loading="lazy"
                        />
                    </div>

                </div>

            </div>
        </section>
    );
}