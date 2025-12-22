import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import proceduresData from './data/proceduresData';
import './ProcedureDetail.css';

function ProcedureDetail() {
  const { partId } = useParams();
  const [selectedInjury, setSelectedInjury] = useState(null);
  const partData = proceduresData[partId];

  if (!partData) {
    return (
      <div className="procedure-detail__not-found">
        <h2>Body part not found</h2>
        <Link to="/procedures">Back to Procedures</Link>
      </div>
    );
  }

  // Handle injury selection
  const handleSelectInjury = (injury) => {
    setSelectedInjury(injury);
  };

  // Handle back navigation to injury list
  const handleBackToList = () => {
    setSelectedInjury(null);
  };

  return (
    <div className="procedure-detail">
      {/* Breadcrumb navigation */}
      <div className="procedure-detail__breadcrumb">
        <Link to="/procedures" className="procedure-detail__breadcrumb-link">
          Procedures
        </Link>{' '}
        {partData.title}
      </div>

      {/* Section header */}
      <header className="procedure-detail__header">
        <h1 className="procedure-detail__title">{partData.title} Injuries</h1>
        <p className="procedure-detail__description">
          Explore injuries and treatments for the {partData.title.toLowerCase()}
        </p>
      </header>

      {selectedInjury ? (
        // === Injury detail view ===
        <div className="procedure-detail__injury-view">
          <button
            onClick={handleBackToList}
            className="procedure-detail__back-btn"
          >
            ← Back to List
          </button>

          <div className="procedure-detail__injury-content">
            <h2 className="procedure-detail__injury-title">
              {selectedInjury.name}
            </h2>
            <p className="procedure-detail__injury-description">
              {selectedInjury.description}
            </p>

            <section className="procedure-detail__treatments">
              <h3 className="procedure-detail__treatments-heading">
                Treatment Options
              </h3>
              <div className="procedure-detail__treatments-grid">
                {Object.entries(selectedInjury.treatment).map(
                  ([key, value]) => (
                    <div key={key} className="procedure-detail__treatment-card">
                      <h4 className="procedure-detail__treatment-type">
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </h4>
                      <p className="procedure-detail__treatment-description">
                        {value}
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>
          </div>
        </div>
      ) : (
        // === Injury list view ===
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
                    {Object.keys(injury.treatment).length} treatment options
                  </span>
                  <span className="procedure-detail__view-details">
                    View Details →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back to procedures link */}
      <Link to="/procedures" className="procedure-detail__back-link">
        ← Back to All Procedures
      </Link>
    </div>
  );
}

export default ProcedureDetail;
