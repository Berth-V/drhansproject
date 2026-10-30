import { useTranslation } from 'react-i18next';
// Misma tarjeta que las demás secciones de procedimientos del inicio
import '../InfoSection/InfoSection.css';
import scarImg from '../../../../assets/scar2.webp';

export default function MinimallyInvasive() {
    const { t } = useTranslation();

    return (
        <section className="infoSection infoSection--imageLeft">
            <div className="infoSection__wrap">
                <div className="infoSection__grid">

                    <div className="infoSection__content">
                        <h2 className="infoSection__title">
                            {t('minInv.title')}
                        </h2>

                        <p className="infoSection__description">
                            {t('minInv.description')}
                        </p>

                        <ul className="infoSection__list">
                            <li>{t('minInv.benefit1')}</li>
                            <li>{t('minInv.benefit2')}</li>
                            <li>{t('minInv.benefit3')}</li>
                        </ul>
                    </div>

                    <div className="infoSection__imageBox">
                        <img
                            src={scarImg}
                            alt={t('minInv.imageAlt')}
                            className="infoSection__image"
                            width="960"
                            height="640"
                            loading="lazy"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
