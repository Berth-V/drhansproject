import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import proceduresData  from "./data/proceduresData";
import "./ProcedureDetail.css";

function ProcedureDetail() {
  const { partId } = useParams();
  const [selectedInjury, setSelectedInjury] = useState(null);
  
  const partData = proceduresData[partId];

  if (!partData) {
    return (
      <div className="procedure-not-found">
        <h2>Body part not found</h2>
        <Link to="/procedures">Back to Procedures</Link>
      </div>
    );
  }

  // Función para seleccionar una lesión
  const handleSelectInjury = (injury) => {
    setSelectedInjury(injury);
  };

  // Función para volver a la lista de lesiones
  const handleBackToList = () => {
    setSelectedInjury(null);
  };

  return (
    <div className="procedure-detail-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/procedures">Procedures</Link> &gt; {partData.title}
      </div>

      {/* Header */}
      <div className="procedure-header">
        <h1 className="procedure-title">{partData.title} Injuries</h1>
        <p className="procedure-description">
          Explore injuries and treatments for the {partData.title.toLowerCase()}
        </p>
      </div>

      {selectedInjury ? (
        /* Vista de detalle de lesión */
        <div className="injury-detail-view">
          <button onClick={handleBackToList} className="back-button">
            ← Back to List
          </button>

          <div className="injury-detail-content">
            <h2 className="injury-detail-title">{selectedInjury.name}</h2>
            <p className="injury-detail-description">{selectedInjury.description}</p>

            <div className="treatments-section">
              <h3>Treatment Options</h3>
              <div className="treatments-grid">
                {Object.entries(selectedInjury.treatment).map(([key, value]) => (
                  <div key={key} className="treatment-card">
                    <h4 className="treatment-type">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </h4>
                    <p className="treatment-description">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Vista de lista de lesiones */
        <div className="injuries-list-view">
          <div className="injuries-grid">
            {partData.injuries.map((injury) => (
              <div
                key={injury.id}
                className="injury-card"
                onClick={() => handleSelectInjury(injury)}
              >
                <h3 className="injury-name">{injury.name}</h3>
                <p className="injury-description">
                  {injury.description.substring(0, 100)}...
                </p>
                <div className="injury-meta">
                  <span className="treatment-count">
                    {Object.keys(injury.treatment).length} treatment options
                  </span>
                  <span className="view-details">View Details →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back link permanente */}
      <Link to="/procedures" className="procedure-back-link">
        ← Back to All Procedures
      </Link>
    </div>
  );
}

export default ProcedureDetail;
