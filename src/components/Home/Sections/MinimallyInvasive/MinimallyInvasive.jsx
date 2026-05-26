import { useTranslation } from 'react-i18next';
import './MinimallyInvasive.css';
import scarImg from '../../../../assets/scar2.jpg';

export default function MinimallyInvasive() {
    const { t } = useTranslation();

    return (
        <section className="minInv">
            <div className="minInv__wrap">

                <div className="minInv__grid">

                    {/* TEXTO */}
                    <div className="minInv__content">
                        <h2 className="minInv__title">
                            {t('minInv.title')}
                        </h2>

                        <p className="minInv__description">
                            {t('minInv.description')}
                        </p>

                        <ul className="minInv__benefits">
                            <li>{t('minInv.benefit1')}</li>
                            <li>{t('minInv.benefit2')}</li>
                            <li>{t('minInv.benefit3')}</li>
                        </ul>
                    </div>

                    {/* IMAGEN */}
                    <div className="minInv__imageBox">
                        <img
                            src={scarImg}
                            alt={t('minInv.imageAlt')}
                            className="minInv__image"
                            loading="lazy"
                        />
                    </div>

                </div>

            </div>
        </section>
    );
}