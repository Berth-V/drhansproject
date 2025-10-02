import { Link } from "react-router-dom";
import proceduresData from "./data/proceduresData";
import "./Procedures.css";

const ProceduresGrid = () => {
  // Usamos Object.entries para obtener [id, data]
  const parts = Object.entries(proceduresData);

  return (
    <section className="procedures">
      <h2 className="procedures__title">Explore Procedures</h2>

      <div className="procedures__grid">
        {parts.map(([id, part]) => (
          <Link
            key={id}
            to={`/procedures/${id}`}
            className="procedures__card"
          >
            <div className="procedures__icon">
              {/* Iconos según la parte del cuerpo */}
              {id === 'ankle' && '🦶'}
              {id === 'cervicalSpine' && '📋'}
              {id === 'clavicle' && '🔗'}
              {id === 'elbow' && '🦾'}
              {id === 'femur' && '🦵'}
              {id === 'foot' && '👣'}
              {id === 'forearm' && '💪'}
              {id === 'hand' && '✋'}
              {id === 'hip' && '🦴'}
              {id === 'humerus' && '💪'}
              {id === 'knee' && '🦵'}
              {id === 'lumbarSpine' && '📋'}
              {id === 'shoulder' && '🤷'}
              {id === 'thoracicSpine' && '📋'}
              {id === 'tibiaFibula' && '🦵'}
              {id === 'wrist' && '🤚'}
            </div>
            <h3 className="procedures__name">{part.title}</h3>
            <p className="procedures__description">
              {part.injuries.length} injuries and treatments available
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProceduresGrid;