import { useTranslation } from 'react-i18next';
import './KneeReplacement.css';
import kneeReplacementImg from '../../../../assets/knee-replacement.png';

export default function KneeReplacement() {
    const { t } = useTranslation();

    return (
        <section className="kneeReplacement">
            <div className="kneeReplacement__wrap">

                <div className="kneeReplacement__grid">

                    <div className="kneeReplacement__content">
                        <h2 className="kneeReplacement__title">
                            {t('kneeReplacement.title')}
                        </h2>

                        <p className="kneeReplacement__description">
                            {t('kneeReplacement.description')}
                        </p>

                        <ul className="kneeReplacement__signs">
                            <li>{t('kneeReplacement.sign1')}</li>
                            <li>{t('kneeReplacement.sign2')}</li>
                            <li>{t('kneeReplacement.sign3')}</li>
                        </ul>

                        <p className="kneeReplacement__ctaText">
                            {t('kneeReplacement.ctaText')}
                        </p>
                    </div>

                    {/* img */}
                    <div className="kneeReplacement__imageBox">
                        <img
                            src={kneeReplacementImg}
                            alt={t('kneeReplacement.imageAlt')}
                            className="kneeReplacement__image"
                            loading="lazy"
                        />
                    </div>

                </div>

            </div>
        </section>
    );
}