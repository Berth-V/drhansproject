import { useParams, Link } from "react-router-dom";
import proceduresData from "./data/proceduresData";
import "./ProcedureDetail.css";

function ProcedureDetail() {
  const { partId } = useParams();
  const procedure = proceduresData[partId];

  if (!procedure) {
    return (
      <div className="procedure-not-found">
        <h2>Procedure not found</h2>
        <Link to="/procedures">Back to Procedures</Link>
      </div>
    );
  }

  return (
    <div className="procedure-container">
      {/* Header */}
      <div className="procedure-header">
        <h1 className="procedure-title">{procedure.title}</h1>
        <p className="procedure-description">{procedure.description}</p>
      </div>

      {/* Image / Placeholder */}
      <div className="procedure-image-placeholder">
        <span className="procedure-icon">🦴</span>
      </div>

      {/* Back link */}
      <Link to="/procedures" className="procedure-back-link">
        ← Back to Procedures
      </Link>
    </div>
  );
}

export default ProcedureDetail;
