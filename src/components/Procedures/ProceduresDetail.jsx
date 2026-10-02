import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { getProceduresData } from './data';
import { useTranslation } from 'react-i18next';
import { db } from '../../firebase/firebase';
import Seo from '../Shared/Seo/Seo';
import './ProcedureDetail.css';

// "nonDisplaced" → "Non Displaced" (solo si falta la traducción en procedures.treatmentTypes)
const formatTreatmentKey = (key) =>
  key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');

function ProcedureDetail() {
  const { t } = useTranslation();
  const { partId } = useParams();
  const [selectedInjury, setSelectedInjury] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const proceduresData = getProceduresData();
  const partData = proceduresData[partId];

  const partExists = Boolean(partData);

  useEffect(() => {
    setRelatedPosts([]);
    if (!partExists) return;

    // Evita mostrar artículos de otra parte si se cambia de página antes de que responda Firestore
    let cancelled = false;

    const fetchRelatedPosts = async () => {
      try {
        const q = query(
          collection(db, 'posts'),
          where('relatedPart', '==', partId),
          where('published', '==', true),
          limit(5)
        );
        const snapshot = await getDocs(q);
        if (!cancelled) setRelatedPosts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error('Error fetching related posts:', err);
      }
    };

    fetchRelatedPosts();
    return () => {
      cancelled = true;
    };
  }, [partId, partExists]);

  if (!partData) {
    return (
      <div className="procedure-detail__not-found">
        <h2>{t('procedures.notFound')}</h2>
        <Link to="/procedures">{t('procedures.backToProcedures')}</Link>
      </div>
    );
  }

  const handleSelectInjury = (injury) => setSelectedInjury(injury);
  const handleBackToList = () => setSelectedInjury(null);

  return (
    <div className="procedure-detail">
      <Seo
        title={t('seo.procedureDetail.title', { part: partData.title })}
        description={t('seo.procedureDetail.description', { part: partData.title.toLowerCase() })}
        path={`/procedures/${partId}`}
      />

      {/* Breadcrumb navigation */}
      <div className="procedure-detail__breadcrumb">
        <Link to="/procedures" className="procedure-detail__breadcrumb-link">
          {t('procedures.title')}
        </Link>
        {' / '}
        {partData.title}
      </div>

      {/* Section header */}
      <header className="procedure-detail__header">
        <h1 className="procedure-detail__title">
          {t('procedures.partInjuries', { part: partData.title })}
        </h1>
        <p className="procedure-detail__description">
          {t('procedures.exploreInjuriesFor', { part: partData.title.toLowerCase() })}
        </p>
      </header>

      {selectedInjury ? (
        <div className="procedure-detail__injury-view">
          <button onClick={handleBackToList} className="procedure-detail__back-btn">
            ← {t('procedures.backToList')}
          </button>

          <div className="procedure-detail__injury-content">
            <h2 className="procedure-detail__injury-title">{selectedInjury.name}</h2>
            <p className="procedure-detail__injury-description">{selectedInjury.description}</p>

            <section className="procedure-detail__treatments">
              <h3 className="procedure-detail__treatments-heading">
                {t('procedures.treatmentOptions')}
              </h3>
              <div className="procedure-detail__treatments-grid">
                {Object.entries(selectedInjury.treatment).map(([key, value]) => (
                  <div key={key} className="procedure-detail__treatment-card">
                    <h4 className="procedure-detail__treatment-type">
                      {t(`procedures.treatmentTypes.${key}`, { defaultValue: formatTreatmentKey(key) })}
                    </h4>
                    <p className="procedure-detail__treatment-description">{value}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="procedure-detail__injury-list">
          <div className="procedure-detail__injury-grid">
            {partData.injuries.map((injury) => (
              <div
                key={injury.id}
                className="procedure-detail__injury-card"
                onClick={() => handleSelectInjury(injury)}
              >
                <h3 className="procedure-detail__injury-name">{injury.name}</h3>
                <p className="procedure-detail__injury-summary">
                  {injury.description.substring(0, 100)}...
                </p>
                <div className="procedure-detail__injury-meta">
                  <span className="procedure-detail__treatment-count">
                    {Object.keys(injury.treatment).length} {t('procedures.treatmentOptions')}
                  </span>
                  <span className="procedure-detail__view-details">{t('procedures.viewDetails')} →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {relatedPosts.length > 0 && (
        <section className="procedure-detail__related">
          <h3 className="procedure-detail__related-heading">{t('procedures.relatedArticles')}</h3>
          <div className="procedure-detail__related-grid">
            {relatedPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="procedure-detail__related-card"
              >
                {post.category && (
                  <span className="procedure-detail__related-category">{post.category}</span>
                )}
                <h4 className="procedure-detail__related-title">{post.title}</h4>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Link to="/procedures" className="procedure-detail__back-link">
        ← {t('procedures.backToAllProcedures')}
      </Link>
    </div>
  );
}

export default ProcedureDetail;