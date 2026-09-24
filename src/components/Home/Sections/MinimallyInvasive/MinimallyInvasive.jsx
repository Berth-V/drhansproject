import { useTranslation } from 'react-i18next';
import './MinimallyInvasive.css';
import scarImg from '../../../../assets/scar2.jpg';

export default function MinimallyInvasive() {
    const { t } = useTranslation();

    return (
        <section className="min-inv">
            <div className="min-inv__wrap">

                <div className="min-inv__grid">

                    <div className="min-inv__content">
                        <h2 className="min-inv__title">
                            {t('minInv.title')}
                        </h2>

                        <p className="min-inv__description">
                            {t('minInv.description')}
                        </p>

                        <ul className="min-inv__benefits">
                            <li>{t('minInv.benefit1')}</li>
                            <li>{t('minInv.benefit2')}</li>
                            <li>{t('minInv.benefit3')}</li>
                        </ul>
                    </div>

                    <div className="min-inv__image-box">
                        <img
                            src={scarImg}
                            alt={t('minInv.imageAlt')}
                            className="min-inv__image"
                            loading="lazy"
                        />
                    </div>

                </div>

            </div>
        </section>
    );
}
