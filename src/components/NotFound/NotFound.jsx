import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NoIndex } from '../Shared/Seo/Seo';
import './NotFound.css';

// Rutas que no existen. En el servidor, .htaccess responde con 404.html (esta misma página prerenderizada).
function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="not-found">
      <NoIndex title={t('seo.notFound.title')} />
      <h1 className="not-found__title">{t('notFound.title')}</h1>
      <p className="not-found__text">{t('notFound.text')}</p>
      <div className="not-found__links">
        <Link to="/" className="not-found__link">
          {t('notFound.home')}
        </Link>
        <Link to="/blog" className="not-found__link">
          {t('notFound.blog')}
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
