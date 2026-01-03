import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProceduresData } from './data';
import { useTranslation } from 'react-i18next';
import './ProcedureDetail.css';

function ProcedureDetail() {
  const { t } = useTranslation();
  const { partId } = useParams();
  const [selectedInjury, setSelectedInjury] = useState(null);
  const proceduresData = getProceduresData();
  const partData = proceduresData[partId];

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
      {/* Breadcrumb navigation */}
      <div className="procedure-detail__breadcrumb">
        <Link to="/procedures" className="procedure-detail__breadcrumb-link">
          {t('procedures.title')}
        </Link>{' '}
        {partData.title}
      </div>

      {/* Section header */}
      <header className="procedure-detail__header">
        <h1 className="procedure-detail__title">
          {partData.title} {t('procedures.injuries')}
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
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
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

      <Link to="/procedures" className="procedure-detail__back-link">
        ← {t('procedures.backToAllProcedures')}
      </Link>
    </div>
  );
}

export default ProcedureDetail;
