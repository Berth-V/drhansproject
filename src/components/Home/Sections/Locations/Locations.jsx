import { useTranslation } from 'react-i18next';
import './Locations.css';
import Map from '../Map/Map';
import { OFFICES } from '../../../../config/siteConfig';

export default function Locations() {
    const { t } = useTranslation();

    return (
        <section className="locations">
            <div className="locations__wrap">
                <h2 className="locations__title">{t('offices.title')}</h2>

                <div className="locations__grid">
                    {OFFICES.map((office) => (
                        <article key={office.id} className="locations__card">
                            <h3 className="locations__name">
                                {t(`offices.${office.id}.name`)}
                            </h3>

                            <p className="locations__address">
                                {t(`offices.${office.id}.addressLine1`)}
                                <br />
                                {t(`offices.${office.id}.addressLine2`)}
                            </p>

                            {office.appointmentOnly && (
                                <p className="locations__note">
                                    {t(`offices.${office.id}.note`)}
                                </p>
                            )}

                            <a
                                className="locations__link"
                                href={office.mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t('offices.howToGet')} →
                            </a>

                            <div className="locations__map">
                                <Map
                                    embedSrc={office.embedSrc}
                                    title={t(`offices.${office.id}.name`)}
                                />
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
