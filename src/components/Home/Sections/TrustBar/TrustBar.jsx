import { useTranslation } from 'react-i18next';
import './TrustBar.css';

// Datos rápidos de confianza bajo la portada; se editan en `trustBar.items` de los JSON
export default function TrustBar() {
  const { t } = useTranslation();
  const items = t('trustBar.items', { returnObjects: true });

  return (
    <section className="trust-bar">
      <ul className="trust-bar__card">
        {items.map((item) => (
          <li key={item.value} className="trust-bar__item">
            <strong className="trust-bar__value">{item.value}</strong>
            <span className="trust-bar__label">{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
