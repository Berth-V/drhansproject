import { useTranslation } from 'react-i18next';
import './InfoSection.css';

// Sección de texto + imagen del inicio. Todo el contenido sale de la clave `id` en los JSON de idioma:
// { title, description, items: [...], ctaText, imageAlt }
export default function InfoSection({ id, image, imageSide = 'right' }) {
    const { t } = useTranslation();
    const items = t(`${id}.items`, { returnObjects: true });

    return (
        <section
            id={id}
            className={`infoSection${imageSide === 'left' ? ' infoSection--imageLeft' : ''}`}
        >
            <div className="infoSection__wrap">
                <div className="infoSection__grid">

                    <div className="infoSection__content">
                        <h2 className="infoSection__title">{t(`${id}.title`)}</h2>

                        <p className="infoSection__description">{t(`${id}.description`)}</p>

                        {Array.isArray(items) && (
                            <ul className="infoSection__list">
                                {items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        )}

                        <p className="infoSection__ctaText">{t(`${id}.ctaText`)}</p>
                    </div>

                    <div className="infoSection__imageBox">
                        <img
                            src={image}
                            alt={t(`${id}.imageAlt`)}
                            className="infoSection__image"
                            loading="lazy"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
